"use client";

import * as React from "react";
import Link from "next/link";
import { COLLEGE_DATA } from "@/lib/college-data";
import {
  Sparkle,
  FilePdf,
  ShieldCheck,
  CheckCircle,
  ArrowSquareOut,
} from "@phosphor-icons/react";

export default function ResearchPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>Research & Innovation</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <Sparkle size={14} weight="bold" />
            <span>Discover · Innovate · Publish</span>
          </div>

          <h1
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--tx)" }}
          >
            Research Facilities & Innovation Centers
          </h1>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: "var(--mu)" }}>
            Promoting high-impact scientific investigations, applied bio-agricultural farming technologies,
            interdisciplinary doctoral research, and community-centric innovations in Pudukkottai.
          </p>
        </div>

        {/* 4 Flagship Research Centers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {COLLEGE_DATA.researchCenters.map((rc, idx) => (
            <div key={rc.title} className="college-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-serif-heading text-xl font-bold"
                    style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
                  >
                    0{idx + 1}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                        style={{ backgroundColor: "var(--pp)", color: "var(--ac)", border: "1px solid var(--ln)" }}>
                    Approved Facility
                  </span>
                </div>

                <h3 className="font-serif-heading text-xl font-bold mb-3" style={{ color: "var(--tx)" }}>
                  {rc.title}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
                  {rc.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--ln)] flex items-center justify-between text-xs">
                <span style={{ color: "var(--mu)" }}>Instrumentation & Protocol</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle size={14} weight="fill" />
                  <span>Active Research Unit</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Research Guides & Publications Policy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="college-card p-6 lg:col-span-2">
            <h3 className="font-serif-heading text-xl font-bold mb-3" style={{ color: "var(--tx)" }}>
              Doctoral Supervisors & Research Guides
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: "var(--mu)" }}>
              More than 45 recognized research supervisors guide M.Phil. and Ph.D. scholars across 14 research departments.
              Our faculty members publish regularly in high-impact Web of Science, Scopus, and UGC-CARE listed journals.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}>
                <div className="font-serif-heading text-3xl font-bold" style={{ color: "var(--ac)" }}>45+</div>
                <div className="text-xs mt-1" style={{ color: "var(--mu)" }}>Recognized Guides</div>
              </div>
              <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}>
                <div className="font-serif-heading text-3xl font-bold" style={{ color: "var(--ac)" }}>120+</div>
                <div className="text-xs mt-1" style={{ color: "var(--mu)" }}>Active Scholars</div>
              </div>
              <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}>
                <div className="font-serif-heading text-3xl font-bold" style={{ color: "var(--ac)" }}>650+</div>
                <div className="text-xs mt-1" style={{ color: "var(--mu)" }}>Papers Published</div>
              </div>
              <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}>
                <div className="font-serif-heading text-3xl font-bold" style={{ color: "var(--ac)" }}>14</div>
                <div className="text-xs mt-1" style={{ color: "var(--mu)" }}>Research Labs</div>
              </div>
            </div>
          </div>

          <div className="college-card p-6 space-y-4">
            <h3 className="font-serif-heading text-lg font-bold" style={{ color: "var(--tx)" }}>
              Ethics & Research Links
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href="https://jjcoll.irins.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border hover:border-[var(--ac)] transition-colors"
                  style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                >
                  <span className="font-semibold">IRINS Research Portal</span>
                  <ArrowSquareOut size={14} />
                </a>
              </li>
              <li>
                <a
                  href="http://journal.kvet.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border hover:border-[var(--ac)] transition-colors"
                  style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                >
                  <span className="font-semibold">KVET Peer-Reviewed Journals</span>
                  <ArrowSquareOut size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://jjcoll.in/downloads/Instrumentation%20facility.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border hover:border-[var(--ac)] transition-colors"
                  style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                >
                  <span className="font-semibold">CIF Equipment Catalogue (PDF)</span>
                  <FilePdf size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://jjcoll.in/CCE.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border hover:border-[var(--ac)] transition-colors"
                  style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                >
                  <span className="font-semibold">Code of Conduct & Ethics (CCE)</span>
                  <ShieldCheck size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

