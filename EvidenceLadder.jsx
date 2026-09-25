import { motion } from "framer-motion";
import { EVIDENCE_STATES, STATE_ORDER } from "@/lib/intelligence/evidenceModel";

const HEIGHTS = ["h-16", "h-24", "h-32", "h-40", "h-48"];

export default function EvidenceLadder() {
  return (
    <section id="evidence" className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">The evidence model</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-5xl">Every skill says how it is known.</h2>
            <p className="mt-5 leading-relaxed text-white/65">Skills climb from what a worker says, to what documents support, to what a supervisor confirms, to what the worker demonstrates. An uploaded document is <em>document-supported</em> — never automatically “authentic”.</p>
          </div>
          <div className="flex items-end gap-2 md:gap-3">
            {STATE_ORDER.map((k, i) => {
              const s = EVIDENCE_STATES[k];
              return (
                <motion.div key={k} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex-1">
                  <div className={`${HEIGHTS[i]} rounded-t-xl border border-white/10 ${k === "platform_verified" ? "border-dashed bg-white/[0.03]" : "bg-white/[0.06]"} p-3`}>
                    <span className={`block h-1.5 w-8 rounded-full ${s.dot}`} />
                  </div>
                  <p className="mt-3 text-xs font-semibold md:text-sm">{s.label}</p>
                  <p className="mt-1 hidden text-xs leading-snug text-white/50 md:block">{s.example}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}