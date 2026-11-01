"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkle,
  FilePdf,
  MagnifyingGlass,
  SealCheck,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";

interface SubjectResult {
  code: string;
  name: string;
  credits: number;
  internal: number;
  external: number;
  total: number;
  grade: string;
  status: "PASS" | "RA";
}

const SAMPLE_MARKSHEETS: Record<string, {
  regNo: string;
  studentName: string;
  degree: string;
  semester: string;
  examSession: string;
  sgpa: string;
  cgpa: string;
  result: "FIRST CLASS WITH DISTINCTION" | "FIRST CLASS" | "PASS";
  subjects: SubjectResult[];
}> = {
  "21CS101": {
    regNo: "21CS101",
    studentName: "ANANDHA KRISHNAN M",
    degree: "B.Sc. Computer Science & Data Science",
    semester: "Semester VI (Final)",
    examSession: "April / May 2026",
    sgpa: "9.24",
    cgpa: "8.86",
    result: "FIRST CLASS WITH DISTINCTION",
    subjects: [
      { code: "21CS601", name: "Cloud Computing & DevOps", credits: 5, internal: 24, external: 68, total: 92, grade: "O", status: "PASS" },
      { code: "21CS602", name: "Machine Learning with Python", credits: 5, internal: 23, external: 65, total: 88, grade: "A+", status: "PASS" },
      { code: "21CS603", name: "Cyber Security & Cryptography", credits: 4, internal: 22, external: 61, total: 83, grade: "A+", status: "PASS" },
      { code: "21CS604P", name: "Data Science & ML Practical Lab", credits: 4, internal: 38, external: 57, total: 95, grade: "O", status: "PASS" },
      { code: "21CS605PW", name: "Major Project & Viva-Voce", credits: 6, internal: 39, external: 58, total: 97, grade: "O", status: "PASS" },
    ],
  },
  "22MB204": {
    regNo: "22MB204",
    studentName: "PRIYADHARSHINI S",
    degree: "B.Sc. Microbiology",
    semester: "Semester IV",
    examSession: "November / December 2025",
    sgpa: "8.65",
    cgpa: "8.42",
    result: "FIRST CLASS",
    subjects: [
      { code: "22MB401", name: "Medical Microbiology & Immunology", credits: 5, internal: 22, external: 62, total: 84, grade: "A+", status: "PASS" },
      { code: "22MB402", name: "Industrial & Food Microbiology", credits: 5, internal: 21, external: 59, total: 80, grade: "A+", status: "PASS" },
      { code: "22MB403P", name: "Immunology Practical Laboratory", credits: 4, internal: 36, external: 54, total: 90, grade: "O", status: "PASS" },
      { code: "22MB404", name: "Bio-Instrumentation & Quality Control", credits: 4, internal: 20, external: 55, total: 75, grade: "A", status: "PASS" },
    ],
  },
};

export default function ExaminationPage() {
  const [searchRegNo, setSearchRegNo] = React.useState("21CS101");
  const [currentResult, setCurrentResult] = React.useState<typeof SAMPLE_MARKSHEETS["21CS101"] | null>(SAMPLE_MARKSHEETS["21CS101"]);
  const [searched, setSearched] = React.useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchRegNo.trim().toUpperCase();
    if (SAMPLE_MARKSHEETS[query]) {
      setCurrentResult(SAMPLE_MARKSHEETS[query]);
    } else {
      setCurrentResult(null);
    }
    setSearched(true);
  };

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>Office of the Controller of Examinations</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <Sparkle size={14} weight="bold" />
            <span>Autonomous Evaluation Wing</span>
          </div>

          <h1
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--tx)" }}
          >
            Controller of Examinations (COE)
          </h1>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: "var(--mu)" }}>
            Ensuring credibility, transparency, and timely conduct of autonomous examinations,
            centralized spot valuation, and computerized publication of results.
          </p>
        </div>

        {/* Top 3 Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="college-card p-6">
            <h3 className="font-serif-heading text-lg font-bold mb-2" style={{ color: "var(--tx)" }}>
              Statutory COE Manual
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
              Governing constitution detailing confidential question setting, moderation, scrutiny, and passing board procedures.
            </p>
            <a
              href="https://jjcoll.in/downloads/STATUTORY%20MANUAL%20FOR%20COE%20OFFICE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
              style={{ color: "var(--ac)" }}
            >
              <FilePdf size={16} />
              <span>Download Statutory Manual</span>
            </a>
          </div>

          <div className="college-card p-6">
            <h3 className="font-serif-heading text-lg font-bold mb-2" style={{ color: "var(--tx)" }}>
              The Examination System
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
              Standard operating procedures for CIA (Continuous Internal Assessment) and ESE (End Semester Examination) splits.
            </p>
            <a
              href="https://jjcoll.in/downloads/The%20Examination%20System.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
              style={{ color: "var(--ac)" }}
            >
              <FilePdf size={16} />
              <span>Download Examination System PDF</span>
            </a>
          </div>

          <div className="college-card p-6">
            <h3 className="font-serif-heading text-lg font-bold mb-2" style={{ color: "var(--tx)" }}>
              Grading & Evaluation Scales
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
              UGC 10-point scale: Outstanding (O: 90–100), Excellent (A+: 80–89), Very Good (A: 70–79), Good (B+: 60–69).
            </p>
            <a
              href="https://jjcoll.in/downloads/The%20Evaluation%20Process.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
              style={{ color: "var(--ac)" }}
            >
              <FilePdf size={16} />
              <span>Download Evaluation Process PDF</span>
            </a>
          </div>
        </div>

        {/* Interactive Marksheet Verification System */}
        <div className="college-card p-6 sm:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
              >
                <SealCheck size={14} weight="bold" />
                <span>Live Verification Portal</span>
              </div>
              <h2 className="font-serif-heading text-2xl font-bold" style={{ color: "var(--tx)" }}>
                Autonomous Marksheet & Result Verification
              </h2>
              <p className="text-xs sm:text-sm mt-1" style={{ color: "var(--mu)" }}>
                Enter student registration number to generate and view the verified autonomous semester statement of marks.
              </p>
            </div>

            {/* Demo search pills */}
            <div className="flex items-center gap-2 text-xs">
              <span style={{ color: "var(--mu)" }}>Demo Register Numbers:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchRegNo("21CS101");
                  setCurrentResult(SAMPLE_MARKSHEETS["21CS101"]);
                  setSearched(true);
                }}
                className="px-2.5 py-1 rounded border font-mono font-bold hover:border-[var(--ac)] transition-colors"
                style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
              >
                21CS101
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchRegNo("22MB204");
                  setCurrentResult(SAMPLE_MARKSHEETS["22MB204"]);
                  setSearched(true);
                }}
                className="px-2.5 py-1 rounded border font-mono font-bold hover:border-[var(--ac)] transition-colors"
                style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
              >
                22MB204
              </button>
            </div>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchRegNo}
                onChange={(e) => setSearchRegNo(e.target.value)}
                placeholder="Enter Register Number (e.g. 21CS101)"
                className="w-full px-4 py-3 rounded-xl border text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white flex items-center gap-2 shadow-xs cursor-pointer"
              style={{ backgroundColor: "var(--ac)" }}
            >
              <MagnifyingGlass size={16} weight="bold" />
              <span>Verify Result</span>
            </button>
          </form>

          {/* Marksheet Display */}
          {searched && currentResult && (
            <div
              className="p-6 sm:p-8 rounded-2xl border transition-colors animate-in fade-in"
              style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}
            >
              {/* Marksheet Header */}
              <div className="text-center pb-6 border-b border-[var(--ln)] mb-6">
                <div className="font-serif-heading text-xl sm:text-2xl font-bold" style={{ color: "var(--tx)" }}>
                  J.J. COLLEGE OF ARTS AND SCIENCE (AUTONOMOUS)
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                  Re-Accredited with B++ by NAAC · Sivapuram, Pudukkottai – 622 422
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: "var(--ac)" }}>
                  Statement of Marks and Grades · Comprehensive Semester Examination
                </div>
              </div>

              {/* Student Details Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-6">
                <div>
                  <span style={{ color: "var(--mu)" }}>Register Number</span>
                  <div className="font-mono font-bold text-sm" style={{ color: "var(--tx)" }}>{currentResult.regNo}</div>
                </div>
                <div>
                  <span style={{ color: "var(--mu)" }}>Student Name</span>
                  <div className="font-bold text-sm" style={{ color: "var(--tx)" }}>{currentResult.studentName}</div>
                </div>
                <div>
                  <span style={{ color: "var(--mu)" }}>Degree & Branch</span>
                  <div className="font-bold text-sm" style={{ color: "var(--tx)" }}>{currentResult.degree}</div>
                </div>
                <div>
                  <span style={{ color: "var(--mu)" }}>Examination Session</span>
                  <div className="font-bold text-sm" style={{ color: "var(--tx)" }}>{currentResult.examSession}</div>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <div className="overflow-x-auto rounded-xl border border-[var(--ln)] mb-6">
                <table className="w-full text-left text-xs border-collapse" style={{ backgroundColor: "var(--sf)" }}>
                  <thead>
                    <tr className="border-b border-[var(--ln)]" style={{ backgroundColor: "var(--pp)" }}>
                      <th className="py-2.5 px-3 font-semibold" style={{ color: "var(--tx)" }}>Course Code</th>
                      <th className="py-2.5 px-3 font-semibold" style={{ color: "var(--tx)" }}>Course Title</th>
                      <th className="py-2.5 px-3 font-semibold text-center" style={{ color: "var(--tx)" }}>Credits</th>
                      <th className="py-2.5 px-3 font-semibold text-center" style={{ color: "var(--tx)" }}>CIA (25/40)</th>
                      <th className="py-2.5 px-3 font-semibold text-center" style={{ color: "var(--tx)" }}>ESE (75/60)</th>
                      <th className="py-2.5 px-3 font-semibold text-center" style={{ color: "var(--tx)" }}>Total (100)</th>
                      <th className="py-2.5 px-3 font-semibold text-center" style={{ color: "var(--tx)" }}>Grade</th>
                      <th className="py-2.5 px-3 font-semibold text-right" style={{ color: "var(--tx)" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--ln)]">
                    {currentResult.subjects.map((sub) => (
                      <tr key={sub.code}>
                        <td className="py-2.5 px-3 font-mono font-semibold" style={{ color: "var(--tx)" }}>{sub.code}</td>
                        <td className="py-2.5 px-3 font-medium" style={{ color: "var(--tx)" }}>{sub.name}</td>
                        <td className="py-2.5 px-3 text-center" style={{ color: "var(--mu)" }}>{sub.credits}</td>
                        <td className="py-2.5 px-3 text-center" style={{ color: "var(--mu)" }}>{sub.internal}</td>
                        <td className="py-2.5 px-3 text-center" style={{ color: "var(--mu)" }}>{sub.external}</td>
                        <td className="py-2.5 px-3 text-center font-bold" style={{ color: "var(--tx)" }}>{sub.total}</td>
                        <td className="py-2.5 px-3 text-center font-bold" style={{ color: "var(--ac)" }}>{sub.grade}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle size={13} weight="fill" />
                            <span>{sub.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* GPA & Classification Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border" style={{ backgroundColor: "var(--ac2)", borderColor: "var(--ln)" }}>
                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <span style={{ color: "var(--mu)" }}>Semester GPA (SGPA):</span>
                    <span className="font-serif-heading text-lg font-bold ml-2" style={{ color: "var(--tx)" }}>{currentResult.sgpa}</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--mu)" }}>Cumulative GPA (CGPA):</span>
                    <span className="font-serif-heading text-lg font-bold ml-2" style={{ color: "var(--ac)" }}>{currentResult.cgpa}</span>
                  </div>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <SealCheck size={18} weight="fill" />
                  <span>{currentResult.result}</span>
                </div>
              </div>
            </div>
          )}

          {searched && !currentResult && (
            <div className="p-8 rounded-2xl border text-center" style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}>
              <WarningCircle size={36} className="mx-auto text-amber-500 mb-2" />
              <h3 className="font-serif-heading text-lg font-bold" style={{ color: "var(--tx)" }}>
                No Marksheet Found for &quot;{searchRegNo}&quot;
              </h3>
              <p className="text-xs max-w-sm mx-auto mt-1" style={{ color: "var(--mu)" }}>
                Please check the register number and try again. For demo verification, click <strong>21CS101</strong> or <strong>22MB204</strong> above.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

