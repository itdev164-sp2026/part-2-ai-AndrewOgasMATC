import type { ComponentProps } from "react";

export function SkillCard({
  name,
  Icon,
}: Readonly<{
  name: string;
  Icon: React.ComponentType<ComponentProps<"svg">>;
}>) {
  return (
    <div className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
          <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
        </div>
        <h3 className="text-sm font-semibold">{name}</h3>
      </div>
      <p className="text-xs text-muted-foreground">{`Experienced with ${name.toLowerCase()}.`}</p>
    </div>
  );
}
