"use client";

import * as React from "react";
import Link from "next/link";
import { COLLEGE_DATA, NewsItem } from "@/lib/college-data";
import {
  Sparkle,
  MagnifyingGlass,
  FileText,
  X,
} from "@phosphor-icons/react";

export default function NewsPage() {
  const [filterCategory, setFilterCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedNews, setSelectedNews] = React.useState<NewsItem | null>(null);

  const categories = ["All", "Recruitment", "Admission", "Academic", "Examination"];

  const filteredNews = COLLEGE_DATA.latestNews.filter((item) => {
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>News & Announcements</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "var(--ac2)",
              color: "var(--ac)",
            }}
          >
            <Sparkle size={14} weight="bold" />
            <span>Campus News Wire</span>
          </div>

          <h1
            className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ color: "var(--tx)" }}
          >
            Official News & Press Circulars
          </h1>
          <p className="text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: "var(--mu)" }}>
            Official notices, recruitment opportunities, autonomous examination notifications, and student events.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--ln)] pb-6 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: filterCategory === cat ? "var(--ac)" : "var(--sf)",
                  color: filterCategory === cat ? "#ffffff" : "var(--tx)",
                  border: `1px solid ${filterCategory === cat ? "var(--ac)" : "var(--ln)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter announcements..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ac)]"
              style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
            />
          </div>
        </div>

        {/* News Items List */}
        <div className="space-y-4">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="college-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
              onClick={() => setSelectedNews(news)}
            >
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 flex flex-col items-center justify-center w-16 sm:w-20 py-2.5 rounded-xl text-center font-semibold text-xs"
                  style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
                >
                  <span className="text-[10px] font-bold uppercase">{news.category}</span>
                  <span className="font-bold text-xs sm:text-sm">{news.date}</span>
                </div>

                <div>
                  <h3
                    className="font-serif-heading text-lg sm:text-xl font-bold leading-snug group-hover:text-[var(--ac)] transition-colors mb-1"
                    style={{ color: "var(--tx)" }}
                  >
                    {news.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--mu)" }}>
                    {news.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs"
                  style={{ backgroundColor: "var(--ac)" }}
                >
                  Read Notice
                </button>
              </div>
            </div>
          ))}

          {filteredNews.length === 0 && (
            <div className="text-center py-12 p-6 rounded-2xl border" style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--tx)" }}>No announcements match your search.</p>
              <button
                type="button"
                onClick={() => { setFilterCategory("All"); setSearchQuery(""); }}
                className="mt-2 text-xs font-semibold hover:underline"
                style={{ color: "var(--ac)" }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Notice Detail Modal */}
      {selectedNews && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border"
            style={{ backgroundColor: "var(--sf)", borderColor: "var(--ln)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}>
                {selectedNews.category} · {selectedNews.date}
              </span>
              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="p-1 rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="font-serif-heading text-xl sm:text-2xl font-bold leading-snug mb-3" style={{ color: "var(--tx)" }}>
              {selectedNews.title}
            </h3>

            <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--mu)" }}>
              {selectedNews.content || selectedNews.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={selectedNews.url || "https://jjcoll.in/news.php"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xs"
                style={{ backgroundColor: "var(--ac)" }}
              >
                <FileText size={16} />
                <span>Open Full Notice</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium border"
                style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

