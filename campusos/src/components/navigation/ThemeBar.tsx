"use client";

import * as React from "react";
import { useTheme, PALETTES, ThemePalette } from "@/context/ThemeContext";
import { Sun, Moon, Desktop, Palette, CaretDown } from "@phosphor-icons/react";

export function ThemeBar() {
  const { mode, palette, isDark, setMode, setPalette } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-full bg-[var(--sf)] border-b border-[var(--ln)] py-1.5 px-4 text-xs transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[11px] text-[var(--mu)] uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[var(--ac)]" />
            <span>Theme Options</span>
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[var(--ln)] text-[10px] text-[var(--tx)]"
          >
            <span>{PALETTES[palette].name}</span>
            <CaretDown className="w-2.5 h-2.5" />
          </button>
        </div>

        <div className={`flex flex-wrap items-center gap-2 ${isOpen ? "flex" : "hidden md:flex"}`}>
          {/* Mode Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-full border border-[var(--ln)] bg-[var(--pp)]">
            {(
              [
                { key: "light", label: "Light", icon: Sun },
                { key: "dark", label: "Dark", icon: Moon },
                { key: "system", label: "System", icon: Desktop },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isActive = mode === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setMode(item.key)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                    isActive
                      ? "bg-[var(--sf)] text-[var(--ac)] shadow-sm font-semibold border border-[var(--ln)]"
                      : "text-[var(--mu)] hover:text-[var(--tx)]"
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          <span className="w-px h-4 bg-[var(--ln)] hidden sm:inline-block mx-1" />

          {/* Palette Switcher */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-[var(--mu)] hidden lg:inline mr-1">Palettes:</span>
            {(Object.keys(PALETTES) as ThemePalette[]).map((key) => {
              const pal = PALETTES[key];
              const isActive = palette === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPalette(key)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border ${
                    isActive
                      ? "border-[var(--ac)] bg-[var(--ac2)] text-[var(--ac)] font-bold shadow-xs"
                      : "border-[var(--ln)] bg-[var(--sf)] text-[var(--tx)] hover:border-[var(--mu)]"
                  }`}
                  title={`${pal.name} Theme`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: isDark ? pal.dark.ac : pal.light.ac }}
                  />
                  <span>{pal.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

