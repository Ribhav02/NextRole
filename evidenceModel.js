// Evidence states — ordered from weakest to strongest.
export const EVIDENCE_STATES = {
  self_declared: {
    rank: 1, label: "Self-declared", status: "Unverified",
    desc: "Stated by the worker. Not yet backed by evidence.",
    example: "“I plan my own delivery routes.”",
    chip: "bg-stone-100 text-stone-700 border-stone-200", dot: "bg-stone-400", color: "#a8a29e",
  },
  document_supported: {
    rank: 2, label: "Document-supported", status: "Document-supported",
    desc: "Backed by an uploaded screenshot, document or certificate. Not automatically authenticated.",
    example: "Delivery app performance screenshot",
    chip: "bg-sky-50 text-sky-800 border-sky-200", dot: "bg-sky-500", color: "#0ea5e9",
  },
  verified: {
    rank: 3, label: "Verified", status: "Supervisor-verified",
    desc: "Confirmed by a supervisor or peer who observed the work.",
    example: "Hub supervisor confirms parcel sorting",
    chip: "bg-emerald-50 text-emerald-800 border-emerald-200", dot: "bg-emerald-500", color: "#10b981",
  },
  demonstrated: {
    rank: 4, label: "Demonstrated", status: "Demonstrated",
    desc: "Shown through a practical scenario assessment.",
    example: "Handled an upset-customer scenario",
    chip: "bg-amber-50 text-amber-900 border-amber-300", dot: "bg-amber-500", color: "#f59e0b",
  },
  platform_verified: {
    rank: 5, label: "Platform-verified", status: "Strongly verified · future phase",
    desc: "Direct data from work platforms. Planned for a future phase — not live in this prototype.",
    example: "Consented platform data feed (future)",
    chip: "bg-indigo-50 text-indigo-800 border-indigo-200", dot: "bg-indigo-500", color: "#6366f1",
  },
};

export const STATE_ORDER = Object.keys(EVIDENCE_STATES);
export const rankOf = (state) => EVIDENCE_STATES[state]?.rank || 0;