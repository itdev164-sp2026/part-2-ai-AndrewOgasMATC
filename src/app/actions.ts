"use server"

import { projectSchema, type Project } from "@/lib/schemas"
import { supabase } from "@/lib/supabase"

export async function createProject(data: Project) {
  try {
    const parsed = projectSchema.parse(data)

    const { data: inserted, error } = await supabase.from("projects").insert(parsed).select()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: inserted }
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message }
    }

    return { success: false, error: "Unknown error" }
  }
}
