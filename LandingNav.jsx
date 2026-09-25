import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import { enterDemo } from "@/lib/demo";

export default function LandingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#evidence" className="hover:text-foreground">Evidence model</a>
          <a href="#value" className="hover:text-foreground">Workers & employers</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/employer" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block px-3">Employer</Link>
          <Link to="/worker" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block px-3">Worker</Link>
          <Button onClick={() => enterDemo("/worker")} className="rounded-full bg-brand text-white hover:bg-brand/90">Ramesh Demo</Button>
        </div>
      </div>
    </header>
  );
}