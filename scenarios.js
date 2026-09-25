// Practical scenario bank. Each scenario targets specific skills and carries a rubric
// used by the scenario-analysis service.
export const SCENARIOS = [
  {
    id: "late_delivery", title: "The late parcel", icon: "MessageSquare", minutes: 3,
    context: "You arrive two hours late with a birthday gift parcel. The customer is upset and says she will file a complaint.",
    prompt: "What would you say and do, step by step?",
    target_skills: ["customer_handling", "conflict_resolution", "problem_solving"],
    rubric: "Apologises sincerely, stays calm, explains honestly without blaming, checks parcel condition, offers a practical remedy or escalation path, follows up on root cause.",
  },
  {
    id: "inventory_mismatch", title: "The count doesn't match", icon: "Boxes", minutes: 4,
    context: "At the hub, the system shows 120 parcels in a bag, but you count only 114 before dispatch.",
    prompt: "What steps would you take before the vehicle leaves?",
    target_skills: ["inventory_handling", "scanning_systems", "sop_compliance", "problem_solving"],
    rubric: "Recounts and re-scans, checks nearby bags/areas, does not dispatch silently, records the discrepancy, informs supervisor per SOP.",
  },
  {
    id: "new_joinee", title: "First-day buddy", icon: "Users", minutes: 3,
    context: "A new joinee is starting on your route tomorrow and looks nervous. Your supervisor asks you to guide them.",
    prompt: "How would you help them in their first week?",
    target_skills: ["training_others", "team_coordination", "sop_compliance"],
    rubric: "Explains key steps simply, demonstrates then lets them try, covers safety and SOP, checks understanding, stays patient, reports progress.",
  },
  {
    id: "cod_shortfall", title: "Cash is short", icon: "Wallet", minutes: 3,
    context: "At end of day your COD collection is ₹450 less than the app shows.",
    prompt: "What would you do?",
    target_skills: ["cash_handling", "sop_compliance", "problem_solving"],
    rubric: "Rechecks each delivery and UPI receipts, does not hide it, reports honestly to supervisor, follows reconciliation process.",
  },
  {
    id: "damaged_return", title: "Damaged on return", icon: "PackageX", minutes: 3,
    context: "A customer hands you a return, but the box is torn and the product looks used.",
    prompt: "How would you handle this at the doorstep?",
    target_skills: ["quality_checks", "returns_processing", "customer_handling"],
    rubric: "Inspects politely, documents with photos, follows return-acceptance rules, explains next steps clearly, avoids argument.",
  },
];

export const scenarioForSkill = (skillId) => SCENARIOS.find((s) => s.target_skills.includes(skillId));