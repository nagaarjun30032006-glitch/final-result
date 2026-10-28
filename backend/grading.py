"""
==============================================================================
RESULT CALCULATION ENGINE — J.J. COLLEGE OF ARTS & SCIENCE (AUTONOMOUS)
University CBCS 10-Point Grading System, GPA/CGPA & Classifications
==============================================================================
"""

from typing import List, Dict, Any, Tuple

# University CBCS 10-point Grade Scale Mapping
GRADE_SCALE = [
    (90, 100, 'O', 10, 'Outstanding'),
    (80, 89, 'A+', 9, 'Excellent'),
    (70, 79, 'A', 8, 'Very Good'),
    (60, 69, 'B+', 7, 'Good'),
    (50, 59, 'B', 6, 'Above Average'),
    (40, 49, 'C', 5, 'Pass'),
    (0, 39, 'RA', 0, 'Re-Appear')
]

def calculate_subject_result(
    internal: float,
    external: float,
    max_internal: float = 25.0,
    max_external: float = 75.0,
    is_cia_only: bool = False
) -> Dict[str, Any]:
    """
    Calculates total marks, letter grade, grade points, and pass/fail result
    based on Autonomous CBCS Regulation standards.

    Passing Norms:
    1. External Exam Passing Minimum: 40% of max external (e.g. 30 out of 75).
    2. Total Aggregate Passing Minimum: 40% of max total (e.g. 40 out of 100).
    3. Both minimums must be satisfied for a PASS result.
    """
    try:
        int_m = float(internal)
        ext_m = float(external)
    except (ValueError, TypeError):
        return {
            'total_mark': 0.0,
            'letter_grade': 'RA',
            'grade_point': 0,
            'result': 'RA',
            'status_note': 'Invalid mark input values'
        }

    # Bounds validation
    int_m = max(0.0, min(max_internal, int_m))
    ext_m = max(0.0, min(max_external, ext_m))

    total = round(int_m + ext_m, 1)

    if is_cia_only:
        # Continuous assessment only
        return {
            'total_mark': round(int_m, 1),
            'letter_grade': 'CIA',
            'grade_point': round((int_m / max_internal) * 10, 1),
            'result': 'PASS' if int_m >= (0.4 * max_internal) else 'RA',
            'status_note': 'Internal Assessment Evaluation'
        }

    min_external_required = 0.40 * max_external  # 30 marks out of 75
    min_total_required = 0.40 * (max_internal + max_external)  # 40 marks out of 100

    has_passed = (ext_m >= min_external_required) and (total >= min_total_required)

    if not has_passed:
        return {
            'total_mark': total,
            'letter_grade': 'RA',
            'grade_point': 0,
            'result': 'RA',
            'status_note': 'Re-Appear (Arrear in Theory/Practical)'
        }

    # Determine Grade and Grade Point from Scale
    # Normalize total to 100 scale if maximum is non-standard
    max_total = max_internal + max_external
    normalized_percentage = (total / max_total) * 100 if max_total > 0 else 0

    letter_grade = 'C'
    grade_point = 5
    description = 'Pass'

    for low, high, grade, gp, desc in GRADE_SCALE:
        if low <= round(normalized_percentage) <= high:
            letter_grade = grade
            grade_point = gp
            description = desc
            break

    return {
        'total_mark': total,
        'letter_grade': letter_grade,
        'grade_point': grade_point,
        'result': 'PASS',
        'status_note': description
    }

def calculate_gpa(marks_records: List[Dict[str, Any]]) -> float:
    """
    Calculates Semester Grade Point Average (SGPA/GPA)
    Formula: Sum(Credits * Grade Point) / Sum(Credits)
    """
    total_credit_points = 0.0
    total_credits = 0.0

    for rec in marks_records:
        credits = float(rec.get('credits', 4) or 4)
        gp = float(rec.get('grade_point', 0) or 0)
        total_credit_points += (credits * gp)
        total_credits += credits

    if total_credits == 0:
        return 0.0

    return round(total_credit_points / total_credits, 2)

def calculate_cgpa(cumulative_records: List[Dict[str, Any]]) -> float:
    """
    Calculates Cumulative Grade Point Average (CGPA) across multiple semesters.
    """
    return calculate_gpa(cumulative_records)

def get_performance_classification(cgpa: float, all_passed: bool = True) -> str:
    """
    Returns collegiate academic honors classification.
    """
    if not all_passed or cgpa < 5.0:
        return 'REAPPEAR'
    if cgpa >= 8.5:
        return 'PASS / FIRST CLASS WITH DISTINCTION'
    if cgpa >= 6.5:
        return 'PASS / FIRST CLASS'
    return 'PASS / SECOND CLASS'

