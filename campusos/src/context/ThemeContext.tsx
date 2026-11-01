"use client";

import * as React from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ThemePalette = "ver" | "roy" | "for" | "plu" | "tea";

interface PaletteConfig {
  name: string;
  swatch: string;
  light: {
    ac: string;
    ac2: string;
    pp: string;
    ln: string;
    mu: string;
    ink: string;
    sf: string;
  };
  dark: {
    ac: string;
    ac2: string;
    pp: string;
    ln: string;
    mu: string;
    ink: string;
    sf: string;
  };
}

export const PALETTES: Record<ThemePalette, PaletteConfig> = {
  ver: {
    name: "Vermilion",
    swatch: "#d9480f",
    light: {
      ac: "#d9480f",
      ac2: "#fff1e8",
      pp: "#fbfaf7",
      ln: "#e6e2d9",
      mu: "#5b6472",
      ink: "#101828",
      sf: "#ffffff",
    },
    dark: {
      ac: "#ff7a3d",
      ac2: "#2a1d18",
      pp: "#0f1117",
      ln: "#2a2f3a",
      mu: "#a3abba",
      ink: "#07090d",
      sf: "#171a22",
    },
  },
  roy: {
    name: "Royal Blue",
    swatch: "#1d4ed8",
    light: {
      ac: "#1d4ed8",
      ac2: "#e8efff",
      pp: "#f6f8fc",
      ln: "#dde3f0",
      mu: "#55627a",
      ink: "#0b1b3b",
      sf: "#ffffff",
    },
    dark: {
      ac: "#6b93ff",
      ac2: "#16213f",
      pp: "#0b1020",
      ln: "#242d4a",
      mu: "#9aa6c4",
      ink: "#050810",
      sf: "#141b30",
    },
  },
  for: {
    name: "Forest",
    swatch: "#2f7d4f",
    light: {
      ac: "#2f7d4f",
      ac2: "#e7f4ec",
      pp: "#f6f8f4",
      ln: "#dfe6dc",
      mu: "#566358",
      ink: "#12261b",
      sf: "#ffffff",
    },
    dark: {
      ac: "#4ade80",
      ac2: "#14261c",
      pp: "#0c130f",
      ln: "#25342a",
      mu: "#9bb0a2",
      ink: "#060b08",
      sf: "#131d17",
    },
  },
  plu: {
    name: "Plum",
    swatch: "#a21caf",
    light: {
      ac: "#a21caf",
      ac2: "#fbeafd",
      pp: "#fbf8fc",
      ln: "#e9dfeb",
      mu: "#6b5c70",
      ink: "#2a1030",
      sf: "#ffffff",
    },
    dark: {
      ac: "#e879f9",
      ac2: "#2a1530",
      pp: "#120c15",
      ln: "#33263a",
      mu: "#b3a0b9",
      ink: "#09050b",
      sf: "#1b1220",
    },
  },
  tea: {
    name: "Teal",
    swatch: "#0f766e",
    light: {
      ac: "#0f766e",
      ac2: "#e0f4f2",
      pp: "#f4f9f8",
      ln: "#d9e6e4",
      mu: "#4f6462",
      ink: "#0c2624",
      sf: "#ffffff",
    },
    dark: {
      ac: "#2dd4bf",
      ac2: "#10292a",
      pp: "#0a1314",
      ln: "#1f3436",
      mu: "#94b0ae",
      ink: "#050b0b",
      sf: "#122021",
    },
  },
};

interface ThemeContextType {
  mode: ThemeMode;
  palette: ThemePalette;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  setPalette: (palette: ThemePalette) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<ThemeMode>("light");
  const [palette, setPaletteState] = React.useState<ThemePalette>("ver");
  const [isSystemDark, setIsSystemDark] = React.useState(false);

  React.useEffect(() => {
    try {
      const storedMode = localStorage.getItem("jjc_theme_mode") as ThemeMode | null;
      const storedPalette = localStorage.getItem("jjc_theme_palette") as ThemePalette | null;
      if (storedMode) setModeState(storedMode);
      if (storedPalette && PALETTES[storedPalette]) setPaletteState(storedPalette);

      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setIsSystemDark(mq.matches);
      const listener = (e: MediaQueryListEvent) => setIsSystemDark(e.matches);
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    } catch {}
  }, []);

  const isDark = mode === "dark" || (mode === "system" && isSystemDark);

  React.useEffect(() => {
    const pal = PALETTES[palette] || PALETTES.ver;
    const tokens = isDark ? pal.dark : pal.light;
    const root = document.documentElement;

    root.style.setProperty("--ac", tokens.ac);
    root.style.setProperty("--ac2", tokens.ac2);
    root.style.setProperty("--pp", tokens.pp);
    root.style.setProperty("--ln", tokens.ln);
    root.style.setProperty("--mu", tokens.mu);
    root.style.setProperty("--ink", tokens.ink);
    root.style.setProperty("--tx", isDark ? "#eef0f4" : tokens.ink);
    root.style.setProperty("--sf", tokens.sf);
    root.style.setProperty("--nv", isDark ? tokens.pp + "f2" : "#fffffff2");

    if (isDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, [isDark, palette]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem("jjc_theme_mode", newMode);
    } catch {}
  };

  const setPalette = (newPalette: ThemePalette) => {
    setPaletteState(newPalette);
    try {
      localStorage.setItem("jjc_theme_palette", newPalette);
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ mode, palette, isDark, setMode, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

