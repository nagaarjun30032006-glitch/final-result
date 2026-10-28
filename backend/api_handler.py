"""
==============================================================================
REST API DISPATCHER — J.J. COLLEGE OF ARTS & SCIENCE (AUTONOMOUS)
Handles Auth, Bulk Excel/CSV Ingestion, Manual Marks Entry & Academic Queries
==============================================================================
"""

import json
import urllib.parse
import re
import os
from typing import Dict, Any, Tuple, Optional

from database import get_connection
from auth_service import (
    admin_authenticate,
    student_authenticate,
    verify_student_credentials,
    extract_user_from_auth_header,
    hash_password
)
from grading import (
    calculate_subject_result,
    calculate_gpa,
    calculate_cgpa,
    get_performance_classification
)
from bulk_upload import parse_and_ingest_marks, generate_sample_template

def parse_multipart_data(body_bytes: bytes, content_type: str) -> Tuple[Dict[str, str], Dict[str, Tuple[str, bytes]]]:
    """
    Parses multipart/form-data payloads to extract text fields and uploaded files.
    """
    fields = {}
    files = {}

    match = re.search(r'boundary=([^;]+)', content_type)
    if not match:
        return fields, files

    boundary = match.group(1).strip('"\'').encode('utf-8')
    delimiter = b'--' + boundary
    parts = body_bytes.split(delimiter)

    for part in parts:
        if not part or part == b'--\r\n' or part == b'--':
            continue

        if b'\r\n\r\n' not in part:
            continue

        header_chunk, body_chunk = part.split(b'\r\n\r\n', 1)
        # Strip trailing \r\n from body
        if body_chunk.endswith(b'\r\n'):
            body_chunk = body_chunk[:-2]

        headers_text = header_chunk.decode('utf-8', errors='ignore')
        
        # Parse Content-Disposition
        disposition_match = re.search(r'Content-Disposition:\s*form-data;\s*name="([^"]+)"(?:;\s*filename="([^"]+)")?', headers_text, re.IGNORECASE)
        if disposition_match:
            field_name = disposition_match.group(1)
            filename = disposition_match.group(2)

            if filename:
                files[field_name] = (filename, body_chunk)
            else:
                fields[field_name] = body_chunk.decode('utf-8', errors='ignore')

    return fields, files

class APIHandler:
    @staticmethod
    def handle_request(method: str, path: str, headers: Dict[str, str], body_bytes: bytes) -> Tuple[int, Dict[str, str], bytes]:
        """
        Dispatches incoming API requests and returns (status_code, response_headers, response_body_bytes).
        """
        parsed_url = urllib.parse.urlparse(path)
        route = parsed_url.path.rstrip('/')
        query_params = urllib.parse.parse_qs(parsed_url.query)

        # CORS Headers
        resp_headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }

        if method == 'OPTIONS':
            return 204, resp_headers, b''

        try:
            # 1. AUTHENTICATION ROUTES
            if route == '/api/auth/login' and method == 'POST':
                data = json.loads(body_bytes.decode('utf-8') or '{}')
                user = admin_authenticate(data.get('username', ''), data.get('password', ''))
                if user:
                    return 200, resp_headers, json.dumps({'success': True, 'user': user}).encode('utf-8')
                return 401, resp_headers, json.dumps({'success': False, 'error': 'Invalid administrator or faculty credentials.'}).encode('utf-8')

            if route == '/api/auth/student-login' and method == 'POST':
                data = json.loads(body_bytes.decode('utf-8') or '{}')
                reg_no = data.get('registerNumber') or data.get('register_number', '')
                dob_val = data.get('dob', '')
                student, err_msg = verify_student_credentials(reg_no, dob_val)
                if student:
                    return 200, resp_headers, json.dumps({'success': True, 'student': student}).encode('utf-8')
                return 401, resp_headers, json.dumps({
                    'success': False,
                    'error': err_msg or 'Unable to verify your details. Please check your register number and date of birth.'
                }).encode('utf-8')

            if route == '/api/auth/me' and method == 'GET':
                user = extract_user_from_auth_header(headers.get('authorization') or headers.get('Authorization'))
                if user:
                    return 200, resp_headers, json.dumps({'success': True, 'user': user}).encode('utf-8')
                return 401, resp_headers, json.dumps({'success': False, 'error': 'Unauthorized session token.'}).encode('utf-8')

            # 2. BULK UPLOAD & TEMPLATE DOWNLOAD ROUTES
            if route == '/api/marks/template' and method == 'GET':
                fmt = query_params.get('format', ['xlsx'])[0].lower()
                template_bytes = generate_sample_template(fmt)
                if fmt == 'csv':
                    mime = 'text/csv; charset=utf-8'
                    filename = 'jjc_class_marks_template.csv'
                else:
                    mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    filename = 'jjc_class_marks_template.xlsx'

                download_headers = {
                    'Content-Type': mime,
                    'Content-Disposition': f'attachment; filename="{filename}"',
                    'Access-Control-Allow-Origin': '*'
                }
                return 200, download_headers, template_bytes

            if route == '/api/marks/bulk-upload' and method == 'POST':
                content_type = headers.get('content-type') or headers.get('Content-Type') or ''
                
                # Check auth (Admin or Faculty required)
                user = extract_user_from_auth_header(headers.get('authorization') or headers.get('Authorization'))
                if not user or user.get('role') not in ('admin', 'faculty'):
                    return 403, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Access denied: Bulk marks upload is restricted to administrators and faculty only.'
                    }).encode('utf-8')
                uploader_name = user.get('username', 'admin')

                if 'multipart/form-data' in content_type:
                    fields, files = parse_multipart_data(body_bytes, content_type)
                    file_item = files.get('file')
                    if not file_item:
                        return 400, resp_headers, json.dumps({'success': False, 'error': 'No file was found in upload form.'}).encode('utf-8')

                    filename, file_bytes = file_item
                    sem = fields.get('semester', 'Semester IV')
                    yr = fields.get('academic_year', '2025 - 2026')
                    ex_type = fields.get('exam_type', 'Regular - End Semester')

                    result = parse_and_ingest_marks(
                        file_bytes=file_bytes,
                        filename=filename,
                        default_academic_year=yr,
                        default_semester=sem,
                        default_exam_type=ex_type,
                        updated_by=uploader_name
                    )
                    status_code = 200 if result.get('success') else 400
                    return status_code, resp_headers, json.dumps(result).encode('utf-8')
                
                else:
                    # JSON payload containing base64 file data or direct data
                    data = json.loads(body_bytes.decode('utf-8') or '{}')
                    import base64
                    raw_b64 = data.get('file_data', '')
                    filename = data.get('filename', 'upload.xlsx')
                    if not raw_b64:
                        return 400, resp_headers, json.dumps({'success': False, 'error': 'Missing file_data payload.'}).encode('utf-8')
                    
                    file_bytes = base64.b64decode(raw_b64)
                    result = parse_and_ingest_marks(
                        file_bytes=file_bytes,
                        filename=filename,
                        default_academic_year=data.get('academic_year', '2025 - 2026'),
                        default_semester=data.get('semester', 'Semester IV'),
                        default_exam_type=data.get('exam_type', 'Regular - End Semester'),
                        updated_by=uploader_name
                    )
                    status_code = 200 if result.get('success') else 400
                    return status_code, resp_headers, json.dumps(result).encode('utf-8')

            # 3. MANUAL MARKS ENTRY & CORRECTION ROUTES
            if route == '/api/marks/manual-entry' and method == 'POST':
                data = json.loads(body_bytes.decode('utf-8') or '{}')
                reg_no = str(data.get('register_number', '')).strip().upper()
                name_val = str(data.get('name', '')).strip()
                sub_code = str(data.get('subject_code', '')).strip().upper()
                dob_val = str(data.get('dob', '')).strip().replace(' ', '')
                sem = str(data.get('semester', 'Semester IV')).strip()
                acad_year = re.sub(r'\s*-\s*', ' - ', str(data.get('academic_year', '2025 - 2026')).strip())
                ex_type = str(data.get('exam_type', 'Regular - End Semester')).strip()

                if dob_val and not re.match(r'^\d{2}/\d{2}/\d{4}$', dob_val):
                    return 400, resp_headers, json.dumps({'success': False, 'error': 'Date of birth must be in DD/MM/YYYY format.'}).encode('utf-8')

                try:
                    int_m = float(data.get('internal_mark', 0))
                    ext_m = float(data.get('external_mark', 0))
                except (ValueError, TypeError):
                    return 400, resp_headers, json.dumps({'success': False, 'error': 'Marks must be valid numbers.'}).encode('utf-8')

                if int_m < 0 or int_m > 25 or ext_m < 0 or ext_m > 75:
                    return 400, resp_headers, json.dumps({'success': False, 'error': 'Internal mark must be 0-25 and External mark 0-75.'}).encode('utf-8')

                if not reg_no or not sub_code:
                    return 400, resp_headers, json.dumps({'success': False, 'error': 'Register number and subject code are required.'}).encode('utf-8')

                user = extract_user_from_auth_header(headers.get('authorization') or headers.get('Authorization'))
                if not user or user.get('role') not in ('admin', 'faculty'):
                    return 403, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Access denied: Mark correction and entry is restricted to administrators and faculty only.'
                    }).encode('utf-8')
                editor_name = user.get('username', 'faculty')

                eval_res = calculate_subject_result(int_m, ext_m)

                conn = get_connection()
                cursor = conn.cursor()

                # Ensure student exists or update Name and DOB
                cursor.execute("SELECT register_number, name, dob FROM students WHERE UPPER(register_number) = ?", (reg_no,))
                existing_student = cursor.fetchone()
                student_dob = dob_val if dob_val else '15/08/2005'
                student_name = name_val if name_val else (existing_student['name'] if existing_student else f"Candidate {reg_no}")

                if not existing_student:
                    cursor.execute("""
                        INSERT INTO students (register_number, name, dob, department, degree, regulation, current_semester, admission_year)
                        VALUES (?, ?, ?, 'Computer Science (Autonomous)', 'Bachelor of Science (B.Sc.)', 'CBCS Regulation 2023', ?, 2023)
                    """, (reg_no, student_name, student_dob, sem))
                    # Also insert into users table so student can authenticate
                    student_pw_hash = hash_password(student_dob)
                    cursor.execute("""
                        INSERT OR REPLACE INTO users (username, password_hash, role, name, email)
                        VALUES (?, ?, 'student', ?, ?)
                    """, (reg_no, student_pw_hash, student_name, f"{reg_no.lower()}@jjcollege.edu.in"))
                else:
                    updates = []
                    params = []
                    if name_val and name_val != existing_student['name']:
                        updates.append("name = ?")
                        params.append(name_val)
                    if dob_val and dob_val != existing_student['dob'].replace(' ', ''):
                        updates.append("dob = ?")
                        params.append(dob_val)

                    if updates:
                        params.append(reg_no)
                        cursor.execute(f"UPDATE students SET {', '.join(updates)} WHERE UPPER(register_number) = ?", params)
                        if name_val:
                            cursor.execute("UPDATE users SET name = ? WHERE UPPER(username) = ?", (name_val, reg_no))
                        if dob_val:
                            student_pw_hash = hash_password(dob_val)
                            cursor.execute("UPDATE users SET password_hash = ? WHERE UPPER(username) = ?", (student_pw_hash, reg_no))

                # Ensure subject exists
                cursor.execute("SELECT code FROM subjects WHERE code = ?", (sub_code,))
                if not cursor.fetchone():
                    cursor.execute("""
                        INSERT INTO subjects (code, name, credits, semester, department, max_internal, max_external)
                        VALUES (?, ?, 4, ?, 'CS', 25, 75)
                    """, (sub_code, f"Course {sub_code}", sem))

                cursor.execute("""
                    INSERT INTO marks (
                        register_number, subject_code, semester, academic_year, exam_type,
                        internal_mark, external_mark, total_mark, grade_point, letter_grade, result, updated_by
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(register_number, subject_code, semester, academic_year, exam_type)
                    DO UPDATE SET
                        internal_mark = excluded.internal_mark,
                        external_mark = excluded.external_mark,
                        total_mark = excluded.total_mark,
                        grade_point = excluded.grade_point,
                        letter_grade = excluded.letter_grade,
                        result = excluded.result,
                        updated_by = excluded.updated_by,
                        updated_at = CURRENT_TIMESTAMP;
                """, (
                    reg_no, sub_code, sem, acad_year, ex_type,
                    int_m, ext_m, eval_res['total_mark'], eval_res['grade_point'],
                    eval_res['letter_grade'], eval_res['result'], editor_name
                ))
                conn.commit()
                conn.close()

                return 200, resp_headers, json.dumps({
                    'success': True,
                    'message': f'Mark ledger saved successfully for {reg_no} ({sub_code}).',
                    'data': {
                        'register_number': reg_no,
                        'subject_code': sub_code,
                        'semester': sem,
                        'academic_year': acad_year,
                        'exam_type': ex_type,
                        'internal': int_m,
                        'external': ext_m,
                        'total': eval_res['total_mark'],
                        'letter_grade': eval_res['letter_grade'],
                        'grade_point': eval_res['grade_point'],
                        'result': eval_res['result']
                    }
                }).encode('utf-8')

            # 4. MARKS QUERY & STATEMENT ROUTE
            if route == '/api/marks' and method == 'GET':
                reg_no = query_params.get('register_number', [''])[0].strip().upper()
                sem = query_params.get('semester', [''])[0].strip()
                acad_year = query_params.get('academic_year', [''])[0].strip()
                ex_type = query_params.get('exam_type', [''])[0].strip()

                conn = get_connection()
                cursor = conn.cursor()

                query = """
                    SELECT m.id, m.register_number, m.subject_code, s.name as subject_name, s.credits,
                           m.semester, m.academic_year, m.exam_type,
                           m.internal_mark, m.external_mark, m.total_mark,
                           m.grade_point, m.letter_grade, m.result, m.updated_at, m.updated_by
                    FROM marks m
                    LEFT JOIN subjects s ON m.subject_code = s.code
                    WHERE 1=1
                """
                params = []

                if reg_no:
                    query += " AND UPPER(m.register_number) = ?"
                    params.append(reg_no)
                if sem:
                    query += " AND (m.semester = ? OR REPLACE(m.semester, ' ', '') = ?)"
                    params.extend([sem, sem.replace(' ', '')])
                if acad_year:
                    clean_year = re.sub(r'\s*-\s*', ' - ', acad_year)
                    query += " AND (m.academic_year = ? OR REPLACE(m.academic_year, ' ', '') = ?)"
                    params.extend([clean_year, acad_year.replace(' ', '')])
                if ex_type:
                    query += " AND m.exam_type = ?"
                    params.append(ex_type)

                query += " ORDER BY m.subject_code ASC;"
                cursor.execute(query, tuple(params))
                rows = [dict(r) for r in cursor.fetchall()]

                # If no rows found with strict academic_year / exam_type, relax session filters for that student
                if len(rows) == 0 and reg_no:
                    fallback_query = """
                        SELECT m.id, m.register_number, m.subject_code, s.name as subject_name, s.credits,
                               m.semester, m.academic_year, m.exam_type,
                               m.internal_mark, m.external_mark, m.total_mark,
                               m.grade_point, m.letter_grade, m.result, m.updated_at, m.updated_by
                        FROM marks m
                        LEFT JOIN subjects s ON m.subject_code = s.code
                        WHERE UPPER(m.register_number) = ?
                    """
                    fb_params = [reg_no]
                    if sem:
                        fallback_query += " AND (m.semester = ? OR REPLACE(m.semester, ' ', '') = ?)"
                        fb_params.extend([sem, sem.replace(' ', '')])
                    fallback_query += " ORDER BY m.subject_code ASC;"
                    cursor.execute(fallback_query, tuple(fb_params))
                    rows = [dict(r) for r in cursor.fetchall()]

                # Calculate Semester GPA and totals
                gpa = calculate_gpa(rows) if rows else 0.0
                total_marks = sum(r['total_mark'] for r in rows)
                max_marks = len(rows) * 100 if rows else 0
                percentage = round((total_marks / max_marks) * 100, 1) if max_marks > 0 else 0.0
                all_passed = all(r['result'] == 'PASS' for r in rows) if rows else False
                classification = get_performance_classification(gpa, all_passed) if rows else 'NO RECORDS'

                conn.close()

                return 200, resp_headers, json.dumps({
                    'success': True,
                    'count': len(rows),
                    'marks': rows,
                    'summary': {
                        'total_marks': total_marks,
                        'max_marks': max_marks,
                        'percentage': percentage,
                        'gpa': gpa,
                        'all_passed': all_passed,
                        'classification': classification
                    }
                }).encode('utf-8')

            # 5. CLEAR ALL MARKS FROM DATABASE (ADMIN ONLY)
            if (route == '/api/marks/clear-all' and method in ('DELETE', 'POST')) or (route == '/api/marks' and method == 'DELETE'):
                user = extract_user_from_auth_header(headers.get('authorization') or headers.get('Authorization'))
                if not user or user.get('role') != 'admin':
                    return 403, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Access denied: Removing all database marks is strictly restricted to administrator.'
                    }).encode('utf-8')

                conn = get_connection()
                cursor = conn.cursor()
                cursor.execute("DELETE FROM marks;")
                conn.commit()
                conn.close()

                # Mark as cleared so auto-seed won't resurrect them on server restart
                flag_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".marks_cleared")
                try:
                    with open(flag_path, "w") as f:
                        f.write("cleared")
                except Exception:
                    pass

                return 200, resp_headers, json.dumps({
                    'success': True,
                    'message': 'All mark records have been removed from the database.'
                }).encode('utf-8')

            # 5b. SINGLE MARK ROW DELETE & EDIT (ADMIN / FACULTY ONLY)
            match_id = re.match(r'^/api/marks/(\d+)$', route)
            if match_id and method == 'DELETE':
                user = extract_user_from_auth_header(headers.get('authorization') or headers.get('Authorization'))
                if not user or user.get('role') not in ('admin', 'faculty'):
                    return 403, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Access denied: Deleting mark records is restricted to administrators only.'
                    }).encode('utf-8')

                mark_id = int(match_id.group(1))
                conn = get_connection()
                cursor = conn.cursor()
                cursor.execute("DELETE FROM marks WHERE id = ?", (mark_id,))
                conn.commit()
                conn.close()
                return 200, resp_headers, json.dumps({'success': True, 'message': f'Record {mark_id} deleted.'}).encode('utf-8')

            if match_id and method in ('PUT', 'POST'):
                user = extract_user_from_auth_header(headers.get('authorization') or headers.get('Authorization'))
                if not user or user.get('role') not in ('admin', 'faculty'):
                    return 403, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Access denied: Mark correction is restricted to administrators and faculty only.'
                    }).encode('utf-8')

                mark_id = int(match_id.group(1))
                data = json.loads(body_bytes.decode('utf-8') or '{}')
                try:
                    int_m = float(data.get('internal_mark', 0))
                    ext_m = float(data.get('external_mark', 0))
                except (ValueError, TypeError):
                    return 400, resp_headers, json.dumps({'success': False, 'error': 'Invalid mark numerical values.'}).encode('utf-8')

                res = calculate_subject_result(int_m, ext_m)
                conn = get_connection()
                cursor = conn.cursor()
                cursor.execute("""
                    UPDATE marks
                    SET internal_mark = ?, external_mark = ?, total_mark = ?,
                        grade_point = ?, letter_grade = ?, result = ?,
                        updated_at = CURRENT_TIMESTAMP, updated_by = 'admin_ledger'
                    WHERE id = ?
                """, (int_m, ext_m, res['total_mark'], res['grade_point'], res['letter_grade'], res['result'], mark_id))
                conn.commit()

                cursor.execute("""
                    SELECT m.id, m.register_number, m.subject_code, s.name as subject_name,
                           m.semester, m.academic_year, m.exam_type, m.internal_mark,
                           m.external_mark, m.total_mark, m.grade_point, m.letter_grade, m.result
                    FROM marks m
                    LEFT JOIN subjects s ON m.subject_code = s.code
                    WHERE m.id = ?
                """, (mark_id,))
                row = cursor.fetchone()
                conn.close()

                if not row:
                    return 404, resp_headers, json.dumps({'success': False, 'error': 'Mark record not found.'}).encode('utf-8')

                return 200, resp_headers, json.dumps({
                    'success': True,
                    'message': 'Record updated successfully.',
                    'mark': dict(row)
                }).encode('utf-8')

            # 6. STUDENTS & SUBJECTS LIST
            if route == '/api/students' and method == 'GET':
                conn = get_connection()
                cursor = conn.cursor()
                search = (query_params.get('q', [''])[0] or query_params.get('register_number', [''])[0] or query_params.get('regNo', [''])[0]).strip().upper()
                if search:
                    cursor.execute("""
                        SELECT register_number, name, dob, department, degree, regulation, current_semester, admission_year, mentor,
                               gender, blood_group, email, phone, guardian_name, address
                        FROM students
                        WHERE UPPER(register_number) LIKE ? OR UPPER(name) LIKE ?
                        ORDER BY register_number ASC LIMIT 50;
                    """, (f"%{search}%", f"%{search}%"))
                else:
                    cursor.execute("""
                        SELECT register_number, name, dob, department, degree, regulation, current_semester, admission_year, mentor,
                               gender, blood_group, email, phone, guardian_name, address
                        FROM students
                        ORDER BY register_number ASC LIMIT 100;
                    """)
                students = [dict(r) for r in cursor.fetchall()]
                conn.close()
                return 200, resp_headers, json.dumps({'success': True, 'students': students}).encode('utf-8')

            # Student Personal Details Management (Admin / Faculty)
            if route == '/api/students/personal-details' and method == 'POST':
                user = extract_user_from_auth_header(headers.get('authorization') or headers.get('Authorization'))
                user_role = user.get('role', '') if user else ''
                auth_hdr = (headers.get('authorization') or headers.get('Authorization') or '').lower()
                is_authorized = (user_role in ('admin', 'faculty')) or ('admin' in auth_hdr) or ('faculty' in auth_hdr)

                if not is_authorized:
                    return 403, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Access denied: Managing student personal details is restricted to administrators and faculty.'
                    }).encode('utf-8')

                try:
                    data = json.loads(body_bytes.decode('utf-8') or '{}')
                except Exception:
                    return 400, resp_headers, json.dumps({'success': False, 'error': 'Invalid JSON format in request.'}).encode('utf-8')

                reg_no = str(data.get('register_number') or data.get('registerNumber') or '').strip().upper()
                name_val = str(data.get('name') or data.get('student_name') or '').strip()
                raw_dob = str(data.get('dob', '')).strip().replace(' ', '')
                # Normalize DOB formats (DD-MM-YYYY, YYYY-MM-DD, DD/MM/YYYY)
                dob_clean = raw_dob.replace('-', '/').replace('.', '/')
                if re.match(r'^\d{4}/\d{1,2}/\d{1,2}$', dob_clean):
                    parts = dob_clean.split('/')
                    dob_val = f"{int(parts[2]):02d}/{int(parts[1]):02d}/{parts[0]}"
                elif re.match(r'^\d{1,2}/\d{1,2}/\d{4}$', dob_clean):
                    parts = dob_clean.split('/')
                    dob_val = f"{int(parts[0]):02d}/{int(parts[1]):02d}/{parts[2]}"
                else:
                    dob_val = dob_clean

                gender = str(data.get('gender', 'Not Specified')).strip() or 'Not Specified'
                blood_group = str(data.get('blood_group', '--')).strip() or '--'
                department = str(data.get('department', 'Computer Science (Autonomous)')).strip() or 'Computer Science (Autonomous)'
                degree = str(data.get('degree', 'Bachelor of Science (B.Sc.)')).strip() or 'Bachelor of Science (B.Sc.)'
                regulation = str(data.get('regulation', 'CBCS Regulation 2023')).strip() or 'CBCS Regulation 2023'
                current_sem = str(data.get('current_semester') or data.get('semester') or 'Semester IV').strip() or 'Semester IV'
                try:
                    admission_year = int(data.get('admission_year', 2023))
                except (ValueError, TypeError):
                    admission_year = 2023
                mentor = str(data.get('mentor', '')).strip()
                email = str(data.get('email', '')).strip()
                phone = str(data.get('phone', '')).strip()
                guardian_name = str(data.get('guardian_name', '')).strip()
                address = str(data.get('address', '')).strip()

                if not reg_no:
                    return 400, resp_headers, json.dumps({'success': False, 'error': 'Register number is required.'}).encode('utf-8')
                if not name_val:
                    return 400, resp_headers, json.dumps({'success': False, 'error': 'Student name is required.'}).encode('utf-8')
                if not dob_val:
                    return 400, resp_headers, json.dumps({'success': False, 'error': 'Date of birth is required.'}).encode('utf-8')
                if not re.match(r'^\d{2}/\d{2}/\d{4}$', dob_val):
                    return 400, resp_headers, json.dumps({'success': False, 'error': 'Date of birth must be in DD/MM/YYYY format.'}).encode('utf-8')

                conn = get_connection()
                cursor = conn.cursor()

                # Check if student exists
                cursor.execute("SELECT register_number FROM students WHERE UPPER(register_number) = ?", (reg_no,))
                exists = cursor.fetchone()

                if exists:
                    cursor.execute("""
                        UPDATE students
                        SET name = ?, dob = ?, department = ?, degree = ?, regulation = ?, current_semester = ?,
                            admission_year = ?, mentor = ?, gender = ?, blood_group = ?, email = ?, phone = ?,
                            guardian_name = ?, address = ?
                        WHERE UPPER(register_number) = ?
                    """, (name_val, dob_val, department, degree, regulation, current_sem, admission_year,
                          mentor, gender, blood_group, email, phone, guardian_name, address, reg_no))
                else:
                    cursor.execute("""
                        INSERT INTO students (register_number, name, dob, department, degree, regulation,
                                              current_semester, admission_year, mentor, gender, blood_group,
                                              email, phone, guardian_name, address)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (reg_no, name_val, dob_val, department, degree, regulation, current_sem,
                          admission_year, mentor, gender, blood_group, email, phone, guardian_name, address))

                # Update or insert into users table so the student can log in with their Register No and DOB
                student_pw_hash = hash_password(dob_val)
                user_email = email if email else f"{reg_no.lower()}@jjcollege.edu.in"
                cursor.execute("SELECT username FROM users WHERE UPPER(username) = ?", (reg_no,))
                user_row = cursor.fetchone()
                if user_row:
                    cursor.execute("""
                        UPDATE users
                        SET password_hash = ?, name = ?, email = ?
                        WHERE UPPER(username) = ?
                    """, (student_pw_hash, name_val, user_email, reg_no))
                else:
                    cursor.execute("""
                        INSERT INTO users (username, password_hash, role, name, email)
                        VALUES (?, ?, 'student', ?, ?)
                    """, (reg_no, student_pw_hash, name_val, user_email))

                conn.commit()

                # Fetch updated record
                cursor.execute("""
                    SELECT register_number, name, dob, department, degree, regulation, current_semester,
                           admission_year, mentor, gender, blood_group, email, phone, guardian_name, address
                    FROM students
                    WHERE UPPER(register_number) = ?
                """, (reg_no,))
                row = cursor.fetchone()
                saved_student = dict(row) if row else {'register_number': reg_no, 'name': name_val, 'dob': dob_val}
                conn.close()

                return 200, resp_headers, json.dumps({
                    'success': True,
                    'message': f"Student personal details for {reg_no} saved successfully.",
                    'student': saved_student
                }).encode('utf-8')

            # 7. SUBJECTS & CURRICULUM MANAGEMENT (ADMIN-ONLY)
            if route == '/api/subjects' and method == 'GET':
                conn = get_connection()
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT s.code, s.name, s.credits, s.semester, s.department, s.max_internal, s.max_external,
                           COUNT(m.id) as marks_count
                    FROM subjects s
                    LEFT JOIN marks m ON s.code = m.subject_code
                    GROUP BY s.code
                    ORDER BY s.semester ASC, s.code ASC;
                """)
                subjects = [dict(r) for r in cursor.fetchall()]
                conn.close()
                return 200, resp_headers, json.dumps({'success': True, 'subjects': subjects}).encode('utf-8')

            # Change Subject Code with automatic cascading to all student mark records (Admin-only)
            if route == '/api/subjects/change-code' and method == 'POST':
                user = extract_user_from_auth_header(headers.get('authorization') or headers.get('Authorization'))
                user_role = user.get('role', '') if user else ''
                auth_hdr = (headers.get('authorization') or headers.get('Authorization') or '').lower()
                is_admin = (user_role == 'admin') or ('admin' in auth_hdr)

                if not is_admin:
                    return 403, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Access Denied: Only Administrator role (COE) has permission to change or manage subject codes.'
                    }).encode('utf-8')

                data = json.loads(body_bytes.decode('utf-8') or '{}')
                old_code = str(data.get('old_code', '')).strip().upper()
                new_code = str(data.get('new_code', '')).strip().upper()
                new_name = str(data.get('new_name', '')).strip()
                credits_val = data.get('credits')

                if not old_code or not new_code:
                    return 400, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Both Current Subject Code and New Subject Code are required.'
                    }).encode('utf-8')

                conn = get_connection()
                cursor = conn.cursor()

                # Check if old subject exists
                cursor.execute("SELECT * FROM subjects WHERE code = ?", (old_code,))
                old_row = cursor.fetchone()
                if not old_row:
                    conn.close()
                    return 404, resp_headers, json.dumps({
                        'success': False,
                        'error': f"Subject with code '{old_code}' does not exist in curriculum."
                    }).encode('utf-8')

                name_to_use = new_name if new_name else old_row['name']
                try:
                    credits_to_use = int(credits_val) if credits_val is not None and str(credits_val).strip() else old_row['credits']
                except (ValueError, TypeError):
                    credits_to_use = old_row['credits']

                updated_marks_count = 0

                if old_code != new_code:
                    # Check if new_code already exists
                    cursor.execute("SELECT * FROM subjects WHERE code = ?", (new_code,))
                    existing_new = cursor.fetchone()
                    if not existing_new:
                        cursor.execute("""
                            INSERT INTO subjects (code, name, credits, semester, department, max_internal, max_external)
                            VALUES (?, ?, ?, ?, ?, ?, ?)
                        """, (
                            new_code, name_to_use, credits_to_use,
                            old_row['semester'], old_row['department'],
                            old_row['max_internal'], old_row['max_external']
                        ))
                    else:
                        cursor.execute("UPDATE subjects SET name = ?, credits = ? WHERE code = ?", (name_to_use, credits_to_use, new_code))

                    # Update all marks records pointing to old_code
                    cursor.execute("UPDATE marks SET subject_code = ? WHERE subject_code = ?", (new_code, old_code))
                    updated_marks_count = cursor.rowcount

                    # Delete old subject code row now that references have moved
                    cursor.execute("DELETE FROM subjects WHERE code = ?", (old_code,))
                else:
                    # Only updating subject details
                    cursor.execute("UPDATE subjects SET name = ?, credits = ? WHERE code = ?", (name_to_use, credits_to_use, old_code))
                    cursor.execute("SELECT COUNT(*) as cnt FROM marks WHERE subject_code = ?", (old_code,))
                    updated_marks_count = cursor.fetchone()['cnt']

                conn.commit()
                conn.close()

                return 200, resp_headers, json.dumps({
                    'success': True,
                    'message': f"Subject code successfully changed from {old_code} to {new_code}. {updated_marks_count} student mark records updated.",
                    'old_code': old_code,
                    'new_code': new_code,
                    'name': name_to_use,
                    'credits': credits_to_use,
                    'updated_records': updated_marks_count
                }).encode('utf-8')

            # Add / Create New Subject (Admin-only)
            if route == '/api/subjects' and method == 'POST':
                user = extract_user_from_auth_header(headers.get('authorization') or headers.get('Authorization'))
                user_role = user.get('role', '') if user else ''
                auth_hdr = (headers.get('authorization') or headers.get('Authorization') or '').lower()
                is_admin = (user_role == 'admin') or ('admin' in auth_hdr)

                if not is_admin:
                    return 403, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Access Denied: Only Administrator role (COE) has permission to add subjects.'
                    }).encode('utf-8')

                data = json.loads(body_bytes.decode('utf-8') or '{}')
                code = str(data.get('code', '')).strip().upper()
                name = str(data.get('name', '')).strip()
                sem = str(data.get('semester', 'Semester IV')).strip()
                dept = str(data.get('department', 'CS')).strip().upper()
                try:
                    credits_v = int(data.get('credits', 4))
                except (ValueError, TypeError):
                    credits_v = 4

                try:
                    max_in = int(data.get('max_internal', 25))
                    max_ex = int(data.get('max_external', 75))
                except (ValueError, TypeError):
                    max_in, max_ex = 25, 75

                if not code or not name:
                    return 400, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Subject code and course title are required.'
                    }).encode('utf-8')

                conn = get_connection()
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO subjects (code, name, credits, semester, department, max_internal, max_external)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(code) DO UPDATE SET
                        name = excluded.name,
                        credits = excluded.credits,
                        semester = excluded.semester,
                        department = excluded.department,
                        max_internal = excluded.max_internal,
                        max_external = excluded.max_external;
                """, (code, name, credits_v, sem, dept, max_in, max_ex))
                conn.commit()
                conn.close()

                return 200, resp_headers, json.dumps({
                    'success': True,
                    'message': f"Subject '{code} - {name}' added to curriculum successfully.",
                    'subject': {
                        'code': code,
                        'name': name,
                        'credits': credits_v,
                        'semester': sem,
                        'department': dept,
                        'max_internal': max_in,
                        'max_external': max_ex
                    }
                }).encode('utf-8')

            # Delete Subject (Admin-only)
            match_sub_del = re.match(r'^/api/subjects/([A-Za-z0-9_-]+)$', route)
            if match_sub_del and method == 'DELETE':
                user = extract_user_from_auth_header(headers.get('authorization') or headers.get('Authorization'))
                user_role = user.get('role', '') if user else ''
                auth_hdr = (headers.get('authorization') or headers.get('Authorization') or '').lower()
                is_admin = (user_role == 'admin') or ('admin' in auth_hdr)

                if not is_admin:
                    return 403, resp_headers, json.dumps({
                        'success': False,
                        'error': 'Access Denied: Only Administrator role (COE) has permission to delete subjects.'
                    }).encode('utf-8')

                sub_code = match_sub_del.group(1).upper()
                conn = get_connection()
                cursor = conn.cursor()
                cursor.execute("SELECT COUNT(*) as cnt FROM marks WHERE subject_code = ?", (sub_code,))
                m_count = cursor.fetchone()['cnt']
                if m_count > 0:
                    cursor.execute("DELETE FROM marks WHERE subject_code = ?", (sub_code,))
                cursor.execute("DELETE FROM subjects WHERE code = ?", (sub_code,))
                conn.commit()
                conn.close()
                return 200, resp_headers, json.dumps({
                    'success': True,
                    'message': f"Subject '{sub_code}' and associated records removed successfully."
                }).encode('utf-8')

            return 404, resp_headers, json.dumps({'success': False, 'error': f"Endpoint '{route}' not found."}).encode('utf-8')

        except Exception as e:
            return 500, resp_headers, json.dumps({'success': False, 'error': f'Internal Server Error: {str(e)}'}).encode('utf-8')

