"use client";

import * as React from "react";
import Link from "next/link";
import { COLLEGE_DATA } from "@/lib/college-data";
import { Megaphone, ArrowSquareOut } from "@phosphor-icons/react";

export function NewsTicker() {
  const tickerItems = [...COLLEGE_DATA.latestNews, ...COLLEGE_DATA.latestNews];

  return (
    <div
      className="relative flex items-center overflow-hidden border-b transition-colors"
      style={{
        backgroundColor: "var(--ac2)",
        borderColor: "var(--ln)",
      }}
      aria-label="Latest Announcements"
    >
      {/* Badge Pill */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 sm:px-4 text-xs font-bold uppercase tracking-wider text-white select-none shrink-0 z-10 shadow-sm"
        style={{ backgroundColor: "var(--ac)" }}
      >
        <Megaphone size={15} weight="fill" className="hidden sm:inline" />
        <span>Latest News</span>
      </div>

      {/* Marquee Ticker Track */}
      <div className="relative flex-1 overflow-hidden py-2 group">
        <div
          className="flex whitespace-nowrap gap-8 hover:[animation-play-state:paused] animate-marquee"
          style={{ willChange: "transform" }}
        >
          {tickerItems.map((item, idx) => (
            <Link
              key={`${item.id}-${idx}`}
              href={`/news?id=${item.id}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ac)] rounded px-1"
              style={{ color: "var(--tx)" }}
            >
              <span
                className="font-bold text-[10px] tracking-wide px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "var(--ac)", color: "#ffffff" }}
              >
                NEW
              </span>
              <span>{item.title}</span>
              <span className="text-[11px] opacity-75">({item.date})</span>
              <ArrowSquareOut size={12} className="opacity-60" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

