import { notFound } from "next/navigation";
import Link from "next/link";
import { COLLEGE_DATA } from "@/lib/college-data";
import {
  GraduationCap,
  Sparkle,
  Flask,
  FilePdf,
  ArrowLeft,
  CheckCircle,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLEGE_DATA.departments.map((dept) => ({
    slug: dept.slug,
  }));
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dept = COLLEGE_DATA.departments.find((d) => d.slug === slug);

  if (!dept) {
    notFound();
  }

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-8 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: "var(--mu)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <Link href="/academic" className="hover:underline">Academic</Link>
            <span>›</span>
            <span style={{ color: "var(--ac)" }}>{dept.name}</span>
          </div>

          <Link
            href="/academic"
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline mb-4"
            style={{ color: "var(--ac)" }}
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Back to all departments</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
                style={{
                  backgroundColor: "var(--ac2)",
                  color: "var(--ac)",
                }}
              >
                <Sparkle size={14} weight="bold" />
                <span>Department of {dept.category}</span>
                <span>•</span>
                <span>Est. {dept.established}</span>
              </div>
              <h1
                className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                style={{ color: "var(--tx)" }}
              >
                Department of {dept.name}
              </h1>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xs"
                style={{ backgroundColor: "var(--ac)" }}
              >
                <GraduationCap size={18} weight="bold" />
                <span>Apply for this Department</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview */}
            <div className="college-card p-6 sm:p-8">
              <h2 className="font-serif-heading text-2xl font-bold mb-4" style={{ color: "var(--tx)" }}>
                Department Overview
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--mu)" }}>
                {dept.description}
              </p>

              <h3 className="font-serif-heading text-lg font-bold mb-3" style={{ color: "var(--tx)" }}>
                Key Highlights & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dept.highlights.map((h) => (
                  <div
                    key={h}
                    className="p-3.5 rounded-xl border flex items-center gap-2.5"
                    style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}
                  >
                    <CheckCircle size={18} weight="fill" style={{ color: "var(--ac)" }} />
                    <span className="text-xs sm:text-sm font-medium" style={{ color: "var(--tx)" }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Programmes Offered in this Department */}
            <div className="college-card p-6 sm:p-8">
              <h2 className="font-serif-heading text-2xl font-bold mb-4" style={{ color: "var(--tx)" }}>
                Programmes Offered
              </h2>
              <div className="divide-y divide-[var(--ln)]">
                {dept.degrees.map((degree) => (
                  <div key={degree} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-serif-heading text-lg font-bold" style={{ color: "var(--tx)" }}>
                        {degree}
                      </h4>
                      <p className="text-xs mt-0.5" style={{ color: "var(--mu)" }}>
                        CBCS Autonomous Curriculum · Outcome-Based Learning
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://jjcoll.in/syllabus.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border hover:border-[var(--ac)] transition-colors"
                        style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)", color: "var(--tx)" }}
                      >
                        <FilePdf size={14} />
                        <span>Syllabus</span>
                      </a>
                      <Link
                        href="/admissions"
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                        style={{ backgroundColor: "var(--ac)" }}
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Laboratories & Infrastructure */}
            {dept.labs && dept.labs.length > 0 && (
              <div className="college-card p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Flask size={22} weight="bold" style={{ color: "var(--ac)" }} />
                  <h2 className="font-serif-heading text-2xl font-bold" style={{ color: "var(--tx)" }}>
                    Laboratories & Practical Infrastructure
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dept.labs.map((lab) => (
                    <div
                      key={lab}
                      className="p-3.5 rounded-xl border flex items-center gap-2.5"
                      style={{ backgroundColor: "var(--pp)", borderColor: "var(--ln)" }}
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "var(--ac)" }} />
                      <span className="text-xs sm:text-sm font-semibold" style={{ color: "var(--tx)" }}>
                        {lab}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar (4 cols): HOD & Department Info */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* HOD Card */}
            <div className="college-card p-6 text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center font-serif-heading text-2xl font-bold mb-4 shadow-sm"
                style={{ backgroundColor: "var(--ac2)", color: "var(--ac)" }}
              >
                HOD
              </div>
              <h3 className="font-serif-heading text-xl font-bold" style={{ color: "var(--tx)" }}>
                {dept.hod}
              </h3>
              <div className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: "var(--ac)" }}>
                Head of the Department
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Department of {dept.name}
              </p>

              <div className="mt-5 pt-4 border-t border-[var(--ln)] flex items-center justify-center gap-2 text-xs font-semibold">
                <EnvelopeSimple size={16} />
                <a href={`mailto:dept.${dept.slug}@jjcoll.in`} className="hover:underline" style={{ color: "var(--tx)" }}>
                  dept.{dept.slug}@jjcoll.in
                </a>
              </div>
            </div>

            {/* Quick Metadata */}
            <div className="college-card p-6 space-y-3">
              <h4 className="font-serif-heading text-base font-bold mb-2" style={{ color: "var(--tx)" }}>
                Department Summary
              </h4>
              <div className="flex justify-between py-1.5 border-b border-[var(--ln)] text-xs">
                <span style={{ color: "var(--mu)" }}>Academic Deanery</span>
                <strong style={{ color: "var(--tx)" }}>{dept.category}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--ln)] text-xs">
                <span style={{ color: "var(--mu)" }}>Year Founded</span>
                <strong style={{ color: "var(--tx)" }}>{dept.established}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--ln)] text-xs">
                <span style={{ color: "var(--mu)" }}>Total Degrees</span>
                <strong style={{ color: "var(--tx)" }}>{dept.degrees.length} Degrees</strong>
              </div>
              <div className="flex justify-between py-1.5 text-xs">
                <span style={{ color: "var(--mu)" }}>Medium of Instruction</span>
                <strong style={{ color: "var(--tx)" }}>English / Tamil</strong>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

