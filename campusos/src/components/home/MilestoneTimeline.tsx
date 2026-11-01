"use client";

import * as React from "react";
import { COLLEGE_DATA } from "@/lib/college-data";
import { ClockCountdown, CalendarCheck } from "@phosphor-icons/react";

export function MilestoneTimeline() {
  return (
    <section
      className="py-14 sm:py-18 border-y transition-colors"
      style={{
        backgroundColor: "var(--sf)",
        borderColor: "var(--ln)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10 text-left">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <ClockCountdown size={14} weight="bold" />
            <span>Our Milestones</span>
          </div>
          <h2
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-3"
            style={{ color: "var(--tx)" }}
          >
            Three decades of educational excellence
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--mu)" }}>
            From humble beginnings in 1994 to a premier autonomous institution shaping leaders of tomorrow.
          </p>
        </div>

        {/* Milestone Cards Horizontal Flex/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {COLLEGE_DATA.milestones.map((m) => (
            <div
              key={m.year}
              className="p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 relative"
              style={{
                backgroundColor: "var(--pp)",
                borderColor: "var(--ln)",
                borderTop: "4px solid var(--ac)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-serif-heading text-3xl sm:text-4xl font-bold tracking-tight"
                  style={{ color: "var(--ac)" }}
                >
                  {m.year}
                </span>
                <CalendarCheck size={20} className="opacity-30" />
              </div>
              <p
                className="text-xs sm:text-sm font-medium leading-relaxed"
                style={{ color: "var(--tx)" }}
              >
                {m.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

