const KEY = "nextrole_demo";

export const isDemoMode = () => localStorage.getItem(KEY) === "ramesh";
export const enterDemo = (to = "/worker") => { localStorage.setItem(KEY, "ramesh"); window.location.href = to; };
export const exitDemo = (to = "/") => { localStorage.removeItem(KEY); window.location.href = to; };