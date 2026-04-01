import { HeroSection } from "@/components/modules/HeroSection";
import { BentoTestimonials } from "@/components/modules/BentoTestimonials";
import { PortfolioGrid } from "@/components/modules/PortfolioGrid";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      
      <BentoTestimonials />

      <PortfolioGrid />
      
      {/* Spacer to overflow naturally */}
      <div className="h-[20vh] bg-transparent" />
    </main>
  );
}
