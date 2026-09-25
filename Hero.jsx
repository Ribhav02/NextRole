import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enterDemo } from "@/lib/demo";
import HeroVisual from "@/components/landing/HeroVisual";
import FlowStrip from "@/components/shared/FlowStrip";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" style={{ backgroundImage: "linear-gradient(hsl(36 14% 87%) 1px, transparent 1px), linear-gradient(90deg, hsl(36 14% 87%) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse at 30% 40%, black 20%, transparent 70%)" }} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-semibold text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />Workforce mobility for India's frontline & gig workers
          </p>
          <h1 className="font-heading text-[2.6rem] font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-[4.2rem]">
            Real work is evidence.<br /><span className="text-brand">Let it open the next role.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            NextRole turns delivery runs, warehouse shifts and customer calls into explainable, evidence-backed skills — then shows workers and employers exactly which internal roles are within reach. No resume required.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => enterDemo("/worker")} className="h-12 rounded-full bg-brand px-6 text-white hover:bg-brand/90">Start Ramesh Demo <ArrowRight className="ml-1 h-4 w-4" /></Button>
            <Button size="lg" variant="outline" asChild className="h-12 rounded-full bg-white px-6"><Link to="/employer">Explore as employer</Link></Button>
          </div>
          <div className="mt-10"><FlowStrip active={4} /></div>
        </motion.div>
        <HeroVisual />
      </div>
    </section>
  );
}