// Skill taxonomy — the shared vocabulary for extraction, matching and learning.
// Replace or extend with a national skills framework (e.g. NSQF-aligned) later.
const S = (id, name, category, keywords, related, learn) => ({ id, name, category, keywords, related, learn });
const L = (title, format, minutes, tip) => ({ title, format, minutes, tip });

export const SKILLS = [
  S("last_mile_delivery", "Last-mile Delivery", "Logistics", ["deliver", "parcel", "courier"], ["route_planning"], L("Delivery quality & proof-of-delivery", "Micro-lesson", 10, "Review failed-delivery reasons weekly with your hub.")),
  S("route_planning", "Route Planning", "Logistics", ["route", "maps", "navigation", "beat"], ["last_mile_delivery"], L("Planning multi-stop routes", "Interactive practice", 15, "Plan tomorrow's route the night before and compare actual time.")),
  S("parcel_sorting", "Parcel Sorting", "Hub Operations", ["sort", "pin code", "pincode", "bagging"], ["last_mile_delivery", "inventory_handling"], L("Hub sorting by pin code & zone", "Micro-lesson", 12, "Shadow the morning sort for two shifts.")),
  S("inventory_handling", "Inventory Handling", "Hub Operations", ["inventory", "stock", "warehouse", "sku"], ["parcel_sorting", "loading_unloading"], L("Inventory basics: inbound, count, reconcile", "Video + quiz", 20, "Ask to join one weekly stock count.")),
  S("scanning_systems", "Barcode & Scanning Systems", "Digital", ["barcode", "scanner", "scan"], ["digital_apps"], L("Handheld scanner workflows", "Hands-on practice", 15, "Practise inbound scans with a hub buddy.")),
  S("loading_unloading", "Loading & Unloading", "Hub Operations", ["loading", "unload", "lifting", "truck"], ["inventory_handling"], L("Safe lifting & vehicle loading", "Safety module", 10, "Learn the hub's load-sequence chart.")),
  S("quality_checks", "Quality Checks", "Hub Operations", ["quality", "damage", "inspect"], ["returns_processing"], L("Spotting damage & mis-labels", "Micro-lesson", 10, "Keep a damage log for one week.")),
  S("returns_processing", "Returns & RTO Processing", "Logistics", ["return", "rto", "reverse pickup"], ["last_mile_delivery"], L("Returns and RTO flow", "Micro-lesson", 12, "Follow one RTO parcel end-to-end.")),
  S("sop_compliance", "SOP Compliance", "Workplace", ["sop", "process", "rule", "checklist", "compliance"], [], L("Why SOPs matter at the hub", "Micro-lesson", 8, "Read your hub's SOP board and ask about one step.")),
  S("customer_handling", "Customer Handling", "Customer", ["customer", "complaint", "doorstep", "caller"], ["conflict_resolution", "sales_upselling"], L("Customer-first communication", "Scenario practice", 15, "Note one difficult conversation per week and what worked.")),
  S("conflict_resolution", "Conflict Resolution", "Customer", ["angry", "calm", "dispute", "escalat", "conflict"], ["customer_handling"], L("De-escalating upset customers", "Scenario practice", 15, "Use: listen, acknowledge, act, follow up.")),
  S("cash_handling", "Cash & COD Handling", "Customer", ["cash", "cod", "upi", "payment", "billing"], [], L("COD reconciliation basics", "Micro-lesson", 10, "Reconcile your day's collection before hand-over.")),
  S("sales_upselling", "Sales & Upselling", "Customer", ["sell", "sales", "upsell", "target"], ["customer_handling"], L("Consultative selling", "Video", 12, "Learn three current offers well.")),
  S("hindi_english_comm", "Bilingual Communication", "Customer", ["hindi", "english", "bilingual", "marathi"], [], L("Workplace English for frontline roles", "Audio lessons", 20, "Practise five common customer phrases daily.")),
  S("digital_apps", "Mobile App Proficiency", "Digital", ["app", "smartphone", "otp", "mobile"], ["scanning_systems"], L("Getting more from work apps", "Micro-lesson", 10, "Explore your work app's reports screen.")),
  S("reporting_basics", "Basic Reporting (Sheets/Excel)", "Digital", ["excel", "sheet", "report", "data entry", "logged"], ["inventory_handling"], L("Spreadsheets for daily reports", "Guided practice", 25, "Track your own daily numbers in a simple sheet.")),
  S("time_management", "Time Management", "Workplace", ["on time", "on-time", "schedule", "deadline", "punctual", "slot"], [], L("Planning a high-volume shift", "Micro-lesson", 8, "Set two checkpoints in every shift.")),
  S("problem_solving", "Problem Solving", "Workplace", ["solve", "solution", "problem", "fix", "troubleshoot"], [], L("Structured problem solving on the floor", "Scenario practice", 12, "For each issue, write: what, why, what I did.")),
  S("team_coordination", "Team Coordination", "Leadership", ["team", "coordinat", "colleague", "together"], ["training_others"], L("Working across shifts", "Micro-lesson", 10, "Run one shift hand-over briefing.")),
  S("training_others", "Training Peers", "Leadership", ["train", "taught", "new joinee", "mentor", "guide"], ["team_coordination"], L("How to buddy a new joinee", "Micro-lesson", 10, "Volunteer as buddy for the next new joinee.")),
  S("shift_supervision", "Shift Supervision", "Leadership", ["in-charge", "incharge", "roster", "led a team", "supervised"], ["team_coordination", "training_others"], L("First-time shift lead essentials", "Cohort programme", 45, "Ask to cover a shift lead's break with guidance.")),
  S("vehicle_safety", "Road & Vehicle Safety", "Safety", ["helmet", "safety", "accident", "bike", "two-wheeler"], [], L("Defensive riding refresher", "Safety module", 15, "Do a 2-minute vehicle check every morning.")),
];

export const SKILL_MAP = Object.fromEntries(SKILLS.map((s) => [s.id, s]));
export const CATEGORIES = [...new Set(SKILLS.map((s) => s.category))];