export const EVIDENCE_STATES = {
  self_declared: { rank: 1, label: "Self-declared", description: "Stated by the worker and not independently verified." },
  document_supported: { rank: 2, label: "Document-supported", description: "Supported by a document or uploaded work artifact." },
  verified: { rank: 3, label: "Verified", description: "Confirmed by an authorized manager, employer, or verifier." },
  demonstrated: { rank: 4, label: "Demonstrated", description: "Shown through a practical assessment." },
  platform_verified: { rank: 5, label: "Platform-verified", description: "Supported by a trusted connected work platform." },
};
export const STATE_ORDER = Object.keys(EVIDENCE_STATES);
export const rankOf = (state) => EVIDENCE_STATES[state]?.rank || 0;
