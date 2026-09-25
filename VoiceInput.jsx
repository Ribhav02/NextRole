import { useRef, useState } from "react";
import { Mic } from "lucide-react";

// Browser speech recognition (Web Speech API). Swap for a server STT service later.
export default function VoiceInput({ lang = "en-IN", onTranscript, label = "Speak", large = false }) {
  const [listening, setListening] = useState(false);
  const recRef = useRef(null);
  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

  if (!SR) return <p className="text-xs text-muted-foreground">Voice input isn't supported in this browser — try Chrome, or type instead.</p>;

  const toggle = () => {
    if (listening) { recRef.current?.stop(); return; }
    const rec = new SR();
    rec.lang = lang;
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (e) => onTranscript(Array.from(e.results).slice(e.resultIndex).map((r) => r[0].transcript).join(" "));
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };

  const size = large ? "px-5 py-3 text-base" : "px-3.5 py-2 text-sm";
  const tone = listening ? "bg-red-50 text-red-700 border-red-200" : "bg-white hover:bg-secondary border-border";
  return (
    <button type="button" onClick={toggle} className={`inline-flex items-center gap-2 rounded-full border font-medium transition-colors ${size} ${tone}`}>
      {listening ? (
        <>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          Listening… tap to stop
        </>
      ) : (
        <><Mic className={large ? "h-5 w-5 text-brand" : "h-4 w-4 text-brand"} />{label}</>
      )}
    </button>
  );
}