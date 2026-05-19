# AI Agent Instructions — ITDEV-164 Course Project

You are assisting a student building an AI-native full-stack web application.

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + Shadcn/ui
- **Icons:** Lucide React
- **Backend/Auth:** Supabase (added in later assignments)

## Architecture Rules

1. **Prefer React Server Components (RSC).** Only add `"use client"` when the component requires browser APIs, event handlers, or hooks (`useState`, `useEffect`, etc.).
2. **Use Tailwind utility classes for all styling.** Do not create CSS modules or use inline `style` objects.
3. **Use the `cn()` helper** from `@/lib/utils` when merging conditional class names.
4. **Follow the path alias.** Import from `@/components`, `@/lib`, etc. — never use relative paths like `../../`.

## Folder Structure

```
src/
├── app/            # Routes and layouts (App Router)
│   ├── layout.tsx  # Root layout
│   ├── page.tsx    # Home page
│   └── globals.css # Tailwind directives and theme tokens
├── components/     # Reusable UI components
└── lib/            # Utilities and shared logic
```

## Code Style

- Name component files in **kebab-case** (e.g., `mode-toggle.tsx`).
- Export components as **named exports** (not default), except for page/layout files.
- Keep components small and composable.
- Use `Lucide React` for all icons — do not install other icon libraries.

## When Generating Code

- Always include proper TypeScript types — avoid `any`.
- Validate data at system boundaries using **Zod** schemas (added in Assignment 4).
- Write self-documenting code. Only add comments where the logic is non-obvious.

## Activity 5: Securing the App with Supabase Auth

### Prompt 1

**What I asked:**

Implement a complete email/password authentication flow for this Next.js 15
App Router project using @supabase/ssr. Here is what I need:

1. SUPABASE CLIENTS: Create server-side Supabase client utilities in
   src/lib/supabase/ that work correctly with Next.js cookies. I need
   separate clients for Server Components, Server Actions, and Middleware. 
   There should be two files, server.ts and middleware.ts, in src/lib/supabase/ 
   for all of this when this task is done.

2. LOGIN PAGE: Create a page at src/app/(auth)/login/page.tsx with a
   shadcn/ui card-based login form. It should support both "Sign In"
   and "Sign Up" (toggle between them or use tabs). Handle the auth
   via Server Actions, not client-side fetch.

3. MIDDLEWARE: Create a middleware.ts file at src/middleware.ts (next to
   the app directory — Next.js looks for middleware as a sibling of app)
   that:
   - Refreshes the user's auth session on every request
   - Protects the /projects routes — redirect unauthenticated users to /login
   - Allows unauthenticated access to /login
   - Uses supabase.auth.getUser() (NOT getSession()) for verification

4. SIGN OUT: Add a "Sign Out" button to the existing sidebar component
   (src/components/app-sidebar.tsx) that calls a Server Action to sign
   the user out and redirect to /login. The button must only render
   when an authenticated user is present — pass the user as a prop from
   the root layout (which will need to fetch it via the server Supabase
   client) and gate the Sign Out UI on that prop.

5. UPDATE DATA QUERIES: Modify the projects page and the create-project
   Server Action to use the authenticated Supabase client so that RLS
   policies filter data per user.

Use @workspace to understand the existing project structure. Do not remove
or break existing functionality — integrate auth around it.

**What happened:**
> Copilot did much of what was requested, but there were many problems.
> Copilot attempted to make more files than what was needed and often named
> what should have been server.ts to index.ts. Often it did not create 
> src/lib/supabase/middleware.ts and I had to edit the prompt to somewhat
> force it to do so. Alongside this, I kept getting an issue where
> Copilot wanted to use createMiddlewareClient, createServerActionClient, 
> and createServerComponentClient. All of these are depricated in Supabase
> and unavailabe in Supabase SSR.

### Prompt 2

**What I asked:**

The code in middleware.ts and server.ts it attempting imports from an older 
version of supabase. Supabase ssr does not have createMiddlewareClient, 
createServerActionClient, or createServerComponentClient as they are depricated. 
Fix this, and don't add any aditional files.

**What happened:**

> This prompt fixed the issues with Copilot using the depricated parts of 
> Supabase. Things seemed to be working, and much of the site now worked as
> intended. However, while the login was being sent to the server and a response
> was recieved, the cookies needed to actually be logged in were not stored.
> Fortunately, Supabase had a warning in the console for this, naming the specific
> function needed, and I used a third prompt to fix the problem.

### Prompt 3

**What I asked:**

The login is communcating with supabase, but the page does not change to a logged 
in state. At the same time, there's a warning that cookies might not be stored 
propperly. Make sure that once a login is requested and a response is returned, 
the logged in state is stored properly.

**What happened:**

> Copilot was able to add the proper setall function to the login, such that a 
> user would be seen as logged in and have proper access to the site. I was able
> to check that information was restricted to logged in users and access was 
> limited to the appropriate information for each user.

### Reflection

> This activity seemed to illustrate some of the issues with agentic workflows.
> While what Copilot was generating was valid in older versions of Supabase,
> and thus was probably overrepresented in the training data, it didn't work in
> Supabase SSR. I had to research the problem, discovering Supabase's instructions
> for migrating from Auth Helpers to SSR. This illustrates the need for a good
> foundation of knowledge of the underlying systems and design patterns. On top of
> this, the failure of Copilot to properly store cookies and my need to go back in
> and get it to include neccessary functions shows how AI systems can act weird.
> In fact, much of what Copilot was trying to do in this activity was often odd.
