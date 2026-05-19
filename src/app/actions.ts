"use server"

import { projectSchema, type Project } from "@/lib/schemas"
import { createServerActionSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function createProject(data: Project) {
  try {
    const parsed = projectSchema.parse(data)

    const supabase = createServerActionSupabaseClient()

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

export async function signIn({ email, password }: { email: string; password: string }) {
  const supabase = createServerActionSupabaseClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { success: false, error: error.message }
  }

  redirect("/projects")
}

export async function signUp({ email, password }: { email: string; password: string }) {
  const supabase = createServerActionSupabaseClient()

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return { success: false, error: error.message }
  }

  redirect("/projects")
}

export async function signOut() {
  const supabase = createServerActionSupabaseClient()

  await supabase.auth.signOut()

  redirect("/login")
}
