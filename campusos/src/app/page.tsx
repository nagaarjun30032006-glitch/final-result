import { NewsTicker } from "@/components/navigation/NewsTicker";
import { HeroSection } from "@/components/home/HeroSection";
import { HighlightsGrid } from "@/components/home/HighlightsGrid";
import { MilestoneTimeline } from "@/components/home/MilestoneTimeline";
import { DepartmentsShowcase } from "@/components/home/DepartmentsShowcase";
import { StatisticsSection } from "@/components/home/StatisticsSection";
import { NewsAndEventsSection } from "@/components/home/NewsAndEventsSection";
import { LeadershipSection } from "@/components/home/LeadershipSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NewsTicker />
      <HeroSection />
      <HighlightsGrid />
      <MilestoneTimeline />
      <DepartmentsShowcase />
      <StatisticsSection />
      <NewsAndEventsSection />
      <LeadershipSection />
    </div>
  );
}
