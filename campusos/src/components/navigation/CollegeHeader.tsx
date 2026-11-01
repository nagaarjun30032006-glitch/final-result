"use client";

import * as React from "react";
import Link from "next/link";
import { PhoneCall, Sparkle } from "@phosphor-icons/react";
import { COLLEGE_INFO } from "@/lib/college-data";

export function CollegeHeader() {
  return (
    <div className="w-full bg-[var(--pp)] border-b border-[var(--ln)] py-4 md:py-5 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* College Crest & Title */}
        <Link href="/" className="flex items-center gap-4 group text-left min-w-0">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[var(--ac)] text-white flex items-center justify-center font-serif-heading text-2xl md:text-3xl shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
            {COLLEGE_INFO.acronym.slice(0, 2)}
          </div>

          <div className="min-w-0">
            <div className="font-serif-heading text-xl sm:text-2xl md:text-3xl text-[var(--ink)] leading-tight tracking-tight">
              J.J. College of Arts and Science{" "}
              <span className="text-[var(--ac)] text-lg sm:text-xl md:text-2xl font-serif-heading font-normal">
                (Autonomous)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mu)] mt-0.5 leading-snug line-clamp-2 md:line-clamp-none">
              Affiliated to Bharathidasan University, Tiruchirappalli · NAAC Re-Accredited B++ (4th Cycle) · Est. 1994
            </p>
          </div>
        </Link>

        {/* Right Action Group */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <a
            href="tel:+917904151908"
            className="inline-flex items-center gap-2 h-11 px-4 sm:px-5 rounded-full border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-all text-xs sm:text-sm font-semibold shadow-2xs hover:-translate-y-0.5 duration-150"
          >
            <PhoneCall className="w-4 h-4 text-[var(--ac)]" />
            <span>Call 79041 51908</span>
          </a>

          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 h-11 px-5 sm:px-6 rounded-full bg-[var(--ac)] text-white hover:brightness-110 transition-all text-xs sm:text-sm font-semibold shadow-md hover:-translate-y-0.5 duration-150"
          >
            <Sparkle className="w-4 h-4" />
            <span>Apply Online</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

