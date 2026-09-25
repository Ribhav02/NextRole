import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enterDemo } from "@/lib/demo";
import useDemoIds from "@/hooks/useDemoIds";

const STORY = [
  ["3 years", "delivering 60–80 parcels a day in Andheri East"],
  ["3 evidence types", "app screenshot, supervisor Meena's confirmation, a customer scenario"],
  ["1 internal move", "Hub Operations Associate — with 2 skills to assess and 2 to learn"],
];

export default function DemoCTA() {
  const { workerId, roleId } = useDemoIds();
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-ink p-8 text-white md:p-14">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Ramesh Demo Mode</p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight md:text-5xl">Meet Ramesh. Watch his work become a next role.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STORY.map(([k, v]) => (
            <div key={k} className="border-t border-white/15 pt-4">
              <p className="font-heading text-2xl font-semibold text-brand">{k}</p>
              <p className="mt-1 text-sm text-white/65">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" onClick={() => enterDemo("/worker")} className="h-12 rounded-full bg-brand px-6 text-white hover:bg-brand/90">Walk through as Ramesh <ArrowRight className="ml-1 h-4 w-4" /></Button>
          <Button size="lg" variant="outline" asChild className="h-12 rounded-full border-white/20 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
            <Link to={workerId ? `/employer/candidate/${workerId}?role=${roleId || ""}` : "/employer/talent"}>See the employer's view</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}