import { useState } from "react";
import { Mic, FileText, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

const MODES = [
  { id: "voice", icon: Mic, title: "Speak", text: "Tell us about your work by voice. Best if typing is hard." },
  { id: "form", icon: FileText, title: "Simple forms", text: "Short, clear questions you fill in." },
  { id: "visual", icon: LayoutGrid, title: "Visual cards", text: "Tap pictures and cards; minimal reading." },
];

export default function ModeStep({ value, onNext, onBack }) {
  const [mode, setMode] = useState(value);
  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold tracking-tight">How would you like to use NextRole?</h1>
      <p className="mt-2 text-muted-foreground">You can switch anytime.</p>
      <div className="mt-8 space-y-3">
        {MODES.map((m) => (
          <button key={m.id} onClick={() => setMode(m.id)} className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all ${mode === m.id ? "border-brand bg-accent ring-2 ring-brand/20" : "bg-white hover:border-foreground/20"}`}>
            <div className="rounded-xl bg-white p-3 shadow-sm"><m.icon className="h-6 w-6 text-brand" /></div>
            <div><p className="font-heading text-lg font-semibold">{m.title}</p><p className="text-sm text-muted-foreground">{m.text}</p></div>
          </button>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack} className="h-12 rounded-full">Back</Button>
        <Button size="lg" onClick={() => onNext(mode)} className="h-12 flex-1 rounded-full">Continue</Button>
      </div>
    </div>
  );
}