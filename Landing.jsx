import LandingNav from "@/components/landing/LandingNav";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import EvidenceLadder from "@/components/landing/EvidenceLadder";
import ValueProps from "@/components/landing/ValueProps";
import Principles from "@/components/landing/Principles";
import DemoCTA from "@/components/landing/DemoCTA";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <Hero />
      <HowItWorks />
      <EvidenceLadder />
      <ValueProps />
      <Principles />
      <DemoCTA />
      <LandingFooter />
    </div>
  );
}