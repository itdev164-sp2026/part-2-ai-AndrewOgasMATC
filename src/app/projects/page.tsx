import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

type ProjectRecord = {
  id?: string | number;
  title?: string;
  description?: string;
  status?: string;
};

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "active":
      return "border-transparent bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300";
    case "completed":
      return "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300";
    case "archived":
      return "border-transparent bg-zinc-200 text-zinc-800 dark:bg-zinc-700/40 dark:text-zinc-200";
    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

export default async function ProjectsPage() {
  const { data, error } = await supabase.from("projects").select("*");

  const projects = (data ?? []) as ProjectRecord[];

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          {/* Supabase-backed project records in your dashboard. */}
        </p>
      </section>

      {error ? (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>Unable to load projects</CardTitle>
            <CardDescription>
              There was an issue fetching data from Supabase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive">{error.message}</p>
          </CardContent>
        </Card>
      ) : projects.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No projects yet</CardTitle>
            <CardDescription>
              Add records to the projects table to see them here.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const title = project.title?.trim() || "Untitled Project";
            const description =
              project.description?.trim() || "No description provided.";
            const normalizedStatus = (project.status || "archived").toLowerCase();

            return (
              <Card key={String(project.id ?? `${title}-${index}`)}>
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base">{title}</CardTitle>
                    <Badge className={getStatusBadgeClass(normalizedStatus)}>
                      {normalizedStatus}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}
    </div>
  );
}
