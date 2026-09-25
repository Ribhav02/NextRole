export default function Logo({ dark = false, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-8 w-8 items-end justify-center gap-[3px] rounded-lg bg-brand p-1.5">
        <span className="h-2 w-1 rounded-sm bg-white/55" />
        <span className="h-3.5 w-1 rounded-sm bg-white/80" />
        <span className="h-5 w-1 rounded-sm bg-white" />
      </div>
      <span className={`font-heading text-lg font-semibold tracking-tight ${dark ? "text-white" : "text-foreground"}`}>
        Next<span className="text-brand">Role</span>
      </span>
    </div>
  );
}