import Logo from "@/components/shared/Logo";

export default function LandingFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-start md:justify-between md:px-8">
        <Logo />
        <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
          Hackathon prototype. Skill extraction, speech recognition and scenario analysis are AI-assisted and can be imperfect; workers review results before saving. Uploaded documents are not automatically authenticated. There are no live integrations with private work platforms — platform-verified evidence is a future phase. Recommendations support, and never replace, human decisions.
        </p>
      </div>
    </footer>
  );
}