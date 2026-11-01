"use client";

import * as React from "react";
import Link from "next/link";
import { COLLEGE_DATA } from "@/lib/college-data";
import {
  Sparkle,
  Buildings,
  GraduationCap,
  Medal,
  FilePdf,
  ShieldCheck,
  UserCheck,
  ArrowRight,
} from "@phosphor-icons/react";

type TabId = "history" | "vision" | "administrators" | "autonomy";

export default function AboutPage() {
  const [activeTab, setActiveTab] = React.useState<TabId>("history");

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>About Us</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <Sparkle size={14} weight="bold" />
            <span>Institution Overview</span>
          </div>

          <h1
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--tx)" }}
          >
            About J.J. College of Arts and Science
          </h1>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: "var(--mu)" }}>
            A co-educational autonomous institution fostering intellectual inquiry, holistic personality development,
            and rural empowerment in Pudukkottai, Tamil Nadu since 1994.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--ln)] pb-4 mb-8">
          {[
            { id: "history", label: "History & Genesis", icon: Buildings },
            { id: "vision", label: "Vision & Mission", icon: GraduationCap },
            { id: "administrators", label: "Leadership & Governance", icon: UserCheck },
            { id: "autonomy", label: "Autonomy & Accreditations", icon: Medal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabId)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isActive ? "var(--ac)" : "var(--sf)",
                  color: isActive ? "#ffffff" : "var(--tx)",
                  border: `1px solid ${isActive ? "var(--ac)" : "var(--ln)"}`,
                }}
              >
                <Icon size={16} weight={isActive ? "fill" : "regular"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: History */}
        {activeTab === "history" && (
          <div className="space-y-10 animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-6 text-sm sm:text-base leading-relaxed" style={{ color: "var(--mu)" }}>
                <div className="college-card p-6 sm:p-8">
                  <h2 className="font-serif-heading text-2xl font-bold mb-4" style={{ color: "var(--tx)" }}>
                    Genesis and Founding Vision
                  </h2>
                  <p className="mb-4">
                    J.J. College of Arts and Science was established in the academic year 1994–1995 under the aegis of
                    the <strong>Karpaga Vinayaga Educational Trust (KVET)</strong>. The institution was founded by visionary philanthropist
                    <strong> Thiru. S. Ragupathy B.Sc., B.L.</strong>, with the noble goal of bringing world-class higher education
                    within reach of rural students in the historically rich district of Pudukkottai.
                  </p>
                  <p className="mb-4">
                    The college is situated in an eco-friendly campus spanning over 25 acres at Sivapuram on the
                    Pudukkottai–Tiruchirappalli National Highway. Over three decades, the college has transformed from a
                    modest center with three undergraduate offerings into a multi-faculty autonomous powerhouse with 17 academic
                    departments, 32+ degree programs, and 14 Ph.D. research centers.
                  </p>
                  <p>
                    In 2001, the institution gained recognition under sections <strong>2(f) and 12(B)</strong> of the UGC Act.
                    In 2012, UGC conferred Autonomous Status, which has recently been extended through 2028 based on exemplary
                    academic credentials and student outcomes.
                  </p>
                </div>

                {/* Emblem & Motto */}
                <div className="college-card p-6 sm:p-8">
                  <h3 className="font-serif-heading text-xl font-bold mb-3" style={{ color: "var(--tx)" }}>
                    Emblem and Motto
                  </h3>
                  <p className="mb-4">
                    The college emblem symbolizes the beacon of enlightened knowledge. The open book signifies boundless
                    scholarship; the blazing lamp signifies spiritual illumination and truth; and the surrounding lotus represents
                    untainted purity and moral uprightness in daily conduct.
                  </p>
                  <div
                    className="p-4 rounded-xl border flex items-center gap-4"
                    style={{ backgroundColor: "var(--ac2)", borderColor: "var(--ln)" }}
                  >
                    <div className="font-serif-heading text-2xl font-bold" style={{ color: "var(--ac)" }}>
                      “Wisdom, Truth, and Service”
                    </div>
                    <span className="text-xs font-medium" style={{ color: "var(--tx)" }}>
                      — The institutional guiding motto illuminating all academic and social pursuits at J.J. College.
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar: College Snapshot */}
              <div className="lg:col-span-4 space-y-5">
                <div className="college-card p-6 space-y-4">
                  <h3 className="font-serif-heading text-lg font-bold" style={{ color: "var(--tx)" }}>
                    Institutional Profile
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between py-1.5 border-b border-[var(--ln)]">
                      <span style={{ color: "var(--mu)" }}>Year Established</span>
                      <strong style={{ color: "var(--tx)" }}>1994</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[var(--ln)]">
                      <span style={{ color: "var(--mu)" }}>Status</span>
                      <strong style={{ color: "var(--tx)" }}>Autonomous (since 2012)</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[var(--ln)]">
                      <span style={{ color: "var(--mu)" }}>Affiliating University</span>
                      <strong style={{ color: "var(--tx)" }}>Bharathidasan Univ.</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[var(--ln)]">
                      <span style={{ color: "var(--mu)" }}>NAAC Grade</span>
                      <strong style={{ color: "var(--tx)" }}>B++ (4th Cycle)</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[var(--ln)]">
                      <span style={{ color: "var(--mu)" }}>Campus Area</span>
                      <strong style={{ color: "var(--tx)" }}>25+ Acres</strong>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[var(--ln)]">
                      <span style={{ color: "var(--mu)" }}>Student Population</span>
                      <strong style={{ color: "var(--tx)" }}>4,500+ Co-ed</strong>
                    </div>
                  </div>

                  <a
                    href="https://jjcoll.in/files/organogram.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold border text-center transition-colors hover:border-[var(--ac)]"
                    style={{
                      backgroundColor: "var(--pp)",
                      borderColor: "var(--ln)",
                      color: "var(--tx)",
                    }}
                  >
                    <FilePdf size={16} />
                    <span>Download Organogram (PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vision & Mission */}
        {activeTab === "vision" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            <div className="college-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
                >
                  <Sparkle size={26} weight="duotone" />
                </div>
                <h2 className="font-serif-heading text-2xl font-bold mb-4" style={{ color: "var(--tx)" }}>
                  Institutional Vision
                </h2>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--mu)" }}>
                  To be an internationally recognized center of academic excellence that empowers students—especially
                  those from socially and economically disadvantaged rural backgrounds—with high-quality education,
                  scientific temper, entrepreneurial mindset, and ethical leadership to build an equitable society.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--ln)] text-xs font-semibold" style={{ color: "var(--ac)" }}>
                Core Focus: Rural Empowerment & Scientific Inquiry
              </div>
            </div>

            <div className="college-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
                >
                  <GraduationCap size={26} weight="duotone" />
                </div>
                <h2 className="font-serif-heading text-2xl font-bold mb-4" style={{ color: "var(--tx)" }}>
                  Institutional Mission
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "var(--ac)" }} />
                    <span>Deliver rigorous Outcome-Based Education (OBE) that bridges academia and industrial needs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "var(--ac)" }} />
                    <span>Cultivate a fertile research environment with interdisciplinary inquiry and state-of-the-art laboratory instrumentation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "var(--ac)" }} />
                    <span>Inculcate patriotism, social responsibility, gender equality, and sustainable environmental awareness through NSS, YRC, and WEW.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "var(--ac)" }} />
                    <span>Promote skill enhancement, entrepreneurship, and global employability through continuous industry internships.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--ln)] text-xs font-semibold" style={{ color: "var(--ac)" }}>
                Core Focus: Outcome-Based Education & Social Responsibility
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Administrators */}
        {activeTab === "administrators" && (
          <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COLLEGE_DATA.leadership.map((admin) => (
                <div key={admin.name} className="college-card p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center font-serif-heading text-2xl font-bold shrink-0 shadow-xs"
                        style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
                      >
                        {admin.initials}
                      </div>
                      <div>
                        <h3 className="font-serif-heading text-xl font-bold leading-tight" style={{ color: "var(--tx)" }}>
                          {admin.name}
                        </h3>
                        <div className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: "var(--ac)" }}>
                          {admin.role}
                        </div>
                        <p className="text-xs mt-1" style={{ color: "var(--mu)" }}>
                          {admin.qualifications}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed italic border-l-2 pl-4 py-1" style={{ borderColor: "var(--ac)", color: "var(--tx)" }}>
                      “{admin.message || admin.quote}”
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--ln)] flex items-center justify-between text-xs">
                    <span style={{ color: "var(--mu)" }}>Administrative Council</span>
                    <a
                      href={admin.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline inline-flex items-center gap-1"
                      style={{ color: "var(--ac)" }}
                    >
                      <span>Full Message</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Autonomy & NAAC */}
        {activeTab === "autonomy" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="college-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={28} weight="fill" style={{ color: "var(--ac)" }} />
                <h2 className="font-serif-heading text-2xl font-bold" style={{ color: "var(--tx)" }}>
                  Autonomy Conferred by UGC
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "var(--mu)" }}>
                Conferred autonomous status by the University Grants Commission (UGC) in 2012, J.J. College exercises
                the freedom to design innovative curricula, institute relevant industry electives, formulate modern
                assessment strategies, and declare examination results promptly through its dedicated Controller of Examinations (COE) wing.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--ln)]">
                <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}>
                  <div className="text-xs uppercase font-bold text-gray-500 mb-1">First Conferred</div>
                  <div className="font-serif-heading text-2xl font-bold" style={{ color: "var(--ac)" }}>2012</div>
                  <div className="text-xs mt-1" style={{ color: "var(--mu)" }}>UGC Autonomous Approval</div>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}>
                  <div className="text-xs uppercase font-bold text-gray-500 mb-1">Current Extension</div>
                  <div className="font-serif-heading text-2xl font-bold" style={{ color: "var(--ac)" }}>2023–2028</div>
                  <div className="text-xs mt-1" style={{ color: "var(--mu)" }}>Valid for 5 Years</div>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}>
                  <div className="text-xs uppercase font-bold text-gray-500 mb-1">NAAC Cycle</div>
                  <div className="font-serif-heading text-2xl font-bold" style={{ color: "var(--ac)" }}>4th Cycle</div>
                  <div className="text-xs mt-1" style={{ color: "var(--mu)" }}>B++ Institutional Grade</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

