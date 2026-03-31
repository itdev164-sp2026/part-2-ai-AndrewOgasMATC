import {
  Code,
  Rocket,
  Layout,
  Server,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { SkillCard } from "./skill-card";

const skills: ReadonlyArray<{ name: string; Icon: React.ComponentType<any> }> = [
  { name: "HTML & CSS", Icon: Code },
  { name: "JavaScript", Icon: Rocket },
  { name: "React", Icon: Layout },
  { name: "Next.js", Icon: Server },
  { name: "TypeScript", Icon: Cpu },
  { name: "UI Design", Icon: ShieldCheck },
];

export function SkillsGrid() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ name, Icon }) => (
          <SkillCard key={name} name={name} Icon={Icon} />
        ))}
      </div>
    </section>
  );
}
