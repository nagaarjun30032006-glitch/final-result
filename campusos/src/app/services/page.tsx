"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  Sparkle,
  ShieldWarning,
  Heartbeat,
  Trophy,
  UsersThree,
  FilePdf,
} from "@phosphor-icons/react";

export default function ServicesPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>Student Support & Services</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <Sparkle size={14} weight="bold" />
            <span>Holistic Campus Ecosystem</span>
          </div>

          <h1
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--tx)" }}
          >
            Campus Services & Student Welfare
          </h1>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: "var(--mu)" }}>
            Nurturing athletic, entrepreneurial, humanitarian, and career competencies through vibrant
            student support cells and modern campus facilities.
          </p>
        </div>

        {/* 6 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Training & Placement */}
          <div className="college-card p-6 flex flex-col justify-between">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
              >
                <Briefcase size={24} weight="bold" />
              </div>
              <h3 className="font-serif-heading text-xl font-bold mb-2" style={{ color: "var(--tx)" }}>
                Training & Placement Cell
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
                Organizes aptitude training, mock HR interviews, soft skill bootcamps, and on-campus recruitment
                drives with top IT, banking, healthcare, and biotech corporations.
              </p>
              <div className="text-xs font-semibold mb-2" style={{ color: "var(--ac)" }}>
                92% Average Placement Record
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--ln)]">
              <a
                href="https://jjcoll.in/documents/Training%20&%20Placement%20Cell%20-%20Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                style={{ color: "var(--tx)" }}
              >
                <FilePdf size={16} />
                <span>Placement Profile (PDF)</span>
              </a>
            </div>
          </div>

          {/* Anti-Ragging Cell */}
          <div className="college-card p-6 flex flex-col justify-between">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
              >
                <ShieldWarning size={24} weight="bold" />
              </div>
              <h3 className="font-serif-heading text-xl font-bold mb-2" style={{ color: "var(--tx)" }}>
                Anti-Ragging Committee
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
                Zero tolerance towards ragging on campus or hostels. High-level monitoring squad, CCTV coverage,
                and national 24x7 anti-ragging helpline integration ensure a safe, welcoming student environment.
              </p>
              <div className="text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
                100% Ragging-Free Campus
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--ln)]">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                style={{ color: "var(--tx)" }}
              >
                <span>Report Grievance / Emergency</span>
              </Link>
            </div>
          </div>

          {/* Extension Wings: NSS & YRC */}
          <div className="college-card p-6 flex flex-col justify-between">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
              >
                <UsersThree size={24} weight="bold" />
              </div>
              <h3 className="font-serif-heading text-xl font-bold mb-2" style={{ color: "var(--tx)" }}>
                Extension Wings (NSS & YRC)
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
                National Service Scheme (NSS), Youth Red Cross (YRC), Red Ribbon Club (RRC), and Women Empowerment
                Wing (WEW) lead village adoption, tree planting, and blood donation drives.
              </p>
              <div className="text-xs font-semibold mb-2" style={{ color: "var(--ac)" }}>
                5 Active NSS Units (500 Volunteers)
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--ln)]">
              <a
                href="https://jjcoll.in/yrc.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                style={{ color: "var(--tx)" }}
              >
                <span>YRC Activity Reports</span>
              </a>
            </div>
          </div>

          {/* Physical Education & Sports */}
          <div className="college-card p-6 flex flex-col justify-between">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
              >
                <Trophy size={24} weight="bold" />
              </div>
              <h3 className="font-serif-heading text-xl font-bold mb-2" style={{ color: "var(--tx)" }}>
                Sports & Athletic Stadium
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
                Features a 400m international standard track, modern indoor gymnasium, basketball, volleyball,
                and kabaddi stadiums with dedicated coaching producing university and national champions.
              </p>
              <div className="text-xs font-semibold mb-2" style={{ color: "var(--ac)" }}>
                BDU Inter-Collegiate Champions
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--ln)]">
              <a
                href="https://jjcoll.in/downloads/physical_education.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                style={{ color: "var(--tx)" }}
              >
                <FilePdf size={16} />
                <span>Sports Complex Profile (PDF)</span>
              </a>
            </div>
          </div>

          {/* Entrepreneurship E-Cell */}
          <div className="college-card p-6 flex flex-col justify-between">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
              >
                <Heartbeat size={24} weight="bold" />
              </div>
              <h3 className="font-serif-heading text-xl font-bold mb-2" style={{ color: "var(--tx)" }}>
                EDC (Entrepreneurship Development Cell)
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
                Incubates student startup ventures, provides mentorship from successful alumni founders, and organizes
                ideation hackathons, seed capital pitching, and patent awareness workshops.
              </p>
              <div className="text-xs font-semibold mb-2" style={{ color: "var(--ac)" }}>
                EDII-TN Supported Incubator
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--ln)]">
              <a
                href="https://jjcoll.in/downloads/E-Cell%20profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                style={{ color: "var(--tx)" }}
              >
                <FilePdf size={16} />
                <span>E-Cell Profile (PDF)</span>
              </a>
            </div>
          </div>

          {/* Women Empowerment Wing */}
          <div className="college-card p-6 flex flex-col justify-between">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
              >
                <UsersThree size={24} weight="bold" />
              </div>
              <h3 className="font-serif-heading text-xl font-bold mb-2" style={{ color: "var(--tx)" }}>
                Women Empowerment Wing (WEW)
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
                Dedicated to the safety, self-defence, health awareness, and leadership capabilities of female students
                and staff members through counseling sessions and legal awareness workshops.
              </p>
              <div className="text-xs font-semibold mb-2" style={{ color: "var(--ac)" }}>
                Empowering Rural Female Leaders
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--ln)]">
              <a
                href="https://jjcoll.in/WEW.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                style={{ color: "var(--tx)" }}
              >
                <span>WEW Cell Activities</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

