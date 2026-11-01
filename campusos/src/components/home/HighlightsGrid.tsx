"use client";

import * as React from "react";
import { COLLEGE_DATA } from "@/lib/college-data";
import {
  Certificate,
  Buildings,
  GraduationCap,
  Sparkle,
  Medal,
} from "@phosphor-icons/react";

const ICON_MAP = [
  Certificate,
  Medal,
  Buildings,
  GraduationCap,
  Sparkle,
];

export function HighlightsGrid() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {COLLEGE_DATA.highlights.map((feat, index) => {
            const IconComponent = ICON_MAP[index % ICON_MAP.length];
            return (
              <div
                key={feat.title}
                className="college-card p-5 sm:p-6 flex flex-col justify-between group cursor-default"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: "var(--ac2)",
                      color: "var(--ac)",
                    }}
                  >
                    <IconComponent size={22} weight="duotone" />
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase opacity-40">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-serif-heading text-lg sm:text-xl font-bold leading-tight mb-1"
                    style={{ color: "var(--tx)" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium" style={{ color: "var(--mu)" }}>
                    {feat.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

