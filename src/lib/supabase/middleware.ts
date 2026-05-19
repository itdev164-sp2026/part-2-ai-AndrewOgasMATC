import { createServerClient } from "@supabase/ssr"
import type { NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export function createMiddlewareSupabaseClient(req: NextRequest, res: NextResponse) {
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => {
        const all = req.cookies.getAll()
        return all.map((c) => ({ name: c.name, value: c.value }))
      },
      setAll: (cookiesToSet, headers) => {
        cookiesToSet.forEach((c) => {
          // NextResponse.cookies.set accepts similar option shape
          res.cookies.set(c.name, c.value, c.options as any)
        })

        if (headers) {
          Object.entries(headers).forEach(([key, val]) => {
            res.headers.set(key, val)
          })
        }
      },
    },
  })
}
