"use client";

import * as React from "react";
import Link from "next/link";
import { COLLEGE_DATA } from "@/lib/college-data";
import { UserCheck, ArrowRight } from "@phosphor-icons/react";

export function LeadershipSection() {
  return (
    <section className="py-14 sm:py-20 border-b border-[var(--ln)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <UserCheck size={14} weight="bold" />
            <span>Institutional Governance</span>
          </div>
          <h2
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--tx)" }}
          >
            Our Administrators
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--mu)" }}>
            Steering J.J. College towards leadership, intellectual vigor, and modern pedagogy.
          </p>
        </div>

        {/* 4 Leadership Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLEGE_DATA.leadership.map((admin) => (
            <div
              key={admin.name}
              className="college-card p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Initials Avatar */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-serif-heading text-2xl font-bold mb-5 shadow-xs transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: "var(--ac2)",
                    color: "var(--ac)",
                  }}
                >
                  {admin.initials}
                </div>

                {/* Name & Role */}
                <h3
                  className="font-serif-heading text-lg sm:text-xl font-bold leading-snug group-hover:text-[var(--ac)] transition-colors mb-1"
                  style={{ color: "var(--tx)" }}
                >
                  {admin.name}
                </h3>
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ color: "var(--ac)" }}
                >
                  {admin.role}
                </div>

                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
                  {admin.quote}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--ln)] flex items-center justify-between text-xs font-semibold">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 hover:underline"
                  style={{ color: "var(--tx)" }}
                >
                  <span>Administrative Profile</span>
                  <ArrowRight size={12} weight="bold" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

