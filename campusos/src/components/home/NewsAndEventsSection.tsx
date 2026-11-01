"use client";

import * as React from "react";
import Link from "next/link";
import { COLLEGE_DATA, NewsItem } from "@/lib/college-data";
import {
  CalendarBlank,
  ArrowRight,
  X,
  FileText,
  Megaphone,
} from "@phosphor-icons/react";

export function NewsAndEventsSection() {
  const [selectedNews, setSelectedNews] = React.useState<NewsItem | null>(null);

  // Close modal on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedNews(null);
      }
    };
    if (selectedNews) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedNews]);

  return (
    <section className="py-14 sm:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Latest News (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{
                    backgroundColor: "var(--ac2)",
                    color: "var(--ac)",
                  }}
                >
                  <Megaphone size={14} weight="bold" />
                  <span>Announcements</span>
                </div>
                <h2
                  className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
                  style={{ color: "var(--tx)" }}
                >
                  Latest News & Circulars
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:underline shrink-0 group"
                style={{ color: "var(--ac)" }}
              >
                <span>View all</span>
                <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-3">
              {COLLEGE_DATA.latestNews.map((news) => (
                <button
                  key={news.id}
                  type="button"
                  onClick={() => setSelectedNews(news)}
                  className="college-card w-full p-4 sm:p-5 text-left flex items-start sm:items-center gap-4 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ac)]"
                >
                  {/* Date badge */}
                  <div
                    className="shrink-0 flex flex-col items-center justify-center w-16 sm:w-20 py-2 rounded-xl text-center font-semibold text-xs transition-colors"
                    style={{
                      backgroundColor: "var(--ac2)",
                      color: "var(--ac)",
                    }}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">Notice</span>
                    <span className="text-xs sm:text-sm font-bold leading-tight">{news.date}</span>
                  </div>

                  {/* News info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-sm sm:text-base leading-snug group-hover:text-[var(--ac)] transition-colors line-clamp-2"
                      style={{ color: "var(--tx)" }}
                    >
                      {news.title}
                    </h3>
                    <p
                      className="text-xs sm:text-sm mt-1 line-clamp-1"
                      style={{ color: "var(--mu)" }}
                    >
                      {news.summary}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="hidden sm:flex shrink-0 w-8 h-8 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                       style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}>
                    <ArrowRight size={14} weight="bold" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Events (5 cols) */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
                style={{
                  backgroundColor: "var(--ac2)",
                  color: "var(--ac)",
                }}
              >
                <CalendarBlank size={14} weight="bold" />
                <span>Campus Life</span>
              </div>
              <h2
                className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
                style={{ color: "var(--tx)" }}
              >
                Upcoming Events
              </h2>
            </div>

            <div className="space-y-3">
              {COLLEGE_DATA.upcomingEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="college-card p-4 sm:p-5 flex items-start gap-4"
                >
                  {/* Dark Event Date Badge */}
                  <div
                    className="shrink-0 flex flex-col items-center justify-center w-16 sm:w-20 py-2.5 rounded-xl text-center font-bold text-xs shadow-xs text-white"
                    style={{ backgroundColor: "var(--ink)" }}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                      {evt.date.split(" ").slice(1).join(" ")}
                    </span>
                    <span className="font-serif-heading text-lg sm:text-xl font-bold leading-tight">
                      {evt.date.split(" ")[0]}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-sm sm:text-base leading-snug"
                      style={{ color: "var(--tx)" }}
                    >
                      {evt.title}
                    </h3>
                    <p
                      className="text-xs sm:text-sm mt-1"
                      style={{ color: "var(--mu)" }}
                    >
                      {evt.description}
                    </p>
                  </div>
                </div>
              ))}

              <div
                className="p-5 rounded-2xl border text-center transition-colors"
                style={{
                  backgroundColor: "var(--ac2)",
                  borderColor: "var(--ln)",
                }}
              >
                <p className="text-xs sm:text-sm font-medium mb-3" style={{ color: "var(--tx)" }}>
                  Looking for the complete institutional academic schedule?
                </p>
                <Link
                  href="/iqac"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-xs"
                  style={{ backgroundColor: "var(--ac)" }}
                >
                  <FileText size={16} />
                  <span>Download Academic Calendar 2026–27</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Notice Detail Modal Dialog */}
      {selectedNews && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-news-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border"
            style={{
              backgroundColor: "var(--sf)",
              borderColor: "var(--ln)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "var(--ac2)",
                  color: "var(--ac)",
                }}
              >
                Date: {selectedNews.date}
              </span>
              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <h3
              id="modal-news-title"
              className="font-serif-heading text-xl sm:text-2xl font-bold leading-snug mb-3"
              style={{ color: "var(--tx)" }}
            >
              {selectedNews.title}
            </h3>

            <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--mu)" }}>
              {selectedNews.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={selectedNews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xs"
                style={{ backgroundColor: "var(--ac)" }}
              >
                <FileText size={16} />
                <span>Open Official Circular</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium border"
                style={{
                  backgroundColor: "var(--pp)",
                  borderColor: "var(--ln)",
                  color: "var(--tx)",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

