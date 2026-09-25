const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, LogOut, ArrowLeftRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Logo from "@/components/shared/Logo";

export default function AppShell({ items, dark = false, portalLabel, switchTo, banner, children }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const muted = dark ? "text-white/60 hover:bg-white/5 hover:text-white" : "text-muted-foreground hover:bg-secondary hover:text-foreground";

  const sidebar = (
    <div className={`flex h-full flex-col ${dark ? "bg-ink text-white" : "bg-white"}`}>
      <div className="px-6 pb-6 pt-6">
        <Link to="/"><Logo dark={dark} /></Link>
        <span className={`mt-4 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${dark ? "bg-white/10 text-white/70" : "bg-accent text-accent-foreground"}`}>{portalLabel}</span>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
        {items.map((i) => {
          const active = i.end ? pathname === i.to : pathname.startsWith(i.to);
          const on = dark ? "bg-white/10 text-white" : "bg-primary text-primary-foreground";
          return (
            <Link key={i.to} to={i.to} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active ? on : muted}`}>
              <i.icon className="h-[18px] w-[18px] shrink-0" />
              <span className="flex flex-col leading-tight">{i.label}{i.sub && <span className="text-[11px] font-normal opacity-60">{i.sub}</span>}</span>
            </Link>
          );
        })}
      </nav>
      <div className={`space-y-0.5 border-t px-3 py-4 ${dark ? "border-white/10" : "border-border"}`}>
        <Link to={switchTo.to} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium ${muted}`}><ArrowLeftRight className="h-4 w-4" />{switchTo.label}</Link>
        <button onClick={() => db.auth.logout("/")} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium ${muted}`}><LogOut className="h-4 w-4" />Log out</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className={`fixed inset-y-0 left-0 z-30 hidden w-64 border-r lg:block ${dark ? "border-white/5" : "border-border"}`}>{sidebar}</aside>
      <header className={`sticky top-0 z-20 flex items-center justify-between border-b px-4 py-3 lg:hidden ${dark ? "border-white/10 bg-ink" : "border-border bg-white/90 backdrop-blur"}`}>
        <Link to="/"><Logo dark={dark} /></Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><button aria-label="Open menu" className={`rounded-lg p-2 ${dark ? "text-white" : ""}`}><Menu className="h-5 w-5" /></button></SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">{sidebar}</SheetContent>
        </Sheet>
      </header>
      <main className="lg:pl-64">
        {banner}
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">{children}</div>
      </main>
    </div>
  );
}