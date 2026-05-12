"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema, type Project } from "@/lib/schemas"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createProject } from "@/app/actions"

export function ProjectForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: { title: "", description: "", status: "active" },
  })

  const onSubmit = async (values: Project) => {
    try {
      const result = await createProject(values)

      if (result?.success) {
        toast.success("Project created")
        reset()
        return
      }

      toast.error(result?.error ?? "Failed to create project")
    } catch (err) {
      console.error(err)
      toast.error("An unexpected error occurred")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field>
        <FieldLabel>Title</FieldLabel>
        <FieldContent>
          <Input placeholder="Project title" {...register("title")} />
          <FieldError errors={errors.title ? [errors.title as any] : undefined} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <FieldContent>
          <Textarea placeholder="Project description" {...register("description")} />
          <FieldError errors={errors.description ? [errors.description as any] : undefined} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Status</FieldLabel>
        <FieldContent>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={errors.status ? [errors.status as any] : undefined} />
        </FieldContent>
      </Field>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          Create Project
        </Button>
      </div>
    </form>
  )
}

// follow project convention: named export only
