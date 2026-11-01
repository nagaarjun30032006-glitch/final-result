"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkle,
  CheckCircle,
  FilePdf,
} from "@phosphor-icons/react";

export default function AlumniPage() {
  const [registered, setRegistered] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    batch: "2020–2023",
    degree: "B.Sc. Computer Science",
    currentDesignation: "",
    company: "",
    email: "",
    phone: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setRegistered(true);
  };

  const ILLUSTRIOUS_ALUMNI = [
    { name: "Dr. R. Vignesh Kumar Ph.D.", batch: "2004–2007 (B.Sc. Biotech)", role: "Senior Scientist", company: "AstraZeneca Biologics, UK", avatar: "VK" },
    { name: "Mrs. Meenakshi Sundaram", batch: "2008–2011 (B.Com CA)", role: "Vice President - FinTech", company: "Standard Chartered Bank, Singapore", avatar: "MS" },
    { name: "Mr. S. Karthik Raja", batch: "2012–2015 (B.Sc. CS)", role: "Principal Cloud Architect", company: "Amazon Web Services (AWS)", avatar: "KR" },
    { name: "Dr. P. Sharmila Ph.D.", batch: "2010–2013 (B.Sc. Microbiology)", role: "Assistant Professor", company: "Central University of Tamil Nadu", avatar: "PS" },
  ];

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>Alumni Association</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <Sparkle size={14} weight="bold" />
            <span>Lifetime Institutional Bond</span>
          </div>

          <h1
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--tx)" }}
          >
            J.J. College Alumni Association
          </h1>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: "var(--mu)" }}>
            A global fraternity of over 30,000 graduates across academia, industry, public administration,
            and entrepreneurship mentoring the next generation of scholars.
          </p>
        </div>

        {/* Illustrious Alumni Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif-heading text-2xl font-bold" style={{ color: "var(--tx)" }}>
              Illustrious Alumni Achievers
            </h2>
            <a
              href="https://jjcoll.in/alumni_illustrious.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold hover:underline"
              style={{ color: "var(--ac)" }}
            >
              View More Achievers
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ILLUSTRIOUS_ALUMNI.map((alumnus) => (
              <div key={alumnus.name} className="college-card p-6 flex flex-col justify-between">
                <div>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-serif-heading text-xl font-bold mb-4 shadow-xs"
                    style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
                  >
                    {alumnus.avatar}
                  </div>
                  <h3 className="font-serif-heading text-lg font-bold leading-tight mb-1" style={{ color: "var(--tx)" }}>
                    {alumnus.name}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--ac)" }}>
                    {alumnus.role}
                  </div>
                  <p className="text-xs font-medium" style={{ color: "var(--tx)" }}>
                    {alumnus.company}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[var(--ln)] text-[11px]" style={{ color: "var(--mu)" }}>
                  {alumnus.batch}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Registration Form & Office Bearers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Alumni Registration Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="college-card p-6 sm:p-8">
              <h3 className="font-serif-heading text-2xl font-bold mb-2" style={{ color: "var(--tx)" }}>
                Alumni Registration & Network Enrollment
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: "var(--mu)" }}>
                Keep your Alma Mater updated with your latest professional milestones and join our global mentoring roster.
              </p>

              {!registered ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. S. Vignesh"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                      style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                        Batch / Graduation Year
                      </label>
                      <input
                        type="text"
                        value={formData.batch}
                        onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                        placeholder="e.g. 2018–2021"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                        style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                        Degree Studied
                      </label>
                      <input
                        type="text"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        placeholder="e.g. B.Sc. Computer Science"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                        style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                        Current Designation
                      </label>
                      <input
                        type="text"
                        value={formData.currentDesignation}
                        onChange={(e) => setFormData({ ...formData, currentDesignation: e.target.value })}
                        placeholder="e.g. Software Engineer"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                        style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Cognizant / TCS"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                        style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                      />
                    </div>
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
                        placeholder="vignesh@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                        style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                        style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xs cursor-pointer"
                      style={{ backgroundColor: "var(--ac)" }}
                    >
                      Register with Alumni Association
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle size={40} weight="fill" className="mx-auto text-emerald-500" />
                  <h4 className="font-serif-heading text-xl font-bold" style={{ color: "var(--tx)" }}>
                    Registration Successful!
                  </h4>
                  <p className="text-xs sm:text-sm max-w-sm mx-auto" style={{ color: "var(--mu)" }}>
                    Thank you, <strong>{formData.name}</strong>. Your profile has been added to the J.J. College Alumni Network directory.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Association Details & Photos (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="college-card p-6 space-y-4">
              <h3 className="font-serif-heading text-lg font-bold" style={{ color: "var(--tx)" }}>
                Alumni Association Office
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
                Registered under the Tamil Nadu Societies Registration Act. Operates active chapters in Pudukkottai,
                Chennai, Bengaluru, and Singapore.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[var(--ln)]">
                  <span style={{ color: "var(--mu)" }}>President:</span>
                  <strong style={{ color: "var(--tx)" }}>Dr. J. Parasuraman (Ex-Officio)</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--ln)]">
                  <span style={{ color: "var(--mu)" }}>General Secretary:</span>
                  <strong style={{ color: "var(--tx)" }}>Dr. P. Murugan</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--ln)]">
                  <span style={{ color: "var(--mu)" }}>Treasurer:</span>
                  <strong style={{ color: "var(--tx)" }}>Prof. K. Sundararajan</strong>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://jjcoll.in/documents/Alumni%20events%20photos.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border hover:border-[var(--ac)] transition-colors text-xs"
                  style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                >
                  <span className="font-semibold">Annual Alumni Meet Photos (PDF)</span>
                  <FilePdf size={16} />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

