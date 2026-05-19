import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareSupabaseClient } from "@/lib/supabase/middleware"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareSupabaseClient(req, res)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = req.nextUrl

  if (pathname.startsWith("/projects") && !user) {
    const loginUrl = new URL("/login", req.url)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname === "/login" && user) {
    const projectsUrl = new URL("/projects", req.url)
    return NextResponse.redirect(projectsUrl)
  }

  return res
}

export const config = {
  matcher: ["/projects/:path*", "/login"],
}
