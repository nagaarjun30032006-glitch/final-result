/**
 * ==============================================================================
 * J.J. COLLEGE OF ARTS & SCIENCE (AUTONOMOUS) — STUDENT AUTHENTICATION MODULE
 * ==============================================================================
 * 
 * SECURITY & PRIVACY NOTICE:
 * --------------------------
 * 1. Register Number and Date of Birth constitute Personally Identifiable Information (PII).
 * 2. Date of Birth is NOT a cryptographically secure authentication secret.
 * 3. This module contains a typed client-side mock authentication utility designed
 *    strictly for demonstration and UX/design validation.
 * 4. In a production enterprise collegiate portal, authentication MUST be validated
 *    server-side using secure encrypted transports, multi-factor authentication (MFA/OTP),
 *    rate limiting, and constant-time password comparisons.
 * 5. COMPLIANCE REQUIREMENT:
 *    - Neither the register number nor date of birth is EVER stored in persistent
 *      browser storage (localStorage, sessionStorage, or IndexedDB).
 *    - Neither credential value is EVER logged to the browser console.
 * ==============================================================================
 */

// Configuration for College Register Number Format
// Format: Optional program prefix (e.g. P/U) + 2-digit batch year + 2-4 letter department code + 3-5 digit roll sequence (e.g., P26CA2029, 23CS001)
const REGISTER_NUMBER_REGEX = /^[A-Z]{0,2}[0-9]{2}[A-Z]{2,4}[0-9]{3,5}$/i;

/**
 * Standard examination semester datasets for academic evaluation.
 * Follows autonomous CBCS format: Internal (max 25) + External (max 75) = Total (max 100).
 */
const EXAMINATION_DATASETS = {
  'Semester IV': {
    'Regular - End Semester': [
      { code: 'CS401', name: 'Database Management Systems & SQL', internal: 24, external: 67, maxInternal: 25, maxExternal: 75, total: 91, result: 'PASS' },
      { code: 'CS402', name: 'Design and Analysis of Algorithms', internal: 23, external: 64, maxInternal: 25, maxExternal: 75, total: 87, result: 'PASS' },
      { code: 'CS403', name: 'Computer Networks & Protocols', internal: 24, external: 68, maxInternal: 25, maxExternal: 75, total: 92, result: 'PASS' },
      { code: 'CS404', name: 'Software Engineering & Agile Methodologies', internal: 22, external: 63, maxInternal: 25, maxExternal: 75, total: 85, result: 'PASS' },
      { code: 'CSP04', name: 'Database Systems & Networks Practical', internal: 25, external: 70, maxInternal: 25, maxExternal: 75, total: 95, result: 'PASS' },
      { code: 'NME02', name: 'Digital Typography & Visual Communication', internal: 23, external: 62, maxInternal: 25, maxExternal: 75, total: 85, result: 'PASS' }
    ],
    'Continuous Internal (CIA)': [
      { code: 'CS401', name: 'Database Management Systems & SQL', internal: 24, external: 0, maxInternal: 25, maxExternal: 0, total: 24, result: 'PASS' },
      { code: 'CS402', name: 'Design and Analysis of Algorithms', internal: 23, external: 0, maxInternal: 25, maxExternal: 0, total: 23, result: 'PASS' },
      { code: 'CS403', name: 'Computer Networks & Protocols', internal: 24, external: 0, maxInternal: 25, maxExternal: 0, total: 24, result: 'PASS' },
      { code: 'CS404', name: 'Software Engineering & Agile Methodologies', internal: 22, external: 0, maxInternal: 25, maxExternal: 0, total: 22, result: 'PASS' }
    ]
  },
  'Semester III': {
    'Regular - End Semester': [
      { code: 'CS301', name: 'Data Structures & OOP with Java', internal: 24, external: 65, maxInternal: 25, maxExternal: 75, total: 89, result: 'PASS' },
      { code: 'CS302', name: 'Database Systems', internal: 22, external: 61, maxInternal: 25, maxExternal: 75, total: 83, result: 'PASS' },
      { code: 'CS303', name: 'Computer Networks', internal: 23, external: 58, maxInternal: 25, maxExternal: 75, total: 81, result: 'PASS' },
      { code: 'CS304', name: 'Operating Systems & System Architecture', internal: 25, external: 66, maxInternal: 25, maxExternal: 75, total: 91, result: 'PASS' },
      { code: 'CS305', name: 'Software Engineering', internal: 21, external: 60, maxInternal: 25, maxExternal: 75, total: 81, result: 'PASS' }
    ],
    'Supplementary / Arrear': [
      { code: 'CS303', name: 'Computer Networks (Arrear Improvement)', internal: 23, external: 64, maxInternal: 25, maxExternal: 75, total: 87, result: 'PASS' }
    ]
  },
  'Semester II': {
    'Regular - End Semester': [
      { code: 'CS201', name: 'Object Oriented Programming with C++', internal: 23, external: 63, maxInternal: 25, maxExternal: 75, total: 86, result: 'PASS' },
      { code: 'CS202', name: 'Digital Logic & Computer Organization', internal: 22, external: 60, maxInternal: 25, maxExternal: 75, total: 82, result: 'PASS' },
      { code: 'CS203', name: 'Discrete Mathematics', internal: 24, external: 65, maxInternal: 25, maxExternal: 75, total: 89, result: 'PASS' },
      { code: 'CSP02', name: 'C++ & Data Structures Laboratory', internal: 25, external: 69, maxInternal: 25, maxExternal: 75, total: 94, result: 'PASS' }
    ]
  },
  'Semester I': {
    'Regular - End Semester': [
      { code: 'CS101', name: 'Problem Solving & Programming in C', internal: 23, external: 62, maxInternal: 25, maxExternal: 75, total: 85, result: 'PASS' },
      { code: 'CS102', name: 'Mathematical Foundations for Computer Science', internal: 24, external: 66, maxInternal: 25, maxExternal: 75, total: 90, result: 'PASS' },
      { code: 'ENG01', name: 'Professional English & Technical Writing', internal: 22, external: 64, maxInternal: 25, maxExternal: 75, total: 86, result: 'PASS' },
      { code: 'CSP01', name: 'C Programming & Office Automation Lab', internal: 25, external: 70, maxInternal: 25, maxExternal: 75, total: 95, result: 'PASS' }
    ]
  }
};

/**
 * Fictional demonstration students dataset.
 */
const MOCK_STUDENTS_DATABASE = [
  {
    registerNumber: 'P26CA2029',
    dob: '15/08/2005',
    name: 'Ananya Raman',
    gender: 'Female',
    bloodGroup: 'O+',
    degree: 'Master of Computer Applications (M.C.A.)',
    department: 'Computer Applications (Autonomous)',
    departmentCode: 'CA',
    semester: 'Semester IV',
    academicYear: '2025 - 2026',
    admissionYear: 2026,
    regulation: 'CBCS Regulation 2023',
    mentor: 'Dr. K. Swaminathan, M.Sc., Ph.D.',
    email: 'p26ca2029@jjcollege.edu.in',
    phone: '+91 98765 43210',
    guardianName: 'S. Raman',
    address: '12 Anna Nagar, Pudukkottai - 622001',
    collegeCode: 'JJC-1994',
    institution: 'J.J. College of Arts and Science (Autonomous)',
    affiliation: 'Bharathidasan University, Tiruchirappalli',
    naacGrade: 'A++ (Cycle 4, CGPA 3.72/4.00)',
    examinationType: 'Regular - End Semester'
  },
  {
    registerNumber: '23CS001',
    dob: '15/08/2005',
    name: 'Ananya Raman',
    gender: 'Female',
    bloodGroup: 'O+',
    degree: 'Bachelor of Science (B.Sc.)',
    department: 'Computer Science (Autonomous)',
    departmentCode: 'CS',
    semester: 'Semester IV',
    academicYear: '2025 - 2026',
    admissionYear: 2023,
    regulation: 'CBCS Regulation 2023',
    mentor: 'Dr. K. Swaminathan, M.Sc., Ph.D.',
    email: '23cs001@jjcollege.edu.in',
    phone: '+91 98765 43211',
    guardianName: 'S. Raman',
    address: '12 Anna Nagar, Pudukkottai - 622001',
    collegeCode: 'JJC-1994',
    institution: 'J.J. College of Arts and Science (Autonomous)',
    affiliation: 'Bharathidasan University, Tiruchirappalli',
    naacGrade: 'A++ (Cycle 4, CGPA 3.72/4.00)',
    examinationType: 'Regular - End Semester'
  },
  {
    registerNumber: '23CS042',
    dob: '04/11/2004',
    name: 'Karthik Raja',
    gender: 'Male',
    bloodGroup: 'B+',
    degree: 'Bachelor of Science (B.Sc.)',
    department: 'Computer Science (Autonomous)',
    departmentCode: 'CS',
    semester: 'Semester IV',
    academicYear: '2025 - 2026',
    admissionYear: 2023,
    regulation: 'CBCS Regulation 2023',
    mentor: 'Prof. R. Revathi, M.C.A.',
    email: '23cs042@jjcollege.edu.in',
    phone: '+91 98401 23456',
    guardianName: 'M. Raja',
    address: '45 North Street, Trichy - 620002',
    collegeCode: 'JJC-1994',
    institution: 'J.J. College of Arts and Science (Autonomous)',
    affiliation: 'Bharathidasan University, Tiruchirappalli',
    naacGrade: 'A++ (Cycle 4, CGPA 3.72/4.00)',
    examinationType: 'Regular - End Semester'
  },
  {
    registerNumber: '22EC108',
    dob: '22/01/2004',
    name: 'Meera Krishnan',
    gender: 'Female',
    bloodGroup: 'A+',
    degree: 'Bachelor of Engineering (B.E.)',
    department: 'Electronics & Communication Engineering',
    departmentCode: 'EC',
    semester: 'Semester VI',
    academicYear: '2025 - 2026',
    admissionYear: 2022,
    regulation: 'CBCS Regulation 2022',
    mentor: 'Dr. S. Balasubramanian, Ph.D.',
    email: '22ec108@jjcollege.edu.in',
    phone: '+91 94432 10987',
    guardianName: 'K. Krishnan',
    address: '88 Main Road, Thanjavur - 613001',
    collegeCode: 'JJC-1994',
    institution: 'J.J. College of Arts and Science (Autonomous)',
    affiliation: 'Bharathidasan University, Tiruchirappalli',
    naacGrade: 'A++ (Cycle 4, CGPA 3.72/4.00)',
    examinationType: 'Regular - End Semester'
  }
];

/**
 * Standard date validator ensuring Gregorian compliance, leap years, and no future dates.
 */
function validateDateOfBirth(dobString) {
  if (!dobString || typeof dobString !== 'string') {
    return { isValid: false, error: 'Date of birth is required.' };
  }

  const cleaned = dobString.replace(/\s+/g, '');
  const parts = cleaned.split('/');

  if (parts.length !== 3) {
    return { isValid: false, error: 'Please enter date in DD/MM/YYYY format.' };
  }

  const [dayStr, monthStr, yearStr] = parts;

  if (!/^\d{2}$/.test(dayStr) || !/^\d{2}$/.test(monthStr) || !/^\d{4}$/.test(yearStr)) {
    return { isValid: false, error: 'Incomplete date. Must be 2-digit day, 2-digit month, 4-digit year.' };
  }

  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Month must be between 01 and 12.' };
  }

  if (year < 1940) {
    return { isValid: false, error: 'Year must be 1940 or later.' };
  }

  const daysInMonth = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const maxDay = daysInMonth[month - 1];

  if (day < 1 || day > maxDay) {
    if (month === 2 && day === 29) {
      return { isValid: false, error: `${year} is not a leap year. February only has 28 days.` };
    }
    return { isValid: false, error: `Invalid day for month ${monthStr.padStart(2, '0')}. Max allowed is ${maxDay}.` };
  }

  const parsedDate = new Date(year, month - 1, day, 23, 59, 59, 999);
  const now = new Date();

  if (parsedDate > now) {
    return { isValid: false, error: 'Date of birth cannot be in the future.' };
  }

  return {
    isValid: true,
    normalized: `${dayStr.padStart(2, '0')}/${monthStr.padStart(2, '0')}/${yearStr}`,
    parsedDate
  };
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Validates register number format and presence.
 */
function validateRegisterNumber(regNo) {
  if (!regNo || typeof regNo !== 'string') {
    return { isValid: false, error: 'Register number is required.' };
  }

  const trimmed = regNo.trim().toUpperCase();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'Register number is required.' };
  }

  if (!REGISTER_NUMBER_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: 'Invalid format. Use college format like P26CA2029 (e.g. P + Year + Dept + Roll).'
    };
  }

  return {
    isValid: true,
    normalized: trimmed
  };
}

/**
 * Retrieves the marks for a student given their semester and examination type.
 */
function getMarksForSemester(semester, examType) {
  const semData = EXAMINATION_DATASETS[semester];
  if (semData && semData[examType]) {
    return semData[examType];
  }
  // Fallback to regular semester data if examType is different
  if (semData && semData['Regular - End Semester']) {
    return semData['Regular - End Semester'];
  }
  // Default to Semester IV Regular
  return EXAMINATION_DATASETS['Semester IV']['Regular - End Semester'];
}

/**
 * Mock Student Authentication Function
 */
async function mockStudentLogin(credentials) {
  // Simulate network latency between 800ms and 1200ms
  const delayMs = Math.floor(Math.random() * 400) + 800;
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  if (!credentials || typeof credentials !== 'object') {
    return {
      success: false,
      error: 'Unable to verify your details. Please check your register number and date of birth.'
    };
  }

  const regValidation = validateRegisterNumber(credentials.registerNumber);
  const dobValidation = validateDateOfBirth(credentials.dob);

  if (!regValidation.isValid || !dobValidation.isValid) {
    return {
      success: false,
      error: 'Unable to verify your details. Please check your register number and date of birth.'
    };
  }

  const cleanRegNo = regValidation.normalized;
  const cleanDob = dobValidation.normalized;

  // 1. Verify register number against student register
  const matchedStudent = MOCK_STUDENTS_DATABASE.find((s) => {
    return s.registerNumber.toUpperCase() === cleanRegNo;
  });

  if (!matchedStudent) {
    return {
      success: false,
      error: 'Register number not found in student register. Please check your credentials.'
    };
  }

  // 2. Verify Date of Birth strictly matches registered student record
  const storedDob = (matchedStudent.dob || '').replace(/\s+/g, '');
  if (storedDob !== cleanDob) {
    return {
      success: false,
      error: 'Date of birth does not match the entered register number.'
    };
  }

  return {
    success: true,
    student: JSON.parse(JSON.stringify(matchedStudent))
  };
}

const DEMO_CREDENTIALS = [
  {
    label: 'P26CA2029',
    regNo: 'P26CA2029',
    dob: '15/08/2005',
    studentName: 'Ananya Raman',
    dept: 'M.C.A. (Computer Applications)'
  },
  {
    label: '23CS001',
    regNo: '23CS001',
    dob: '15/08/2005',
    studentName: 'Ananya Raman',
    dept: 'B.Sc. CS'
  },
  {
    label: '23CS042',
    regNo: '23CS042',
    dob: '04/11/2004',
    studentName: 'Karthik Raja',
    dept: 'B.Sc. CS'
  },
  {
    label: '22EC108',
    regNo: '22EC108',
    dob: '22/01/2004',
    studentName: 'Meera Krishnan',
    dept: 'B.E. ECE'
  }
];

const CollegeAuth = {
  REGISTER_NUMBER_REGEX,
  validateDateOfBirth,
  validateRegisterNumber,
  mockStudentLogin,
  getMarksForSemester,
  EXAMINATION_DATASETS,
  DEMO_CREDENTIALS,
  MOCK_STUDENTS_DATABASE
};

if (typeof window !== 'undefined') {
  window.CollegeAuth = CollegeAuth;
}
if (typeof globalThis !== 'undefined') {
  globalThis.CollegeAuth = CollegeAuth;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CollegeAuth;
}
