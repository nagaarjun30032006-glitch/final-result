"use client";

import * as React from "react";
import Link from "next/link";
import {
  YoutubeLogo,
  InstagramLogo,
  FacebookLogo,
  WhatsappLogo,
  CreditCard,
  EnvelopeSimple,
  UserGear,
  ShieldCheck,
  Question,
} from "@phosphor-icons/react";
import { COLLEGE_INFO } from "@/lib/college-data";

export function TopUtilityBar() {
  return (
    <div className="w-full bg-[var(--ink)] text-[#e6e9ef] text-xs border-b border-white/10 z-40 relative">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
        {/* Left: Statutory & Quick Utility Links */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[11px] sm:text-xs">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full hover:bg-white/10 transition-colors font-medium text-white"
          >
            <CreditCard className="w-3.5 h-3.5 text-[var(--ac)]" />
            <span>Online Payment</span>
            <span className="bg-[var(--ac)] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
              NEW
            </span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full hover:bg-white/10 transition-colors text-[#c9cfdb] hover:text-white"
          >
            <Question className="w-3 h-3 text-[var(--ac)]" />
            <span>Grievance Redressal</span>
          </Link>

          <Link
            href="/iqac"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full hover:bg-white/10 transition-colors text-[#c9cfdb] hover:text-white"
          >
            <ShieldCheck className="w-3 h-3 text-[var(--ac)]" />
            <span>IQAC</span>
          </Link>

          <a
            href={COLLEGE_INFO.webmail}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full hover:bg-white/10 transition-colors text-[#c9cfdb] hover:text-white"
          >
            <EnvelopeSimple className="w-3 h-3 text-[var(--ac)]" />
            <span>Webmail</span>
          </a>

          <Link
            href="/examination"
            className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full hover:bg-white/10 transition-colors text-[#c9cfdb] hover:text-white"
          >
            <UserGear className="w-3 h-3 text-[var(--ac)]" />
            <span>COE & Exam Portal</span>
          </Link>
        </div>

        {/* Right: Social Media Icons & Student Helpline */}
        <div className="flex items-center gap-3 text-[11px] text-[#c9cfdb]">
          <span className="hidden md:inline font-mono text-[11px] text-white/70">
            Helpline: <strong className="text-white">+91 79041 51908</strong>
          </span>
          <span className="hidden md:inline text-white/20">|</span>

          <div className="flex items-center gap-1">
            <a
              href={COLLEGE_INFO.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full hover:bg-white/15 hover:text-red-400 transition-colors"
              aria-label="YouTube Channel"
            >
              <YoutubeLogo className="w-3.5 h-3.5" />
            </a>
            <a
              href={COLLEGE_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full hover:bg-white/15 hover:text-pink-400 transition-colors"
              aria-label="Instagram Page"
            >
              <InstagramLogo className="w-3.5 h-3.5" />
            </a>
            <a
              href={COLLEGE_INFO.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full hover:bg-white/15 hover:text-blue-400 transition-colors"
              aria-label="Facebook Page"
            >
              <FacebookLogo className="w-3.5 h-3.5" />
            </a>
            <a
              href={COLLEGE_INFO.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full hover:bg-white/15 hover:text-emerald-400 transition-colors"
              aria-label="WhatsApp Desk"
            >
              <WhatsappLogo className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

