import { Eye, Hand, Minimize2, Scale, Accessibility, Info } from "lucide-react";

const ITEMS = [
  { icon: Eye, title: "Explainable", text: "Present, missing and to-assess skills — never a black-box score." },
  { icon: Hand, title: "Worker agency", text: "Workers review AI-extracted skills and control sharing." },
  { icon: Minimize2, title: "Data minimisation", text: "Private files, contact hidden by default, consent per field." },
  { icon: Scale, title: "Fairness", text: "Language-neutral scenario scoring and blind talent review." },
  { icon: Accessibility, title: "Accessible", text: "Voice-first input, Indian languages, large clear type." },
  { icon: Info, title: "Honest AI", text: "No claims of perfect prediction, speech or document checks." },
];

export default function Principles() {
  return (
    <section className="border-y bg-white">
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-10 px-5 py-20 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {ITEMS.map((i) => (
          <div key={i.title} className="flex gap-4">
            <i.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <div>
              <h4 className="font-heading font-semibold">{i.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}