"use client";

import * as React from "react";
import { COLLEGE_DATA } from "@/lib/college-data";

export function StatisticsSection() {
  return (
    <section
      className="py-12 sm:py-16 text-white transition-colors"
      style={{ backgroundColor: "var(--ink)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {COLLEGE_DATA.statistics.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div
                className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                style={{ color: "var(--ac)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium tracking-wide text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

