import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

async function nextCookiesGetAll() {
  const cookieStore = await cookies()
  const all = cookieStore.getAll()
  return all.map((c: any) => ({ name: c.name, value: c.value }))
}

async function nextCookiesSetAll(cookiesToSet: any[], _headers?: Record<string, string>) {
  const cookieStore = await cookies()

  for (const c of cookiesToSet) {
    try {
      // Try the name/value/options signature
      // `cookieStore.set` accepts either (name, value, options) or an object in different Next.js versions
      // cast to any to avoid TS issues across versions.
      ;(cookieStore as any).set(c.name, c.value, c.options as any)
    } catch (err) {
      try {
        ;(cookieStore as any).set({ name: c.name, value: c.value, ...(c.options ?? {}) })
      } catch (err2) {
        console.error("Failed to set cookie", c.name, err2)
      }
    }
  }
}

export function createServerComponentSupabaseClient() {
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: nextCookiesGetAll,
    },
  })
}

export function createServerActionSupabaseClient() {
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: nextCookiesGetAll,
      setAll: nextCookiesSetAll,
    },
  })
}
