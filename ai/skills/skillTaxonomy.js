const skill = (id, name, category, keywords = [], related = []) => ({ id, name, category, keywords, related });
export const SKILLS = [
  skill("last_mile_delivery","Last-mile Delivery","Logistics",["deliver","parcel","courier"],["route_planning"]),
  skill("route_planning","Route Planning","Logistics",["route","maps","navigation","beat"],["last_mile_delivery"]),
  skill("parcel_sorting","Parcel Sorting","Hub Operations",["sort","pincode","pin code","bagging"],["inventory_handling"]),
  skill("inventory_handling","Inventory Handling","Hub Operations",["inventory","stock","warehouse","sku"],["parcel_sorting","loading_unloading"]),
  skill("scanning_systems","Barcode & Scanning Systems","Digital",["barcode","scanner","scan"],["digital_apps"]),
  skill("loading_unloading","Loading & Unloading","Hub Operations",["loading","unload","lifting","truck"],["inventory_handling"]),
  skill("quality_checks","Quality Checks","Operations",["quality","damage","inspect"],["returns_processing"]),
  skill("returns_processing","Returns & RTO Processing","Logistics",["return","rto","reverse pickup"],["last_mile_delivery"]),
  skill("sop_compliance","SOP Compliance","Workplace",["sop","process","rule","checklist","compliance"]),
  skill("customer_handling","Customer Handling","Customer",["customer","complaint","doorstep","caller"],["conflict_resolution"]),
  skill("conflict_resolution","Conflict Resolution","Customer",["angry","calm","dispute","escalat","conflict"],["customer_handling"]),
  skill("cash_handling","Cash & COD Handling","Customer",["cash","cod","upi","payment","billing"]),
  skill("sales_upselling","Sales & Upselling","Customer",["sell","sales","upsell","target"],["customer_handling"]),
  skill("hindi_english_comm","Bilingual Communication","Communication",["hindi","english","bilingual","marathi"]),
  skill("digital_apps","Mobile App Proficiency","Digital",["app","smartphone","otp","mobile"],["scanning_systems"]),
  skill("reporting_basics","Basic Reporting","Digital",["excel","sheet","report","data entry"],["inventory_handling"]),
  skill("time_management","Time Management","Workplace",["on time","schedule","deadline","punctual"]),
  skill("problem_solving","Problem Solving","Workplace",["solve","solution","problem","fix","troubleshoot"]),
  skill("team_coordination","Team Coordination","Leadership",["team","coordinat","colleague","together"],["training_others"]),
  skill("training_others","Training Peers","Leadership",["train","taught","new joinee","mentor","guide"],["team_coordination"]),
  skill("shift_supervision","Shift Supervision","Leadership",["in-charge","incharge","roster","supervised"],["team_coordination"]),
  skill("vehicle_safety","Road & Vehicle Safety","Safety",["helmet","safety","accident","bike","two-wheeler"])
];
export const SKILL_MAP = Object.fromEntries(SKILLS.map((s) => [s.id, s]));
export const CATEGORIES = [...new Set(SKILLS.map((s) => s.category))];
