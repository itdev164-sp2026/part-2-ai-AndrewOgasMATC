import { ProjectForm } from "@/components/project-form"
import { Toaster } from "@/components/ui/sonner"

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground">Create a new project.</p>
      </section>

      <section>
        <ProjectForm />
      </section>

      <Toaster />
    </div>
  )
}
