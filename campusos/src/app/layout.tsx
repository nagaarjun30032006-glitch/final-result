import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { TopUtilityBar } from "@/components/navigation/TopUtilityBar";
import { ThemeBar } from "@/components/navigation/ThemeBar";
import { CollegeHeader } from "@/components/navigation/CollegeHeader";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "J.J. College of Arts and Science (Autonomous) — Pudukkottai",
  description:
    "Affiliated to Bharathidasan University · NAAC Re-Accredited B++ (4th Cycle) · Conferred Autonomous Status by UGC · A Silver Jubilee Institution empowering youth in Pudukkottai, Tamil Nadu.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased flex flex-col">
        <ThemeProvider>
          {/* Top Accessibility & System Mode Bar */}
          <ThemeBar />

          {/* Quick Utility Links (Webmail, COE, Helpdesk) */}
          <TopUtilityBar />

          {/* Main Institution Crest & Title */}
          <CollegeHeader />

          {/* Sticky Navigation Bar with Mega-menus */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* College Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
