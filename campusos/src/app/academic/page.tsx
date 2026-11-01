"use client";

import * as React from "react";
import Link from "next/link";
import { COLLEGE_DATA } from "@/lib/college-data";
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
  Sparkle,
  FilePdf,
  CheckCircle,
} from "@phosphor-icons/react";

export default function AcademicPage() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  const categories = [
    { id: "all", label: "All Departments (17)" },
    { id: "Science", label: "Sciences" },
    { id: "Computing & IT", label: "Computing & IT" },
    { id: "Commerce & Management", label: "Commerce & Management" },
    { id: "Arts & Humanities", label: "Arts & Humanities" },
  ];

  const filtered = activeCategory === "all"
    ? COLLEGE_DATA.departments
    : COLLEGE_DATA.departments.filter((d) => d.category === activeCategory);

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>Academic Structure</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <Sparkle size={14} weight="bold" />
            <span>Curricular Excellence</span>
          </div>

          <h1
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--tx)" }}
          >
            Academic Curricula & Departments
          </h1>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: "var(--mu)" }}>
            Our autonomous curriculum adopts Choice Based Credit System (CBCS) and Outcome Based Education (OBE)
            benchmarked with international learning frameworks.
          </p>
        </div>

        {/* OBE / CBCS Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="college-card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
            >
              <GraduationCap size={22} weight="bold" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold mb-2" style={{ color: "var(--tx)" }}>
              Outcome Based Education (OBE)
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
              Every course defines measurable Course Outcomes (COs) mapped systematically to Programme Specific
              Outcomes (PSOs) and graduate attributes.
            </p>
          </div>

          <div className="college-card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
            >
              <BookOpen size={22} weight="bold" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold mb-2" style={{ color: "var(--tx)" }}>
              Choice Based Credit System
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
              Students select interdisciplinary electives, skill development courses, Non-Major Electives (NME),
              and industrial internships across terms.
            </p>
          </div>

          <div className="college-card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
            >
              <CheckCircle size={22} weight="bold" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold mb-2" style={{ color: "var(--tx)" }}>
              Continuous Assessment
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
              Internal assessments comprise seminar presentations, case analyses, laboratory vivas, and periodic
              written cycle tests for comprehensive grading.
            </p>
          </div>
        </div>

        {/* Departments Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--ln)] pb-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: activeCategory === cat.id ? "var(--ac)" : "var(--sf)",
                  color: activeCategory === cat.id ? "#ffffff" : "var(--tx)",
                  border: `1px solid ${activeCategory === cat.id ? "var(--ac)" : "var(--ln)"}`,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <a
            href="https://jjcoll.in/syllabus.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
            style={{ color: "var(--ac)" }}
          >
            <FilePdf size={16} />
            <span>Official Syllabus Archive</span>
          </a>
        </div>

        {/* 17 Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dept) => (
            <Link
              key={dept.id}
              href={`/academic/departments/${dept.slug}`}
              className="college-card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
                  >
                    {dept.category}
                  </span>
                  <span className="text-xs" style={{ color: "var(--mu)" }}>
                    Est. {dept.established}
                  </span>
                </div>

                <h2
                  className="font-serif-heading text-xl font-bold leading-snug group-hover:text-[var(--ac)] transition-colors mb-2"
                  style={{ color: "var(--tx)" }}
                >
                  {dept.name}
                </h2>

                <p className="text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: "var(--mu)" }}>
                  {dept.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dept.degrees.map((d) => (
                    <span
                      key={d}
                      className="text-[11px] font-medium px-2 py-0.5 rounded border"
                      style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-[var(--ln)] flex items-center justify-between text-xs font-semibold">
                  <span style={{ color: "var(--mu)" }}>
                    HOD: <strong style={{ color: "var(--tx)" }}>{dept.hod}</strong>
                  </span>
                  <span
                    className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    style={{ color: "var(--ac)" }}
                  >
                    <span>Department Profile</span>
                    <ArrowRight size={12} weight="bold" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

