"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap, Sparkle, SealCheck } from "@phosphor-icons/react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-20 border-b border-[var(--ln)]">
      {/* Subtle background glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: "var(--ac)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="flex-1 max-w-2xl text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-5 border shadow-xs"
              style={{
                backgroundColor: "var(--ac2)",
                color: "var(--ac)",
                borderColor: "var(--ln)",
              }}
            >
              <Sparkle size={14} weight="fill" />
              <span>Pudukkottai · Est. 1994</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--ac)" }} />
              <span>Autonomous</span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6"
              style={{ color: "var(--tx)" }}
            >
              Welcome to <br className="hidden sm:inline" />
              <span className="relative">
                <span className="relative z-10">J.J. College</span>
                <span
                  className="absolute bottom-1 left-0 w-full h-3 -z-0 opacity-25 rounded"
                  style={{ backgroundColor: "var(--ac)" }}
                  aria-hidden="true"
                />
              </span>{" "}
              of Arts and Science
            </h1>

            {/* Subtitle / Value Proposition */}
            <p
              className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl"
              style={{ color: "var(--mu)" }}
            >
              A premier autonomous institution empowering youth through holistic,
              value-based education with undergraduate, postgraduate, and research
              programmes across sciences, arts, IT, commerce, and management.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: "var(--ac)" }}
              >
                <GraduationCap size={20} weight="bold" />
                <span>Online Application</span>
                <ArrowRight size={16} weight="bold" />
              </Link>

              <Link
                href="/academic"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl font-medium border text-sm sm:text-base transition-all duration-200 hover:border-[var(--ac)]"
                style={{
                  backgroundColor: "var(--sf)",
                  borderColor: "var(--ln)",
                  color: "var(--tx)",
                }}
              >
                Programmes Offered
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl font-medium border text-sm sm:text-base transition-all duration-200 hover:border-[var(--ac)]"
                style={{
                  backgroundColor: "var(--sf)",
                  borderColor: "var(--ln)",
                  color: "var(--tx)",
                }}
              >
                About JJC
              </Link>
            </div>

            {/* Quick Accreditation trust badge */}
            <div className="mt-8 pt-6 border-t border-[var(--ln)] flex flex-wrap items-center gap-4 text-xs"
                 style={{ color: "var(--mu)" }}>
              <div className="flex items-center gap-1.5">
                <SealCheck size={16} weight="fill" style={{ color: "var(--ac)" }} />
                <span>Affiliated to Bharathidasan University</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <SealCheck size={16} weight="fill" style={{ color: "var(--ac)" }} />
                <span>UGC 2(f) & 12(B) Status</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <SealCheck size={16} weight="fill" style={{ color: "var(--ac)" }} />
                <span>NAAC B++ Grade (4th Cycle)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic Card with Glassmorphism */}
          <div className="w-full lg:w-[460px] xl:w-[500px] shrink-0">
            <div
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between text-white"
              style={{
                background: "linear-gradient(145deg, var(--ink), #1e293b 50%, var(--ac))",
              }}
            >
              {/* Giant watermark year */}
              <div
                className="absolute top-4 right-6 font-serif-heading text-8xl sm:text-9xl select-none pointer-events-none opacity-20 font-bold leading-none tracking-tighter"
                aria-hidden="true"
              >
                1994
              </div>

              {/* Decorative emblem badge at top left */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Admissions Open 2026–27</span>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-widest text-white/60 font-semibold">Autonomous</span>
                </div>
              </div>

              {/* Center graphics / Crest preview */}
              <div className="relative z-10 py-6 my-auto text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 flex items-center justify-center font-serif-heading text-3xl sm:text-4xl font-bold shadow-inner text-white mb-3">
                  JJC
                </div>
                <p className="font-serif-heading text-lg sm:text-xl text-white/95 tracking-wide">
                  Knowledge · Wisdom · Service
                </p>
                <p className="text-xs text-white/70 max-w-xs mx-auto mt-1">
                  Re-accredited at B++ Level by NAAC with 4th Cycle Distinction
                </p>
              </div>

              {/* Bottom Glassmorphic Card */}
              <div className="relative z-10 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-white leading-tight">
                      NAAC Re-Accredited B++
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                      4th Cycle · Autonomous · Silver Jubilee Institution
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <SealCheck size={24} weight="fill" className="text-amber-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

