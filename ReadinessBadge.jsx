import { READINESS } from "@/lib/intelligence/matching";

export default function ReadinessBadge({ readiness }) {
  const r = READINESS[readiness];
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${r.cls}`}>{r.label}</span>;
}