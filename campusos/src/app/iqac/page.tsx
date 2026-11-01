"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkle,
  FilePdf,
  CalendarCheck,
  ShieldCheck,
  ChartLineUp,
} from "@phosphor-icons/react";

export default function IQACPage() {
  const AQAR_YEARS = [
    { year: "2023–2024", file: "AQAR_2023_24.pdf", size: "3.4 MB" },
    { year: "2022–2023", file: "AQAR_2022_23.pdf", size: "3.1 MB" },
    { year: "2021–2022", file: "AQAR_2021_22.pdf", size: "2.8 MB" },
    { year: "2020–2021", file: "AQAR_2020_21.pdf", size: "2.6 MB" },
    { year: "2019–2020", file: "AQAR_2019_20.pdf", size: "2.5 MB" },
  ];

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>Internal Quality Assurance Cell</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <Sparkle size={14} weight="bold" />
            <span>Institutional Quality Benchmark</span>
          </div>

          <h1
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--tx)" }}
          >
            Internal Quality Assurance Cell (IQAC)
          </h1>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: "var(--mu)" }}>
            Catalyzing continuous quality enhancement, pedagogical innovations, NAAC compliance,
            and stakeholder feedback integration at J.J. College of Arts and Science.
          </p>
        </div>

        {/* Core IQAC Functions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="college-card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
            >
              <ChartLineUp size={22} weight="bold" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold mb-2" style={{ color: "var(--tx)" }}>
              Continuous Quality Sustenance
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
              Formulating objective quality benchmarks for academic and administrative activities,
              curriculum reviews, and academic audit procedures.
            </p>
          </div>

          <div className="college-card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
            >
              <CalendarCheck size={22} weight="bold" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold mb-2" style={{ color: "var(--tx)" }}>
              Academic Calendar & Audits
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
              Preparing institutional calendar schedules, conducting Annual Academic and Administrative Audits (AAA),
              and monitoring course plan execution.
            </p>
          </div>

          <div className="college-card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
            >
              <ShieldCheck size={22} weight="bold" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold mb-2" style={{ color: "var(--tx)" }}>
              Stakeholder Feedback (360°)
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
              Collecting, analyzing, and reporting structured feedback from students, teachers, employers, and alumni
              for curriculum revisions.
            </p>
          </div>
        </div>

        {/* AQAR Reports & Statutory Disclosures */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* AQAR Archives (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="college-card p-6 sm:p-8">
              <h2 className="font-serif-heading text-2xl font-bold mb-4" style={{ color: "var(--tx)" }}>
                Annual Quality Assurance Reports (AQAR)
              </h2>
              <div className="divide-y divide-[var(--ln)]">
                {AQAR_YEARS.map((aqar) => (
                  <div key={aqar.year} className="py-3.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm" style={{ color: "var(--tx)" }}>
                        AQAR for Academic Year {aqar.year}
                      </div>
                      <div className="text-xs" style={{ color: "var(--mu)" }}>
                        Submitted to NAAC · Verified PDF ({aqar.size})
                      </div>
                    </div>
                    <a
                      href="https://jjcoll.in/AQAR.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border hover:border-[var(--ac)] transition-colors"
                      style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                    >
                      <FilePdf size={14} />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Disclosures (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="college-card p-6 space-y-4">
              <h3 className="font-serif-heading text-lg font-bold" style={{ color: "var(--tx)" }}>
                Accreditation & NIRF Documents
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li>
                  <a
                    href="https://jjcoll.in/SSR.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border hover:border-[var(--ac)] transition-colors"
                    style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                  >
                    <span className="font-semibold">Self Study Report (SSR) - Cycle IV</span>
                    <FilePdf size={16} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://jjcoll.in/NIRF.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border hover:border-[var(--ac)] transition-colors"
                    style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                  >
                    <span className="font-semibold">NIRF Institutional Disclosures</span>
                    <FilePdf size={16} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://jjcoll.in/academic_calender.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border hover:border-[var(--ac)] transition-colors"
                    style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                  >
                    <span className="font-semibold">Academic Calendar 2026–27</span>
                    <FilePdf size={16} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://jjcoll.in/BP.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border hover:border-[var(--ac)] transition-colors"
                    style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                  >
                    <span className="font-semibold">Institutional Best Practices</span>
                    <FilePdf size={16} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

