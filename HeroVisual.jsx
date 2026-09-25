import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import SkillChip from "@/components/shared/SkillChip";

const CHIPS = [["Last-mile Delivery", "document_supported"], ["Parcel Sorting", "verified"], ["Customer Handling", "demonstrated"], ["Route Planning", "self_declared"]];
const rise = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.6, ease: [0.22, 1, 0.36, 1] } });

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <motion.div {...rise(0.15)} className="rounded-2xl border bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(13,21,36,0.15)]">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"><Mic className="h-3.5 w-3.5 text-brand" />Real work · voice note</p>
        <p className="mt-2 text-[15px] leading-relaxed">“मैं 3 साल से डिलीवरी करता हूँ — रोज़ 70 पार्सल, COD कैश, और सुबह हब में sorting…”</p>
        <p className="mt-2 text-xs text-muted-foreground">Ramesh · Delivery Associate · Mumbai</p>
      </motion.div>
      <motion.div {...rise(0.45)} className="ml-6 mt-3 rounded-2xl border bg-white p-5 shadow-[0_12px_32px_-12px_rgba(13,21,36,0.15)]">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Evidence-backed skills</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{CHIPS.map(([n, s]) => <SkillChip key={n} name={n} state={s} size="sm" showLabel />)}</div>
      </motion.div>
      <motion.div {...rise(0.75)} className="ml-12 mt-3 rounded-2xl bg-ink p-5 text-white shadow-xl">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Internal opportunity</p>
        <p className="mt-1 font-heading text-xl font-semibold">Hub Operations Associate</p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/75">
          <span><b className="text-emerald-400">3</b> present</span>
          <span><b className="text-amber-400">2</b> to assess</span>
          <span><b className="text-rose-300">2</b> to learn</span>
        </div>
      </motion.div>
    </div>
  );
}