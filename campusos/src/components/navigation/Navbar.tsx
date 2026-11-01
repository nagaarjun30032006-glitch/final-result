"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NAVIGATION_SECTIONS,
  SEARCH_INDEX,
  SearchItem,
} from "@/lib/navigation";
import {
  List,
  X,
  CaretDown,
  MagnifyingGlass,
  ArrowRight,
} from "@phosphor-icons/react";

export function Navbar() {
  const pathname = usePathname();
  const [activeMenuIndex, setActiveMenuIndex] = React.useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = React.useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchHits, setSearchHits] = React.useState<SearchItem[]>([]);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Close menus on path navigation
  React.useEffect(() => {
    setActiveMenuIndex(null);
    setMobileMenuOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Handle outside click to close active dropdown
  const navRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenuIndex(null);
        setSearchHits([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenuIndex(null);
        setMobileMenuOpen(false);
        setSearchHits([]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Instant Search filter
  React.useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length > 1) {
      const results = SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      ).slice(0, 8);
      setSearchHits(results);
    } else {
      setSearchHits([]);
    }
  }, [searchQuery]);

  const toggleDesktopMenu = (index: number) => {
    setActiveMenuIndex((prev) => (prev === index ? null : index));
  };

  const toggleMobileSection = (sectionName: string) => {
    setMobileExpandedSection((prev) => (prev === sectionName ? null : sectionName));
  };

  const activeSection =
    activeMenuIndex !== null ? NAVIGATION_SECTIONS[activeMenuIndex] : null;

  return (
    <div
      ref={navRef}
      className="sticky top-0 z-40 w-full bg-[var(--nv)] backdrop-blur-md border-b border-[var(--ln)] transition-colors shadow-2xs"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 h-14 md:h-16">
        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 rounded-lg text-[var(--tx)] hover:bg-[var(--ac2)] hover:text-[var(--ac)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open mobile navigation"
            aria-expanded={mobileMenuOpen}
          >
            <List className="w-6 h-6" />
          </button>
          <span className="font-serif-heading font-bold text-base text-[var(--ink)] sm:hidden">
            J.J. College
          </span>
        </div>

        {/* Desktop Horizontal Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 h-full">
          <Link
            href="/"
            className={`h-full inline-flex items-center px-3.5 text-xs xl:text-sm font-semibold tracking-wide transition-colors border-b-3 ${
              pathname === "/"
                ? "text-[var(--ac)] border-[var(--ac)]"
                : "text-[var(--tx)] border-transparent hover:text-[var(--ac)] hover:border-[var(--ac)]"
            }`}
          >
            HOME
          </Link>

          {NAVIGATION_SECTIONS.map((section, idx) => {
            const isSelected = activeMenuIndex === idx;
            const isRouteActive = pathname.startsWith(section.href);

            if (!section.hasDropdown) {
              return (
                <Link
                  key={section.name}
                  href={section.href}
                  className={`h-full inline-flex items-center px-3 text-xs xl:text-sm font-semibold tracking-wide transition-colors border-b-3 ${
                    isRouteActive
                      ? "text-[var(--ac)] border-[var(--ac)]"
                      : "text-[var(--tx)] border-transparent hover:text-[var(--ac)] hover:border-[var(--ac)]"
                  }`}
                >
                  {section.name.toUpperCase()}
                </Link>
              );
            }

            return (
              <button
                key={section.name}
                type="button"
                onClick={() => toggleDesktopMenu(idx)}
                className={`h-full inline-flex items-center gap-1 px-3 text-xs xl:text-sm font-semibold tracking-wide transition-colors border-b-3 ${
                  isSelected || isRouteActive
                    ? "text-[var(--ac)] border-[var(--ac)]"
                    : "text-[var(--tx)] border-transparent hover:text-[var(--ac)] hover:border-[var(--ac)]"
                }`}
                aria-expanded={isSelected}
              >
                <span>{section.name.toUpperCase()}</span>
                <CaretDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isSelected ? "rotate-180 text-[var(--ac)]" : "text-[var(--mu)]"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Search Bar with Instant Results Overlay */}
        <div className="relative w-full max-w-xs sm:max-w-sm ml-auto">
          <div className="relative flex items-center">
            <MagnifyingGlass className="absolute left-3.5 w-4 h-4 text-[var(--mu)] pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search site, syllabus, departments..."
              className="w-full h-10 pl-9 pr-8 text-xs sm:text-sm bg-[var(--sf)] border border-[var(--ln)] rounded-full text-[var(--tx)] placeholder:text-[var(--mu)] focus:outline-none focus:ring-2 focus:ring-[var(--ac)] transition-all"
              aria-label="Search the college website"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  searchInputRef.current?.focus();
                }}
                className="absolute right-3 p-0.5 rounded-full text-[var(--mu)] hover:text-[var(--tx)]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Instant Search Hits Popup */}
          {searchHits.length > 0 && (
            <div className="absolute right-0 top-12 w-[calc(100vw-32px)] sm:w-96 max-h-[70vh] overflow-y-auto bg-[var(--sf)] border border-[var(--ln)] rounded-2xl shadow-xl p-2 z-50 animate-fadeIn">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--mu)]">
                Instant Search Results ({searchHits.length})
              </div>
              <div className="divide-y divide-[var(--ln)]">
                {searchHits.map((hit, i) => (
                  <Link
                    key={i}
                    href={hit.href}
                    onClick={() => setSearchHits([])}
                    className="block p-2.5 rounded-xl hover:bg-[var(--ac2)] hover:text-[var(--ac)] transition-colors group"
                  >
                    <div className="text-xs sm:text-sm font-semibold text-[var(--tx)] group-hover:text-[var(--ac)] flex items-center justify-between">
                      <span>{hit.title}</span>
                      <ArrowRight className="w-3 h-3 text-[var(--mu)] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-[11px] text-[var(--mu)]">{hit.category}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Mega-Menu Panel */}
      {activeSection && activeSection.megaMenuGroups && (
        <div className="hidden lg:block w-full bg-[var(--sf)] border-t border-b border-[var(--ln)] shadow-lg animate-fadeIn max-h-[75vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--ln)]">
              <div>
                <h3 className="font-serif-heading text-xl text-[var(--ink)] font-bold">
                  {activeSection.name}
                </h3>
                <p className="text-xs text-[var(--mu)]">
                  Explore academic, administrative, and student support offerings.
                </p>
              </div>
              <Link
                href={activeSection.href}
                onClick={() => setActiveMenuIndex(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ac)] hover:underline"
              >
                <span>View {activeSection.name} Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {activeSection.megaMenuGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-3">
                  {group.groupTitle && (
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--ac)] pb-1 border-b border-[var(--ln)]">
                      {group.groupTitle}
                    </div>
                  )}
                  <div className="space-y-1">
                    {group.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        onClick={() => setActiveMenuIndex(null)}
                        className="block p-2 rounded-lg hover:bg-[var(--ac2)] transition-colors group"
                      >
                        <div className="text-xs font-semibold text-[var(--tx)] group-hover:text-[var(--ac)] transition-colors">
                          {item.label}
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-[var(--mu)] line-clamp-1 leading-snug">
                            {item.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Surface */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="relative z-50 w-[88vw] max-w-sm h-full bg-[var(--sf)] border-r border-[var(--ln)] shadow-2xl flex flex-col text-[var(--tx)] animate-slideInLeft"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-[var(--ln)] flex items-center justify-between bg-[var(--pp)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--ac)] text-white flex items-center justify-center font-serif-heading text-sm font-bold">
                  JJ
                </div>
                <div>
                  <div className="font-serif-heading font-bold text-sm text-[var(--ink)] leading-tight">
                    J.J. College
                  </div>
                  <div className="text-[10px] text-[var(--mu)]">Autonomous · Est. 1994</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--ac2)] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl font-semibold text-sm transition-colors ${
                  pathname === "/"
                    ? "bg-[var(--ac2)] text-[var(--ac)]"
                    : "text-[var(--tx)] hover:bg-[var(--pp)]"
                }`}
              >
                <span>Home</span>
              </Link>

              {NAVIGATION_SECTIONS.map((section) => {
                const isExpanded = mobileExpandedSection === section.name;
                const isRouteActive = pathname.startsWith(section.href);

                if (!section.hasDropdown) {
                  return (
                    <Link
                      key={section.name}
                      href={section.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl font-semibold text-sm transition-colors ${
                        isRouteActive
                          ? "bg-[var(--ac2)] text-[var(--ac)]"
                          : "text-[var(--tx)] hover:bg-[var(--pp)]"
                      }`}
                    >
                      <span>{section.name}</span>
                    </Link>
                  );
                }

                return (
                  <div key={section.name} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(section.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl font-semibold text-sm transition-colors text-left ${
                        isExpanded || isRouteActive
                          ? "bg-[var(--ac2)] text-[var(--ac)]"
                          : "text-[var(--tx)] hover:bg-[var(--pp)]"
                      }`}
                    >
                      <span>{section.name}</span>
                      <CaretDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[var(--ac)]" : "text-[var(--mu)]"
                        }`}
                      />
                    </button>

                    {/* Collapsible Mobile Sub-Menu */}
                    {isExpanded && section.megaMenuGroups && (
                      <div className="pl-3 pr-1 py-1 space-y-3 bg-[var(--pp)] rounded-xl border border-[var(--ln)] mb-2">
                        {section.megaMenuGroups.map((group, gIdx) => (
                          <div key={gIdx} className="space-y-1">
                            {group.groupTitle && (
                              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ac)] pt-1 px-2">
                                {group.groupTitle}
                              </div>
                            )}
                            {group.items.map((item, itemIdx) => (
                              <Link
                                key={itemIdx}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-2.5 py-1.5 rounded-lg text-xs text-[var(--tx)] hover:text-[var(--ac)] hover:bg-[var(--sf)] transition-colors"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer CTA */}
            <div className="p-4 border-t border-[var(--ln)] bg-[var(--pp)] space-y-2">
              <Link
                href="/admissions"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[var(--ac)] text-white text-xs font-bold shadow-sm"
              >
                <span>Online Admission Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="text-[11px] text-[var(--mu)] text-center">
                Helpline: +91 79041 51908
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

