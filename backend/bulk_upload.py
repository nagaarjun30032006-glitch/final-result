"""
==============================================================================
BULK DATA INGESTION ENGINE — J.J. COLLEGE OF ARTS & SCIENCE (AUTONOMOUS)
High-Throughput Excel (.xlsx) & CSV Parser with Automated Grade Calculation
==============================================================================
"""

import io
import re
import pandas as pd
from typing import Dict, Any, List, Optional
from database import get_connection
from grading import calculate_subject_result

REGISTER_NUMBER_REGEX = re.compile(r'^[A-Z]{0,2}[0-9]{2}[A-Z]{2,4}[0-9]{3,5}$', re.IGNORECASE)

COLUMN_ALIASES = {
    'register_number': ['register_number', 'reg_no', 'regno', 'reg_number', 'register_no', 'reg_num', 'student_id', 'roll_no', 'rollno', 'register number'],
    'subject_code': ['subject_code', 'course_code', 'sub_code', 'subject', 'code', 'subject code'],
    'internal_mark': ['internal_mark', 'internal', 'cia', 'cia_mark', 'int_mark', 'int', 'internal mark (25)', 'internal mark'],
    'external_mark': ['external_mark', 'external', 'ese', 'ese_mark', 'ext_mark', 'ext', 'university_mark', 'external mark (75)', 'external mark'],
    'semester': ['semester', 'sem', 'current_semester'],
    'academic_year': ['academic_year', 'year', 'session', 'acad_year', 'academic year'],
    'exam_type': ['exam_type', 'type', 'examination_type', 'exam type'],
    'student_name': ['student_name', 'name', 'candidate_name', 'student name'],
    'subject_name': ['subject_name', 'course_name', 'title', 'subject name'],
    'credits': ['credits', 'credit', 'cr']
}

def normalize_column_name(col_name: str) -> str:
    """Normalizes arbitrary Excel/CSV header text to standard canonical key."""
    clean = str(col_name).strip().lower().replace('-', '_').replace(' ', '_')
    for canonical, aliases in COLUMN_ALIASES.items():
        if clean in aliases or col_name.strip().lower() in aliases:
            return canonical
        for a in aliases:
            if clean.startswith(a) or a in clean:
                return canonical
    return clean

def parse_and_ingest_marks(
    file_bytes: bytes,
    filename: str,
    default_academic_year: str = '2025 - 2026',
    default_semester: str = 'Semester IV',
    default_exam_type: str = 'Regular - End Semester',
    updated_by: str = 'admin'
) -> Dict[str, Any]:
    """
    Parses an uploaded Excel or CSV file, performs comprehensive validation,
    calculates grades and results, and ingests records into the SQLite database.
    """
    fn_lower = filename.lower()
    
    try:
        if fn_lower.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(file_bytes), dtype=str)
        elif fn_lower.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(io.BytesIO(file_bytes), dtype=str, engine='openpyxl')
        else:
            return {
                'success': False,
                'error': f"Unsupported file format '{filename}'. Please upload an Excel (.xlsx) or CSV (.csv) file."
            }
    except Exception as e:
        return {
            'success': False,
            'error': f"Failed to parse file: {str(e)}"
        }

    if df.empty:
        return {
            'success': False,
            'error': "Uploaded file contains no data rows."
        }

    # Map column headers to canonical names
    rename_map = {}
    for col in df.columns:
        canonical = normalize_column_name(col)
        rename_map[col] = canonical

    df = df.rename(columns=rename_map)

    # Validate required columns
    required_cols = ['register_number', 'subject_code', 'internal_mark', 'external_mark']
    missing_cols = [c for c in required_cols if c not in df.columns]

    if missing_cols:
        return {
            'success': False,
            'error': f"Missing required column headers: {', '.join(missing_cols)}. Expected headers include Register Number, Subject Code, Internal Mark, External Mark."
        }

    conn = get_connection()
    cursor = conn.cursor()

    total_rows = len(df)
    inserted_count = 0
    updated_count = 0
    errors: List[Dict[str, Any]] = []

    try:
        cursor.execute("BEGIN TRANSACTION;")

        for idx, row in df.iterrows():
            row_num = idx + 2  # Excel 1-based row with header at 1

            raw_reg = str(row.get('register_number', '')).strip().upper()
            raw_code = str(row.get('subject_code', '')).strip().upper()
            raw_internal = str(row.get('internal_mark', '')).strip()
            raw_external = str(row.get('external_mark', '')).strip()

            sem = str(row.get('semester', '')).strip() or default_semester
            acad_year = str(row.get('academic_year', '')).strip() or default_academic_year
            ex_type = str(row.get('exam_type', '')).strip() or default_exam_type
            student_name = str(row.get('student_name', '')).strip()
            subject_name = str(row.get('subject_name', '')).strip()

            # Skip blank rows
            if not raw_reg and not raw_code:
                continue

            # 1. Validate Register Number
            if not raw_reg or not REGISTER_NUMBER_REGEX.match(raw_reg):
                errors.append({
                    'row': row_num,
                    'register_number': raw_reg,
                    'reason': f"Invalid Register Number format '{raw_reg}'. Expected format like P26CA2029."
                })
                continue

            # 2. Validate Subject Code
            if not raw_code or len(raw_code) < 3:
                errors.append({
                    'row': row_num,
                    'register_number': raw_reg,
                    'reason': f"Invalid Subject Code '{raw_code}'."
                })
                continue

            # 3. Validate Marks
            try:
                int_m = float(raw_internal)
                ext_m = float(raw_external)
            except (ValueError, TypeError):
                errors.append({
                    'row': row_num,
                    'register_number': raw_reg,
                    'reason': f"Marks must be numerical numbers. Found internal='{raw_internal}', external='{raw_external}'."
                })
                continue

            if int_m < 0 or int_m > 25:
                errors.append({
                    'row': row_num,
                    'register_number': raw_reg,
                    'reason': f"Internal mark {int_m} out of bounds (allowed: 0 to 25)."
                })
                continue

            if ext_m < 0 or ext_m > 75:
                errors.append({
                    'row': row_num,
                    'register_number': raw_reg,
                    'reason': f"External mark {ext_m} out of bounds (allowed: 0 to 75)."
                })
                continue

            # Auto-register student if missing
            cursor.execute("SELECT register_number FROM students WHERE UPPER(register_number) = ?", (raw_reg,))
            if not cursor.fetchone():
                dept_match = re.search(r'[A-Z]+', raw_reg)
                dept_code = dept_match.group(0) if dept_match else 'CS'
                name_to_use = student_name or f"Candidate {raw_reg}"
                cursor.execute("""
                    INSERT INTO students (register_number, name, dob, department, degree, regulation, current_semester, admission_year)
                    VALUES (?, ?, '15/08/2005', ?, 'Bachelor of Science (B.Sc.)', 'CBCS Regulation 2023', ?, 2023)
                """, (raw_reg, name_to_use, f"Department of {dept_code}", sem))

                from auth_service import hash_password
                pw_hash = hash_password('15/08/2005')
                cursor.execute("""
                    INSERT OR IGNORE INTO users (username, password_hash, role, name, email)
                    VALUES (?, ?, 'student', ?, ?)
                """, (raw_reg, pw_hash, name_to_use, f"{raw_reg.lower()}@jjcollege.edu.in"))

            # Auto-register subject if missing
            cursor.execute("SELECT code FROM subjects WHERE code = ?", (raw_code,))
            if not cursor.fetchone():
                sub_title = subject_name or f"Course {raw_code}"
                cursor.execute("""
                    INSERT INTO subjects (code, name, credits, semester, department, max_internal, max_external)
                    VALUES (?, ?, 4, ?, 'CS', 25, 75)
                """, (raw_code, sub_title, sem))

            # Automated result calculation
            eval_res = calculate_subject_result(int_m, ext_m)

            # Check existing entry for insert vs update metric
            cursor.execute("""
                SELECT id FROM marks 
                WHERE register_number = ? AND subject_code = ? AND semester = ? AND academic_year = ? AND exam_type = ?
            """, (raw_reg, raw_code, sem, acad_year, ex_type))
            existing = cursor.fetchone()

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
                raw_reg, raw_code, sem, acad_year, ex_type,
                int_m, ext_m, eval_res['total_mark'], eval_res['grade_point'],
                eval_res['letter_grade'], eval_res['result'], updated_by
            ))

            if existing:
                updated_count += 1
            else:
                inserted_count += 1

        conn.commit()

    except Exception as db_err:
        conn.rollback()
        conn.close()
        return {
            'success': False,
            'error': f"Database transaction failed: {str(db_err)}"
        }

    conn.close()

    return {
        'success': True,
        'filename': filename,
        'total_rows': total_rows,
        'total_rows_processed': total_rows,
        'inserted': inserted_count,
        'updated': updated_count,
        'failed': len(errors),
        'errors': errors
    }

def generate_sample_template(file_format: str = 'xlsx') -> bytes:
    """
    Generates a clean sample Excel or CSV template populated with sample student records.
    """
    sample_records = [
        {
            'Register Number': 'P26CA2029',
            'Student Name': 'Ananya Raman',
            'Subject Code': 'CS401',
            'Subject Name': 'Database Management Systems & SQL',
            'Semester': 'Semester IV',
            'Academic Year': '2025 - 2026',
            'Exam Type': 'Regular - End Semester',
            'Internal Mark (25)': 24,
            'External Mark (75)': 67
        },
        {
            'Register Number': 'P26CA2029',
            'Student Name': 'Ananya Raman',
            'Subject Code': 'CS402',
            'Subject Name': 'Design and Analysis of Algorithms',
            'Semester': 'Semester IV',
            'Academic Year': '2025 - 2026',
            'Exam Type': 'Regular - End Semester',
            'Internal Mark (25)': 23,
            'External Mark (75)': 64
        },
        {
            'Register Number': 'P26CA2030',
            'Student Name': 'Bhavani Shankar',
            'Subject Code': 'CS401',
            'Subject Name': 'Database Management Systems & SQL',
            'Semester': 'Semester IV',
            'Academic Year': '2025 - 2026',
            'Exam Type': 'Regular - End Semester',
            'Internal Mark (25)': 22,
            'External Mark (75)': 58
        },
        {
            'Register Number': '23CS002',
            'Student Name': 'Bhavani Shankar',
            'Subject Code': 'CS402',
            'Subject Name': 'Design and Analysis of Algorithms',
            'Semester': 'Semester IV',
            'Academic Year': '2025 - 2026',
            'Exam Type': 'Regular - End Semester',
            'Internal Mark (25)': 20,
            'External Mark (75)': 55
        },
        {
            'Register Number': '23CS003',
            'Student Name': 'Deepak Sundaram',
            'Subject Code': 'CS401',
            'Subject Name': 'Database Management Systems & SQL',
            'Semester': 'Semester IV',
            'Academic Year': '2025 - 2026',
            'Exam Type': 'Regular - End Semester',
            'Internal Mark (25)': 25,
            'External Mark (75)': 70
        }
    ]

    df = pd.DataFrame(sample_records)
    output = io.BytesIO()

    if file_format.lower() == 'csv':
        df.to_csv(output, index=False, encoding='utf-8')
    else:
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, sheet_name='Class Marks Ledger', index=False)
            # Auto-fit column widths
            worksheet = writer.sheets['Class Marks Ledger']
            for col in worksheet.columns:
                max_len = max(len(str(cell.value or '')) for cell in col)
                col_letter = col[0].column_letter
                worksheet.column_dimensions[col_letter].width = max(max_len + 4, 12)

    return output.getvalue()
