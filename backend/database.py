"""
==============================================================================
DATABASE MODULE — J.J. COLLEGE OF ARTS & SCIENCE (AUTONOMOUS)
SQLite3 Relational Database Layer with Automatic Migration & Seed Data
==============================================================================
"""

import sqlite3
import os
import bcrypt
from datetime import datetime

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "college_portal.db")

def get_connection():
    """Returns a SQLite connection with row factory enabled."""
    conn = sqlite3.connect(DB_FILE, timeout=15.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

def hash_pw(plain_password: str) -> str:
    """Hashes a plain password using bcrypt with salt."""
    salt = bcrypt.gensalt(rounds=10)
    return bcrypt.hashpw(plain_password.encode("utf-8"), salt).decode("utf-8")

def init_database():
    """Initializes tables, indexes, and populates initial seed records."""
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Users table (Admin, Faculty, and Student logins)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin', 'faculty', 'student')),
        name TEXT NOT NULL,
        email TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # 2. Students table (Demographics & Academic Registration)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students (
        register_number TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        dob TEXT NOT NULL, -- DD/MM/YYYY
        department TEXT NOT NULL,
        degree TEXT NOT NULL,
        regulation TEXT DEFAULT 'CBCS Regulation 2023',
        current_semester TEXT DEFAULT 'Semester IV',
        admission_year INTEGER DEFAULT 2023,
        mentor TEXT,
        gender TEXT DEFAULT 'Not Specified',
        blood_group TEXT DEFAULT '--',
        email TEXT,
        phone TEXT,
        guardian_name TEXT,
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    for col, col_type in [
        ("gender", "TEXT DEFAULT 'Not Specified'"),
        ("blood_group", "TEXT DEFAULT '--'"),
        ("email", "TEXT"),
        ("phone", "TEXT"),
        ("guardian_name", "TEXT"),
        ("address", "TEXT")
    ]:
        try:
            cursor.execute(f"ALTER TABLE students ADD COLUMN {col} {col_type};")
        except Exception:
            pass

    # 3. Subjects table (CBCS Curriculum & Credit Ledger)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS subjects (
        code TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        credits INTEGER NOT NULL DEFAULT 4,
        semester TEXT NOT NULL,
        department TEXT NOT NULL,
        max_internal INTEGER NOT NULL DEFAULT 25,
        max_external INTEGER NOT NULL DEFAULT 75
    );
    """)

    # 4. Marks table (Subject Scores, Grades & Examination Types)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS marks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        register_number TEXT NOT NULL,
        subject_code TEXT NOT NULL,
        semester TEXT NOT NULL,
        academic_year TEXT NOT NULL,
        exam_type TEXT NOT NULL,
        internal_mark REAL NOT NULL,
        external_mark REAL NOT NULL,
        total_mark REAL NOT NULL,
        grade_point INTEGER NOT NULL,
        letter_grade TEXT NOT NULL,
        result TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by TEXT DEFAULT 'system',
        FOREIGN KEY (register_number) REFERENCES students(register_number) ON DELETE CASCADE,
        FOREIGN KEY (subject_code) REFERENCES subjects(code) ON DELETE CASCADE,
        UNIQUE(register_number, subject_code, semester, academic_year, exam_type)
    );
    """)

    # Indexes for lightning-fast queries
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_marks_student ON marks(register_number);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_marks_session ON marks(semester, academic_year, exam_type);")

    conn.commit()

    # 5. Populate Default Seed Data
    _seed_initial_data(conn)

def _seed_initial_data(conn):
    cursor = conn.cursor()

    # Seed Admin and Faculty accounts (passwords hashed with bcrypt)
    admin_pw_hash = hash_pw("admin@123")
    faculty_pw_hash = hash_pw("faculty@123")

    cursor.execute("""
        INSERT OR IGNORE INTO users (username, password_hash, role, name, email)
        VALUES 
        ('admin', ?, 'admin', 'Dr. S. J. Parasuraman (Controller of Examinations)', 'coe@jjcollege.edu.in'),
        ('faculty', ?, 'faculty', 'Prof. R. Revathi (Department Academic Coordinator)', 'faculty.cs@jjcollege.edu.in')
    """, (admin_pw_hash, faculty_pw_hash))

    # Seed Sample Students with Complete Personal Details
    sample_students = [
        ('P26CA2029', 'Ananya Raman', '15/08/2005', 'Computer Applications (Autonomous)', 'Master of Computer Applications (M.C.A.)', 'CBCS Regulation 2023', 'Semester IV', 2026, 'Dr. K. Swaminathan, M.Sc., Ph.D.', 'Female', 'O+', 'p26ca2029@jjcollege.edu.in', '+91 98765 43210', 'S. Raman', '12 Anna Nagar, Pudukkottai - 622001'),
        ('23CS001', 'Ananya Raman', '15/08/2005', 'Computer Science (Autonomous)', 'Bachelor of Science (B.Sc.)', 'CBCS Regulation 2023', 'Semester IV', 2023, 'Dr. K. Swaminathan, M.Sc., Ph.D.', 'Female', 'O+', '23cs001@jjcollege.edu.in', '+91 98765 43211', 'S. Raman', '12 Anna Nagar, Pudukkottai - 622001'),
        ('23CS042', 'Karthik Raja', '04/11/2004', 'Computer Science (Autonomous)', 'Bachelor of Science (B.Sc.)', 'CBCS Regulation 2023', 'Semester IV', 2023, 'Prof. R. Revathi, M.C.A.', 'Male', 'B+', '23cs042@jjcollege.edu.in', '+91 98401 23456', 'M. Raja', '45 North Street, Trichy - 620002'),
        ('22EC108', 'Meera Krishnan', '22/01/2004', 'Electronics & Communication Engineering', 'Bachelor of Engineering (B.E.)', 'CBCS Regulation 2022', 'Semester VI', 2022, 'Dr. S. Balasubramanian, Ph.D.', 'Female', 'A+', '22ec108@jjcollege.edu.in', '+91 94432 10987', 'K. Krishnan', '88 Main Road, Thanjavur - 613001')
    ]

    for reg_no, name, dob, dept, degree, reg, sem, year, mentor, gender, blood_grp, email, phone, guardian, addr in sample_students:
        cursor.execute("""
            INSERT INTO students (register_number, name, dob, department, degree, regulation, current_semester, admission_year, mentor, gender, blood_group, email, phone, guardian_name, address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(register_number) DO UPDATE SET
                gender = CASE WHEN students.gender IS NULL OR students.gender = 'Not Specified' THEN excluded.gender ELSE students.gender END,
                blood_group = CASE WHEN students.blood_group IS NULL OR students.blood_group = '--' THEN excluded.blood_group ELSE students.blood_group END,
                email = COALESCE(students.email, excluded.email),
                phone = COALESCE(students.phone, excluded.phone),
                guardian_name = COALESCE(students.guardian_name, excluded.guardian_name),
                address = COALESCE(students.address, excluded.address);
        """, (reg_no, name, dob, dept, degree, reg, sem, year, mentor, gender, blood_grp, email, phone, guardian, addr))

        # Also create or update student user entry with hashed DOB for secure login
        student_pw_hash = hash_pw(dob.replace(" ", ""))
        cursor.execute("""
            INSERT OR IGNORE INTO users (username, password_hash, role, name, email)
            VALUES (?, ?, 'student', ?, ?)
        """, (reg_no, student_pw_hash, name, email or f"{reg_no.lower()}@jjcollege.edu.in"))
    conn.commit()

    # Seed Curriculum Subjects across Semesters
    sample_subjects = [
        # Semester IV (B.Sc. CS)
        ('CS401', 'Database Management Systems & SQL', 4, 'Semester IV', 'CS', 25, 75),
        ('CS402', 'Design and Analysis of Algorithms', 4, 'Semester IV', 'CS', 25, 75),
        ('CS403', 'Computer Networks & Protocols', 4, 'Semester IV', 'CS', 25, 75),
        ('CS404', 'Software Engineering & Agile Methodologies', 3, 'Semester IV', 'CS', 25, 75),
        ('CSP04', 'Database Systems & Networks Practical', 3, 'Semester IV', 'CS', 25, 75),
        ('NME02', 'Digital Typography & Visual Communication', 2, 'Semester IV', 'CS', 25, 75),

        # Semester III (B.Sc. CS)
        ('CS301', 'Data Structures & OOP with Java', 4, 'Semester III', 'CS', 25, 75),
        ('CS302', 'Database Systems', 4, 'Semester III', 'CS', 25, 75),
        ('CS303', 'Computer Networks', 4, 'Semester III', 'CS', 25, 75),
        ('CS304', 'Operating Systems & System Architecture', 4, 'Semester III', 'CS', 25, 75),
        ('CS305', 'Software Engineering', 3, 'Semester III', 'CS', 25, 75),

        # Semester II (B.Sc. CS)
        ('CS201', 'Object Oriented Programming with C++', 4, 'Semester II', 'CS', 25, 75),
        ('CS202', 'Digital Logic & Computer Organization', 4, 'Semester II', 'CS', 25, 75),
        ('CS203', 'Discrete Mathematics', 4, 'Semester II', 'CS', 25, 75),
        ('CSP02', 'C++ & Data Structures Laboratory', 3, 'Semester II', 'CS', 25, 75),

        # Semester I (B.Sc. CS)
        ('CS101', 'Problem Solving & Programming in C', 4, 'Semester I', 'CS', 25, 75),
        ('CS102', 'Mathematical Foundations for Computer Science', 4, 'Semester I', 'CS', 25, 75),
        ('ENG01', 'Professional English & Technical Writing', 3, 'Semester I', 'CS', 25, 75),
        ('CSP01', 'C Programming & Office Automation Lab', 3, 'Semester I', 'CS', 25, 75),
    ]

    for code, name, credits, sem, dept, max_in, max_ex in sample_subjects:
        cursor.execute("""
            INSERT OR IGNORE INTO subjects (code, name, credits, semester, department, max_internal, max_external)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (code, name, credits, sem, dept, max_in, max_ex))

    # Seed Initial Marks only if table is newly initialized and not explicitly cleared by user
    flag_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".marks_cleared")
    cursor.execute("SELECT COUNT(*) FROM marks")
    existing_marks_count = cursor.fetchone()[0]

    if os.path.exists(flag_path) or existing_marks_count > 0:
        conn.commit()
        conn.close()
        return

    # Import grading helper locally to compute grades
    from grading import calculate_subject_result

    student_marks_data = [
        # (reg_no, sub_code, sem, year, exam_type, internal, external)
        # Semester IV for P26CA2029
        ('P26CA2029', 'CS401', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 24, 67),
        ('P26CA2029', 'CS402', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 23, 64),
        ('P26CA2029', 'CS403', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 24, 68),
        ('P26CA2029', 'CS404', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 22, 63),
        ('P26CA2029', 'CSP04', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 25, 70),
        ('P26CA2029', 'NME02', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 23, 62),

        # Semester III for P26CA2029
        ('P26CA2029', 'CS301', 'Semester III', '2024 - 2025', 'Regular - End Semester', 24, 65),
        ('P26CA2029', 'CS302', 'Semester III', '2024 - 2025', 'Regular - End Semester', 22, 61),
        ('P26CA2029', 'CS303', 'Semester III', '2024 - 2025', 'Regular - End Semester', 23, 58),
        ('P26CA2029', 'CS304', 'Semester III', '2024 - 2025', 'Regular - End Semester', 25, 66),
        ('P26CA2029', 'CS305', 'Semester III', '2024 - 2025', 'Regular - End Semester', 21, 60),

        # Semester IV for 23CS001
        ('23CS001', 'CS401', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 24, 67),
        ('23CS001', 'CS402', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 23, 64),
        ('23CS001', 'CS403', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 24, 68),
        ('23CS001', 'CS404', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 22, 63),
        ('23CS001', 'CSP04', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 25, 70),
        ('23CS001', 'NME02', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 23, 62),

        # Semester III for 23CS001
        ('23CS001', 'CS301', 'Semester III', '2024 - 2025', 'Regular - End Semester', 24, 65),
        ('23CS001', 'CS302', 'Semester III', '2024 - 2025', 'Regular - End Semester', 22, 61),
        ('23CS001', 'CS303', 'Semester III', '2024 - 2025', 'Regular - End Semester', 23, 58),
        ('23CS001', 'CS304', 'Semester III', '2024 - 2025', 'Regular - End Semester', 25, 66),
        ('23CS001', 'CS305', 'Semester III', '2024 - 2025', 'Regular - End Semester', 21, 60),

        # Sample marks for 23CS042
        ('23CS042', 'CS401', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 21, 58),
        ('23CS042', 'CS402', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 20, 56),
        ('23CS042', 'CS403', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 22, 60),
        ('23CS042', 'CS404', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 19, 54),
        ('23CS042', 'CSP04', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 23, 65),
        ('23CS042', 'NME02', 'Semester IV', '2025 - 2026', 'Regular - End Semester', 21, 57),
    ]

    for reg, sub, sem, yr, ex_type, int_m, ext_m in student_marks_data:
        res = calculate_subject_result(int_m, ext_m)
        cursor.execute("""
            INSERT OR REPLACE INTO marks (
                register_number, subject_code, semester, academic_year, exam_type,
                internal_mark, external_mark, total_mark, grade_point, letter_grade, result, updated_by
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'seed')
        """, (
            reg, sub, sem, yr, ex_type,
            int_m, ext_m, res['total_mark'], res['grade_point'], res['letter_grade'], res['result']
        ))

    conn.commit()
    conn.close()
    print("[DB] Initial database seeding completed successfully.")

if __name__ == "__main__":
    init_database()
    conn.commit()
