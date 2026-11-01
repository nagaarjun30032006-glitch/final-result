"use client";

import * as React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkle,
  FilePdf,
  CheckCircle,
  ArrowRight,
  X,
} from "@phosphor-icons/react";

type AdmissionsTab = "ug" | "pg" | "phd" | "fees";

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = React.useState<AdmissionsTab>("ug");
  const [showApplyModal, setShowApplyModal] = React.useState(false);
  const [appliedSuccess, setAppliedSuccess] = React.useState(false);
  const [appId, setAppId] = React.useState("");

  // Form state
  const [formData, setFormData] = React.useState({
    candidateName: "",
    email: "",
    mobile: "",
    selectedProgramme: "B.Sc. Computer Science & Data Science",
    qualifyingExam: "HSC (+2 Academic)",
    percentage: "",
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.candidateName || !formData.mobile) return;
    const generatedId = `JJC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setAppId(generatedId);
    setAppliedSuccess(true);
  };

  const UG_PROGRAMMES = [
    { name: "B.Sc. Computer Science & Data Science", duration: "3 Years", eligibility: "+2 with Mathematics / Computer Science", intake: 120 },
    { name: "B.C.A. (Computer Applications)", duration: "3 Years", eligibility: "+2 with Mathematics / Computer Science / Commerce", intake: 120 },
    { name: "B.Sc. Information Technology", duration: "3 Years", eligibility: "+2 with Mathematics / Computer Science", intake: 60 },
    { name: "B.Sc. Biotechnology", duration: "3 Years", eligibility: "+2 with Biology / Botany / Zoology / Chemistry", intake: 60 },
    { name: "B.Sc. Microbiology", duration: "3 Years", eligibility: "+2 with Biology / Botany / Zoology", intake: 60 },
    { name: "B.Sc. Biochemistry", duration: "3 Years", eligibility: "+2 with Chemistry / Biology / Physics", intake: 50 },
    { name: "B.Sc. Physics", duration: "3 Years", eligibility: "+2 with Physics and Mathematics", intake: 50 },
    { name: "B.Sc. Chemistry", duration: "3 Years", eligibility: "+2 with Chemistry and Mathematics / Biology", intake: 50 },
    { name: "B.Sc. Mathematics", duration: "3 Years", eligibility: "+2 with Mathematics", intake: 60 },
    { name: "B.Com. (General)", duration: "3 Years", eligibility: "+2 with Commerce and Accountancy", intake: 120 },
    { name: "B.Com. (Computer Applications)", duration: "3 Years", eligibility: "+2 with Commerce / Computer Science", intake: 120 },
    { name: "B.B.A. (Business Administration)", duration: "3 Years", eligibility: "+2 Any Stream (Merit Based)", intake: 60 },
    { name: "B.Sc. Visual Communication", duration: "3 Years", eligibility: "+2 Any Stream with Creative Aptitude", intake: 50 },
    { name: "B.Sc. Hotel Management & Catering", duration: "3 Years", eligibility: "+2 Any Stream", intake: 50 },
    { name: "B.A. English Literature", duration: "3 Years", eligibility: "+2 with English Proficiency", intake: 60 },
    { name: "B.A. Tamil Literature", duration: "3 Years", eligibility: "+2 with Tamil Language", intake: 60 },
    { name: "B.P.Ed. (Physical Education)", duration: "3 Years", eligibility: "+2 Any Stream with Sports Fitness", intake: 50 },
  ];

  const PG_PROGRAMMES = [
    { name: "M.Sc. Computer Science", duration: "2 Years", eligibility: "B.Sc. CS / IT / BCA / B.Sc. Maths with CS", intake: 40 },
    { name: "M.Sc. Information Technology", duration: "2 Years", eligibility: "B.Sc. IT / CS / BCA / Equivalent Degree", intake: 30 },
    { name: "M.Sc. Biotechnology", duration: "2 Years", eligibility: "B.Sc. Biotech / Micro / Biochem / Life Sciences", intake: 30 },
    { name: "M.Sc. Microbiology", duration: "2 Years", eligibility: "B.Sc. Micro / Biotech / Botany / Zoology", intake: 30 },
    { name: "M.Sc. Biochemistry", duration: "2 Years", eligibility: "B.Sc. Biochem / Chemistry / Life Sciences", intake: 30 },
    { name: "M.Sc. Physics", duration: "2 Years", eligibility: "B.Sc. Physics with Mathematics Allied", intake: 30 },
    { name: "M.Sc. Chemistry", duration: "2 Years", eligibility: "B.Sc. Chemistry with Mathematics / Physics Allied", intake: 30 },
    { name: "M.Sc. Mathematics", duration: "2 Years", eligibility: "B.Sc. Mathematics Major", intake: 40 },
    { name: "M.Com. (General)", duration: "2 Years", eligibility: "B.Com / B.Com CA / B.B.A. / Corporate Sec.", intake: 60 },
    { name: "M.A. English", duration: "2 Years", eligibility: "B.A. English or Any UG Degree with Part-II English", intake: 40 },
    { name: "M.A. Tamil", duration: "2 Years", eligibility: "B.A. Tamil or Any UG Degree with Part-I Tamil", intake: 40 },
  ];

  const FEE_STRUCTURE = [
    { programme: "B.Sc. Computer Science / BCA / IT", tuitionPerSem: "₹ 16,500", labPerSem: "₹ 3,500", specialFee: "₹ 1,500", totalPerSem: "₹ 21,500" },
    { programme: "B.Sc. Biotechnology / Microbiology", tuitionPerSem: "₹ 15,000", labPerSem: "₹ 4,000", specialFee: "₹ 1,500", totalPerSem: "₹ 20,500" },
    { programme: "B.Sc. Physics / Chemistry / Maths", tuitionPerSem: "₹ 12,500", labPerSem: "₹ 2,500", specialFee: "₹ 1,000", totalPerSem: "₹ 16,000" },
    { programme: "B.Com / B.Com CA / BBA", tuitionPerSem: "₹ 14,000", labPerSem: "₹ 1,500", specialFee: "₹ 1,500", totalPerSem: "₹ 17,000" },
    { programme: "B.A. English / B.A. Tamil", tuitionPerSem: "₹ 9,000", labPerSem: "—", specialFee: "₹ 1,000", totalPerSem: "₹ 10,000" },
    { programme: "M.Sc. Life Sciences (Biotech/Micro)", tuitionPerSem: "₹ 18,500", labPerSem: "₹ 4,500", specialFee: "₹ 2,000", totalPerSem: "₹ 25,000" },
    { programme: "M.Sc. Computer Science / IT", tuitionPerSem: "₹ 19,000", labPerSem: "₹ 3,500", specialFee: "₹ 2,000", totalPerSem: "₹ 24,500" },
    { programme: "M.Com / M.A. Programmes", tuitionPerSem: "₹ 11,000", labPerSem: "—", specialFee: "₹ 1,500", totalPerSem: "₹ 12,500" },
  ];

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>Admissions 2026–2027</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
                style={{
                  backgroundColor: "var(--ac2)",
                  color: "var(--ac)",
                }}
              >
                <Sparkle size={14} weight="bold" />
                <span>Admissions 2026–2027 Open</span>
              </div>
              <h1
                className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
                style={{ color: "var(--tx)" }}
              >
                Admission & Programmes Offered
              </h1>
              <p className="text-base sm:text-lg max-w-2xl leading-relaxed" style={{ color: "var(--mu)" }}>
                Begin your academic journey at J.J. College of Arts and Science. Explore comprehensive undergraduate, postgraduate, and doctoral options.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setShowApplyModal(true);
                  setAppliedSuccess(false);
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-md hover:scale-[1.02] transition-transform cursor-pointer text-sm sm:text-base"
                style={{ backgroundColor: "var(--ac)" }}
              >
                <GraduationCap size={20} weight="bold" />
                <span>Apply Online Now</span>
              </button>

              <a
                href="https://jjcoll.in/downloads/Prospectus%202019-2020.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium border text-sm sm:text-base transition-colors hover:border-[var(--ac)]"
                style={{
                  backgroundColor: "var(--sf)",
                  borderColor: "var(--ln)",
                  color: "var(--tx)",
                }}
              >
                <FilePdf size={18} />
                <span>Download Prospectus</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--ln)] pb-4 mb-8">
          {[
            { id: "ug", label: `Undergraduate (${UG_PROGRAMMES.length})` },
            { id: "pg", label: `Postgraduate (${PG_PROGRAMMES.length})` },
            { id: "phd", label: "Ph.D. Research Centers (14)" },
            { id: "fees", label: "Fees Structure 2026–27" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdmissionsTab)}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isActive ? "var(--ac)" : "var(--sf)",
                  color: isActive ? "#ffffff" : "var(--tx)",
                  border: `1px solid ${isActive ? "var(--ac)" : "var(--ln)"}`,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab: UG Programmes */}
        {activeTab === "ug" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="overflow-x-auto rounded-2xl border border-[var(--ln)]">
              <table className="w-full text-left text-xs sm:text-sm border-collapse" style={{ backgroundColor: "var(--sf)" }}>
                <thead>
                  <tr className="border-b border-[var(--ln)]" style={{ backgroundColor: "var(--pp)" }}>
                    <th className="py-3.5 px-4 font-semibold" style={{ color: "var(--tx)" }}>Programme Name</th>
                    <th className="py-3.5 px-4 font-semibold" style={{ color: "var(--tx)" }}>Duration</th>
                    <th className="py-3.5 px-4 font-semibold" style={{ color: "var(--tx)" }}>Eligibility Criteria</th>
                    <th className="py-3.5 px-4 font-semibold text-center" style={{ color: "var(--tx)" }}>Sanctioned Intake</th>
                    <th className="py-3.5 px-4 font-semibold text-right" style={{ color: "var(--tx)" }}>Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--ln)]">
                  {UG_PROGRAMMES.map((prog) => (
                    <tr key={prog.name} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-bold" style={{ color: "var(--tx)" }}>{prog.name}</td>
                      <td className="py-3.5 px-4 font-medium" style={{ color: "var(--mu)" }}>{prog.duration}</td>
                      <td className="py-3.5 px-4" style={{ color: "var(--mu)" }}>{prog.eligibility}</td>
                      <td className="py-3.5 px-4 text-center font-semibold" style={{ color: "var(--tx)" }}>{prog.intake} seats</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, selectedProgramme: prog.name }));
                            setShowApplyModal(true);
                            setAppliedSuccess(false);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: "var(--ac)" }}
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: PG Programmes */}
        {activeTab === "pg" && (
          <div className="space-y-4 animate-in fade-in">
            <div className="overflow-x-auto rounded-2xl border border-[var(--ln)]">
              <table className="w-full text-left text-xs sm:text-sm border-collapse" style={{ backgroundColor: "var(--sf)" }}>
                <thead>
                  <tr className="border-b border-[var(--ln)]" style={{ backgroundColor: "var(--pp)" }}>
                    <th className="py-3.5 px-4 font-semibold" style={{ color: "var(--tx)" }}>Programme Name</th>
                    <th className="py-3.5 px-4 font-semibold" style={{ color: "var(--tx)" }}>Duration</th>
                    <th className="py-3.5 px-4 font-semibold" style={{ color: "var(--tx)" }}>Eligibility Criteria</th>
                    <th className="py-3.5 px-4 font-semibold text-center" style={{ color: "var(--tx)" }}>Sanctioned Intake</th>
                    <th className="py-3.5 px-4 font-semibold text-right" style={{ color: "var(--tx)" }}>Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--ln)]">
                  {PG_PROGRAMMES.map((prog) => (
                    <tr key={prog.name} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-bold" style={{ color: "var(--tx)" }}>{prog.name}</td>
                      <td className="py-3.5 px-4 font-medium" style={{ color: "var(--mu)" }}>{prog.duration}</td>
                      <td className="py-3.5 px-4" style={{ color: "var(--mu)" }}>{prog.eligibility}</td>
                      <td className="py-3.5 px-4 text-center font-semibold" style={{ color: "var(--tx)" }}>{prog.intake} seats</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, selectedProgramme: prog.name }));
                            setShowApplyModal(true);
                            setAppliedSuccess(false);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: "var(--ac)" }}
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Ph.D. Research */}
        {activeTab === "phd" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="college-card p-6 sm:p-8">
              <h2 className="font-serif-heading text-2xl font-bold mb-3" style={{ color: "var(--tx)" }}>
                Doctor of Philosophy (Ph.D.) Research Centers
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--mu)" }}>
                J.J. College of Arts and Science is approved by Bharathidasan University to offer full-time and
                part-time Ph.D. research programmes under recognized doctoral supervisors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Ph.D. in Biotechnology",
                  "Ph.D. in Microbiology",
                  "Ph.D. in Biochemistry",
                  "Ph.D. in Computer Science",
                  "Ph.D. in Commerce",
                  "Ph.D. in Chemistry",
                  "Ph.D. in Physics",
                  "Ph.D. in Mathematics",
                  "Ph.D. in Management",
                  "Ph.D. in English",
                  "Ph.D. in Tamil",
                  "Ph.D. in Botany",
                  "Ph.D. in Physical Education",
                  "Ph.D. in Library & Info Science",
                ].map((phd) => (
                  <div
                    key={phd}
                    className="p-4 rounded-xl border flex items-center gap-3"
                    style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}
                  >
                    <CheckCircle size={20} weight="fill" style={{ color: "var(--ac)" }} />
                    <span className="font-semibold text-xs sm:text-sm" style={{ color: "var(--tx)" }}>
                      {phd}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Fees Structure */}
        {activeTab === "fees" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="overflow-x-auto rounded-2xl border border-[var(--ln)]">
              <table className="w-full text-left text-xs sm:text-sm border-collapse" style={{ backgroundColor: "var(--sf)" }}>
                <thead>
                  <tr className="border-b border-[var(--ln)]" style={{ backgroundColor: "var(--pp)" }}>
                    <th className="py-3.5 px-4 font-semibold" style={{ color: "var(--tx)" }}>Programme Group</th>
                    <th className="py-3.5 px-4 font-semibold" style={{ color: "var(--tx)" }}>Tuition Fee / Sem</th>
                    <th className="py-3.5 px-4 font-semibold" style={{ color: "var(--tx)" }}>Laboratory Fee</th>
                    <th className="py-3.5 px-4 font-semibold" style={{ color: "var(--tx)" }}>Special & Library Fee</th>
                    <th className="py-3.5 px-4 font-semibold text-right" style={{ color: "var(--tx)" }}>Total Fee / Sem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--ln)]">
                  {FEE_STRUCTURE.map((fee) => (
                    <tr key={fee.programme} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-bold" style={{ color: "var(--tx)" }}>{fee.programme}</td>
                      <td className="py-3.5 px-4" style={{ color: "var(--mu)" }}>{fee.tuitionPerSem}</td>
                      <td className="py-3.5 px-4" style={{ color: "var(--mu)" }}>{fee.labPerSem}</td>
                      <td className="py-3.5 px-4" style={{ color: "var(--mu)" }}>{fee.specialFee}</td>
                      <td className="py-3.5 px-4 text-right font-bold" style={{ color: "var(--ac)" }}>
                        {fee.totalPerSem}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl border flex items-center justify-between gap-4" style={{ backgroundColor: "var(--ac2)", borderColor: "var(--ln)" }}>
              <div className="text-xs" style={{ color: "var(--tx)" }}>
                * Concessions and merit scholarships available for state-level sports achievers, SC/ST students, and first-generation graduates.
              </div>
              <a
                href="https://jjcoll.in/downloads/Fees%20structure%20UG%20&%20PG.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline shrink-0"
                style={{ color: "var(--ac)" }}
              >
                <span>Download Official Fee Notice</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}

      </div>

      {/* Online Application Modal Form */}
      {showApplyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setShowApplyModal(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl p-6 sm:p-8 shadow-2xl border"
            style={{
              backgroundColor: "var(--sf)",
              borderColor: "var(--ln)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <GraduationCap size={22} weight="fill" style={{ color: "var(--ac)" }} />
                <h3 className="font-serif-heading text-xl font-bold" style={{ color: "var(--tx)" }}>
                  Online Admission Application 2026
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="p-1 rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {!appliedSuccess ? (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                    Candidate Full Name (as in marksheet) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    placeholder="e.g. S. Karthikeyan"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                    style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="karthik@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                      style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                      style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                    Select Desired Programme *
                  </label>
                  <select
                    value={formData.selectedProgramme}
                    onChange={(e) => setFormData({ ...formData, selectedProgramme: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                    style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                  >
                    {UG_PROGRAMMES.map((p) => (
                      <option key={p.name} value={p.name}>{p.name} (UG)</option>
                    ))}
                    {PG_PROGRAMMES.map((p) => (
                      <option key={p.name} value={p.name}>{p.name} (PG)</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                      Qualifying Examination
                    </label>
                    <select
                      value={formData.qualifyingExam}
                      onChange={(e) => setFormData({ ...formData, qualifyingExam: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                      style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                    >
                      <option value="HSC (+2 Academic)">HSC (+2 Academic)</option>
                      <option value="CBSE / ICSE Senior Secondary">CBSE / ICSE Senior Secondary</option>
                      <option value="Undergraduate Degree (for PG)">Undergraduate Degree (for PG)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                      Aggregate Percentage (%) *
                    </label>
                    <input
                      type="number"
                      min="35"
                      max="100"
                      required
                      value={formData.percentage}
                      onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                      placeholder="e.g. 88"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                      style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium border"
                    style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xs cursor-pointer"
                    style={{ backgroundColor: "var(--ac)" }}
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                  style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
                >
                  <CheckCircle size={36} weight="fill" />
                </div>
                <h4 className="font-serif-heading text-2xl font-bold" style={{ color: "var(--tx)" }}>
                  Application Submitted!
                </h4>
                <p className="text-sm max-w-sm mx-auto" style={{ color: "var(--mu)" }}>
                  Thank you, <strong>{formData.candidateName}</strong>. Your provisional admission application has been registered successfully.
                </p>
                <div className="p-4 rounded-xl border max-w-xs mx-auto" style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}>
                  <div className="text-xs uppercase font-bold text-gray-500">Application Number</div>
                  <div className="font-serif-heading text-xl font-bold mt-1" style={{ color: "var(--ac)" }}>
                    {appId}
                  </div>
                  <div className="text-[11px] mt-1" style={{ color: "var(--mu)" }}>
                    {formData.selectedProgramme}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white mt-2 cursor-pointer"
                  style={{ backgroundColor: "var(--ac)" }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

