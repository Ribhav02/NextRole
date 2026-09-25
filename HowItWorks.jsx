import { motion } from "framer-motion";
import { Truck, FolderLock, Brain, Target, Compass } from "lucide-react";

const STEPS = [
  { icon: Truck, title: "Real work", text: "Workers speak or type what they do every day — in their own language." },
  { icon: FolderLock, title: "Evidence", text: "Screenshots, certificates and supervisor confirmations go into a private vault." },
  { icon: Brain, title: "Skills", text: "AI maps evidence to skills — each labelled with how it is known." },
  { icon: Target, title: "Gaps", text: "For every role: present, missing and to-be-assessed skills." },
  { icon: Compass, title: "Opportunities", text: "Internal roles with clear reasons. The employer makes the final call." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">How it works</p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight md:text-5xl">From a day's work to a next role — every step explained.</h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-5">
          {STEPS.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white p-6">
              <span className="font-heading text-sm font-semibold text-muted-foreground">0{i + 1}</span>
              <s.icon className="mt-6 h-6 w-6 text-brand" />
              <h3 className="mt-4 font-heading text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}