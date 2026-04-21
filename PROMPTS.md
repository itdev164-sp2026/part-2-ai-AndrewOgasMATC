# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**

Look at my project structure and tell me:
1. What framework and version am I using?
2. What styling solution is configured?
3. What components exist so far?
Then add a small "Setup verified ✓" badge to the bottom of the home page.

**What happened:**
> It responded with:
"
Summary

- Framework: Next.js — version from package.json: ^15.3.0 (Next 15)
- Styling: Tailwind CSS — configured (see globals.css:1) and tailwindcss devDependency (^4.1.0)
- Components: - Header (header.tsx)
    - ModeToggle (mode-toggle.tsx)
    - ThemeProvider (theme-provider.tsx)
"

> This all seems to be correct
> It also added the "Setup verified ✓" badge on the bottom of the homepage.

### Prompt 2
**What I asked:**

Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
Replace the current homepage content with a "Developer Profile" page for me.
It should include:
- My name: Andrew Ogas
- A short bio (1-2 sentences about being a web development student)
- A "Skills" section that displays at least 6 skills in a responsive
  Tailwind CSS grid (use cards with icons from lucide-react)

Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
the src/components/ folder.

**What happened:**
> It created two new components: skill-card.tsx and skills-grid.tsx
> In skills-grid.tsx it created an array to supply a series of skills-card components with information
> It then removed much of the homepage and added the skills-grid to the homepage

### Reflection
> It's an interesting thing seeing the AI modify code and create files.
> I'm not entirely sure how I feel about it. It seems easy, or at least easy for small changes.
> I don't however have a sense of ownership over what the AI created.

## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**

 Using the shadcn sidebar components that are now in my src/components/ui/ folder,
 create a professional, collapsible dashboard layout. It should include:

 1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
   - Overview (use the Home icon from lucide-react)
   - Projects (use the FolderOpen icon)
   - Settings (use the Settings icon)

 2. A top navigation area with breadcrumbs showing the current page.

 3. A main content area that wraps the existing page content.

 4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

 Important: Preserve the Developer Profile content from Activity 1 in
 src/app/page.tsx — it should appear in the main content area of the new layout.
 Keep the dark mode toggle working.

**What happened:**

> The AI created an app-sidebar.tsx file and a dashboard-topbar.tsx file
> The created files seem to be correctly implemented and working correctly.

### Prompt 2

**What I asked:**

 The sidebar does not close on mobile when clicking the Overview menu item
 because it links to "/" which is already the current page. Fix this so the
 sidebar closes on mobile when any menu item is clicked, even if it links
 to the current page.

**What happened:**

> The AI edited the page to set the sidebar to closed when the Overview link was used.

### Reflection

> The use of the AI "Agent" still seems confusing and troubling.
> I'm not entirely sure what it's doing, as I'm not familiar with shadcn.
> Nothing seems to be broken from Activity-1

## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches all records from the "projects" table in Supabase
2. Displays them in a professional layout using shadcn/ui Card components
   (run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge
4. The status badge should be color-coded:
   - "active" = green
   - "completed" = blue
   - "archived" = gray

Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.

**What happened:**

> Everything seems to have worked correctly.
> There didn't appear to be any problems.

### Prompt 2

**What I asked:**

The breadcrumb in src/app/layout.tsx always shows "Overview" because the page
name is hardcoded. Extract the breadcrumb into its own client component at
src/components/breadcrumb-nav.tsx that uses usePathname() from next/navigation
to display the correct page name. Map "/" to "Overview", "/projects" to
"Projects", and "/settings" to "Settings". Keep "ITDEV-164" as the first
breadcrumb segment. Then update layout.tsx to use the new component.


**What happened:**

> Everything seems to have worked as intended.
> No need for corrections.

### Reflection

> How does fetching data on the server feel different from the useEffect
> pattern you used in Web Programming 1? What are the advantages you
> noticed? Did anything surprise you about how simple server-side
> data fetching is in the App Router?

> I don't have a whole lot of thoughts on the difference regarding
> the fetching of data, considering I've only done fetching form a
> database once. As far as advantages, it seems like a lot less work
> getting things running.