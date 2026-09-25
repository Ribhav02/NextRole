import { Switch } from "@/components/ui/switch";

export default function ConsentToggle({ title, text, checked, onChange, disabled }) {
  return (
    <label className={`flex items-start gap-4 rounded-2xl border bg-card p-5 ${disabled ? "opacity-50" : "cursor-pointer"}`}>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} className="mt-1" />
    </label>
  );
}