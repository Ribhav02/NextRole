import { useState } from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/lib/i18n";

export default function LanguageStep({ value, onNext }) {
  const [lang, setLang] = useState(value);
  return (
    <div>
      <Languages className="h-7 w-7 text-brand" />
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">Choose your language</h1>
      <p className="mt-2 text-muted-foreground">अपनी भाषा चुनें · You can speak in this language when adding your work.</p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {LANGUAGES.map((l) => (
          <button key={l.code} onClick={() => setLang(l.code)} className={`rounded-2xl border p-5 text-left transition-all ${lang === l.code ? "border-brand bg-accent ring-2 ring-brand/20" : "bg-white hover:border-foreground/20"}`}>
            <p className="font-heading text-2xl font-semibold">{l.native}</p>
            <p className="mt-1 text-sm text-muted-foreground">{l.label}</p>
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Full screen translation is available in English and Hindi in this prototype; voice input works in all listed languages where your browser supports it.</p>
      <Button onClick={() => onNext(lang)} size="lg" className="mt-8 h-12 w-full rounded-full">Continue</Button>
    </div>
  );
}