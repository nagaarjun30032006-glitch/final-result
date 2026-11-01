"use client";

import * as React from "react";
import Link from "next/link";
import { COLLEGE_DATA } from "@/lib/college-data";
import { BookOpen, ArrowRight } from "@phosphor-icons/react";

export function DepartmentsShowcase() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  const categories = [
    { id: "all", label: "All 17 Departments" },
    { id: "Science", label: "Life & Physical Sciences" },
    { id: "Computing", label: "Computing & IT" },
    { id: "Commerce & Management", label: "Commerce & Management" },
    { id: "Humanities & Languages", label: "Humanities & Arts" },
  ];

  const filtered = activeCategory === "all"
    ? COLLEGE_DATA.departments
    : COLLEGE_DATA.departments.filter((d) => d.category === activeCategory);

  return (
    <section className="py-14 sm:py-20 transition-colors" style={{ backgroundColor: "var(--pp)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl text-left">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
              style={{
                backgroundColor: "var(--ac2)",
                color: "var(--ac)",
              }}
            >
              <BookOpen size={14} weight="bold" />
              <span>Academic Spectrum</span>
            </div>
            <h2
              className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2"
              style={{ color: "var(--tx)" }}
            >
              Academic Departments
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--mu)" }}>
              Undergraduate, Postgraduate, and Doctoral programmes with experiential research facilities.
            </p>
          </div>

          <Link
            href="/academic"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border shrink-0 transition-colors hover:border-[var(--ac)]"
            style={{
              backgroundColor: "var(--sf)",
              borderColor: "var(--ln)",
              color: "var(--tx)",
            }}
          >
            <span>Explore All Curricula</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
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

        {/* Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((dept) => (
            <Link
              key={dept.id}
              href={`/academic/departments/${dept.slug}`}
              className="college-card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: "var(--ac2)",
                      color: "var(--ac)",
                    }}
                  >
                    {dept.category}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "var(--mu)" }}>
                    Est. {dept.established}
                  </span>
                </div>

                <h3
                  className="font-serif-heading text-xl font-bold leading-snug group-hover:text-[var(--ac)] transition-colors mb-2"
                  style={{ color: "var(--tx)" }}
                >
                  {dept.name}
                </h3>

                <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
                  {dept.description}
                </p>
              </div>

              <div>
                {/* Degrees chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dept.degrees.map((deg) => (
                    <span
                      key={deg}
                      className="text-[11px] font-medium px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: "var(--pp)",
                        borderColor: "var(--ln)",
                        color: "var(--tx)",
                      }}
                    >
                      {deg}
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
                    <span>View Dept</span>
                    <ArrowRight size={12} weight="bold" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

