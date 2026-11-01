"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  ArrowSquareOut,
  NavigationArrow,
  ShieldCheck,
} from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer
      className="text-gray-300 transition-colors border-t border-[var(--ln)]"
      style={{ backgroundColor: "var(--ink)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: About JJC (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-serif-heading font-bold text-white text-base shadow-sm"
                style={{ backgroundColor: "var(--ac)" }}
              >
                JJ
              </div>
              <div>
                <h3 className="font-serif-heading text-lg font-bold text-white leading-tight">
                  J.J. College of Arts and Science
                </h3>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Autonomous · Re-accredited B++
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Established in 1994 by the Karpaga Vinayaga Educational Trust,
              re-accredited with B++ Grade by NAAC (4th Cycle). Conferred autonomous
              status by UGC, affiliated to Bharathidasan University, Tiruchirappalli.
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400 pt-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Approved by UGC under 2(f) & 12(B)</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-heading text-base font-bold text-white tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the College & Leadership
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-white transition-colors">
                  Admissions & Fee Structure
                </Link>
              </li>
              <li>
                <Link href="/academic" className="hover:text-white transition-colors">
                  Programmes & 17 Departments
                </Link>
              </li>
              <li>
                <Link href="/examination" className="hover:text-white transition-colors">
                  Office of the Controller of Examinations
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-white transition-colors">
                  Research Centers & Facilities
                </Link>
              </li>
              <li>
                <Link href="/iqac" className="hover:text-white transition-colors">
                  IQAC, AQAR & SSR Reports
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Training & Placement Cell
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-heading text-base font-bold text-white tracking-wide">
              Contact & Campus
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <span>
                  J.J. Nagar, Sivapuram Post, Pudukkottai – 622 422, Tamil Nadu, India.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={18} className="text-amber-400 shrink-0" />
                <a href="tel:+917904151908" className="hover:text-white transition-colors">
                  +91 79041 51908
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <EnvelopeSimple size={18} className="text-amber-400 shrink-0" />
                <a href="mailto:jjcollege.pdkt@gmail.com" className="hover:text-white transition-colors">
                  jjcollege.pdkt@gmail.com
                </a>
              </div>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-white/10 text-white text-[11px] font-medium">
                  College Code: 112 (BDU)
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Location Map Preview Card (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif-heading text-base font-bold text-white tracking-wide">
              Campus Location
            </h4>
            <div
              className="h-36 rounded-2xl border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden group transition-all"
              style={{
                background:
                  "repeating-linear-gradient(45deg, #1c2740, #1c2740 10px, #222e4a 10px, #222e4a 20px)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white/90 bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                  NH-336 Highway
                </span>
                <NavigationArrow size={18} weight="fill" className="text-amber-400" />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">Sivapuram Campus</p>
                <p className="text-[11px] text-gray-300">Pudukkottai - Trichy Main Road</p>
              </div>

              <a
                href="https://maps.google.com/?q=J.J.+College+of+Arts+and+Science+Pudukkottai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-white transition-colors"
              >
                <span>Google Maps View</span>
                <ArrowSquareOut size={13} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} J.J. College of Arts and Science (Autonomous). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 font-medium">
              Concept redesign for J.J. College · Powered by CampusOS
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

