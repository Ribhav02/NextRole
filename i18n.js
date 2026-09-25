export const LANGUAGES = [
  { code: "en", label: "English", native: "English", speech: "en-IN" },
  { code: "hi", label: "Hindi", native: "हिन्दी", speech: "hi-IN" },
  { code: "ta", label: "Tamil", native: "தமிழ்", speech: "ta-IN" },
  { code: "bn", label: "Bengali", native: "বাংলা", speech: "bn-IN" },
  { code: "mr", label: "Marathi", native: "मराठी", speech: "mr-IN" },
  { code: "te", label: "Telugu", native: "తెలుగు", speech: "te-IN" },
];

const STRINGS = {
  en: {
    dashboard: "Dashboard", history: "My Work", evidence: "Evidence", skills: "Skills",
    assessment: "Assessment", gaps: "Skill Gaps", roles: "Opportunities", learning: "Learning",
    consent: "Consent", workerPortal: "Worker Portal", greeting: "Namaste",
  },
  hi: {
    dashboard: "डैशबोर्ड", history: "मेरा काम", evidence: "प्रमाण", skills: "कौशल",
    assessment: "अभ्यास", gaps: "कौशल अंतर", roles: "अवसर", learning: "सीखना",
    consent: "सहमति", workerPortal: "कर्मचारी पोर्टल", greeting: "नमस्ते",
  },
};

export const t = (lang, key) => STRINGS[lang]?.[key] || STRINGS.en[key] || key;
export const speechLang = (lang) => LANGUAGES.find((l) => l.code === lang)?.speech || "en-IN";