import { SkillsGrid } from "@/components/skills-grid";

export default function DeveloperProfilePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Andrew Ogas</h1>
        <p className="text-muted-foreground">
          Web development student focused on modern full-stack JavaScript
          workflows and building AI-assisted UIs.
        </p>
      </section>

      <SkillsGrid />
    </div>
  );
}
