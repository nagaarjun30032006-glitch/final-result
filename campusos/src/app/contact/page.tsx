"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  Sparkle,
  Clock,
  CheckCircle,
  NavigationArrow,
  ArrowSquareOut,
} from "@phosphor-icons/react";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    department: "General Admissions",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>Contact & Location</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <Sparkle size={14} weight="bold" />
            <span>Campus Visit & Inquiries</span>
          </div>

          <h1
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--tx)" }}
          >
            Contact & Campus Location
          </h1>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: "var(--mu)" }}>
            Connect with our admissions desk, academic departments, or visit our 25-acre green campus in Pudukkottai.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="college-card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
            >
              <MapPin size={22} weight="bold" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold mb-1" style={{ color: "var(--tx)" }}>
              Campus Address
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
              J.J. Nagar, Sivapuram Post, Pudukkottai – 622 422, Tamil Nadu, India.
            </p>
          </div>

          <div className="college-card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
            >
              <Phone size={22} weight="bold" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold mb-1" style={{ color: "var(--tx)" }}>
              Admission Helpline
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
              +91 79041 51908<br />
              +91 4322 260103
            </p>
          </div>

          <div className="college-card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
            >
              <EnvelopeSimple size={22} weight="bold" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold mb-1" style={{ color: "var(--tx)" }}>
              Official Email
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
              jjcollege.pdkt@gmail.com<br />
              principal@jjcoll.in
            </p>
          </div>

          <div className="college-card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
            >
              <Clock size={22} weight="bold" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold mb-1" style={{ color: "var(--tx)" }}>
              Office Hours
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
              Mon – Fri: 08:30 AM – 04:30 PM<br />
              Saturday: 08:30 AM – 01:00 PM
            </p>
          </div>

        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="college-card p-6 sm:p-8">
              <h2 className="font-serif-heading text-2xl font-bold mb-2" style={{ color: "var(--tx)" }}>
                Send Us an Enquiry
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: "var(--mu)" }}>
                Have questions regarding course eligibility, fees, or hostel accommodation? Fill out the form below.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. R. Anitha"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                        style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="anitha@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                        style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                        Contact Phone
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
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                        Department of Interest
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                        style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                      >
                        <option value="General Admissions">General Admissions 2026–27</option>
                        <option value="Computer Science & Data Science">Computer Science & Data Science</option>
                        <option value="Biotechnology / Microbiology">Biotechnology / Microbiology</option>
                        <option value="Commerce & Management">Commerce & Management</option>
                        <option value="Controller of Examinations">Controller of Examinations (COE)</option>
                        <option value="Hostel & Transport">Hostel & College Bus Transport</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "var(--tx)" }}>
                      Your Query / Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please write your questions here..."
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
                      style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xs cursor-pointer"
                    style={{ backgroundColor: "var(--ac)" }}
                  >
                    Submit Enquiry
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle size={40} weight="fill" className="mx-auto text-emerald-500" />
                  <h4 className="font-serif-heading text-xl font-bold" style={{ color: "var(--tx)" }}>
                    Enquiry Received!
                  </h4>
                  <p className="text-xs sm:text-sm max-w-sm mx-auto" style={{ color: "var(--mu)" }}>
                    Thank you, <strong>{formData.name}</strong>. Our admissions counseling desk will get back to you shortly at {formData.email}.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Location & Directions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="college-card p-6 space-y-4">
              <h3 className="font-serif-heading text-lg font-bold" style={{ color: "var(--tx)" }}>
                How to Reach Campus
              </h3>
              
              <div
                className="h-44 rounded-2xl border p-5 flex flex-col justify-between relative overflow-hidden text-white"
                style={{
                  background: "linear-gradient(135deg, var(--ink), #1e293b 60%, var(--ac))",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded backdrop-blur-sm">
                    NH-336 Trichy–Pudukkottai Highway
                  </span>
                  <NavigationArrow size={22} weight="fill" className="text-amber-400" />
                </div>
                <div>
                  <h4 className="font-serif-heading text-xl font-bold">J.J. Nagar, Sivapuram</h4>
                  <p className="text-xs text-gray-300">Pudukkottai District, Tamil Nadu 622422</p>
                </div>
                <a
                  href="https://maps.google.com/?q=J.J.+College+of+Arts+and+Science+Pudukkottai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ArrowSquareOut size={14} />
                </a>
              </div>

              <div className="space-y-3 text-xs leading-relaxed" style={{ color: "var(--mu)" }}>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[var(--tx)] shrink-0">By Bus:</span>
                  <span>Direct city and mofussil buses run every 10 minutes between Pudukkottai New Bus Stand and Trichy Central. Stop at Sivapuram College Gate.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[var(--tx)] shrink-0">By Train:</span>
                  <span>Pudukkottai Junction (PDKT) is 7 km away. Auto-rickshaws and college shuttles operate regularly.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[var(--tx)] shrink-0">By Air:</span>
                  <span>Tiruchirappalli International Airport (TRZ) is 45 km north along the NH-336 highway.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

