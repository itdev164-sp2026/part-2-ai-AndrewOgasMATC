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

## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
with the following fields:

- title: string, minimum 3 characters, with a custom error message
  "Title must be at least 3 characters"
- description: string, minimum 10 characters, with a custom error message
  "Description must be at least 10 characters"
- status: enum with values "active", "completed", "archived"

Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**

> The AI seems to have created the schema correctly.
> Everything looks correct and everything functions as intended.
> No changes had to be made to what the AI generated.

### Prompt 2

**What I asked:**

Using the Zod schema from src/lib/schemas.ts, do the following:

1. Create a form component at src/components/project-form.tsx that:
   - Is a Client Component ("use client") because it uses react-hook-form hooks
   - Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
   - Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
   - Uses shadcn/ui Input for title, Textarea for description, and Select for status
   - Shows inline error messages under each field when validation fails
   - Has a "Create Project" submit button
   - Shows a sonner toast notification on successful submission

2. Create a Server Action at src/app/actions.ts that:
   - Has "use server" at the top of the file
   - Accepts the validated form data
   - Validates it again with the Zod schema (server-side validation)
   - Inserts the validated data into the Supabase "projects" table
   - Returns a success or error response

3. Create a new page at src/app/projects/new/page.tsx that renders
   the project form within the dashboard layout.

4. Add a "New Project" button to the existing projects page
   (src/app/projects/page.tsx) that links to /projects/new.

Use @workspace to match the existing project styling.

**What happened:**

> The AI created all the requested files and connecth them up appropriately.
> It set up the server side validation as well as client side validation 
> through project-form.tsx. Both use the schema set up earlier. Everything
> looks to be done correctly.

### Reflection

> Using Zod, I'm assuming that much of the normal setup for input checking
> has been set up behind the scenes. This makes it much easier to set up
> input valudation using a schema we set up. Being that the schema is used
> to define the input validation test, it makes it easier to get things 
> right and avoid bad data.

## Activity 6: Deployment, Webhooks, & AI-Testing

### Prompt 1

**What I asked:**

I have a Next.js app with Supabase Auth. Using @workspace context to
understand the app structure, write an End-to-End (E2E) test file at
tests/auth.spec.ts using Playwright.

The tests should verify:

1. LOGIN PAGE VISIBLE: Navigate to /login and confirm the login form
   is visible (check for email input, password input, and submit button).

2. REDIRECT AFTER LOGIN: After a successful login with valid credentials,
   the user is redirected to the dashboard or projects page.

3. SIDEBAR NAVIGATION: After login, verify that the sidebar navigation
   links are visible: "Overview", "Projects", and "Settings".

Requirements:
- Use role-based locators (getByRole, getByLabel, getByText) instead of
  CSS selectors or test IDs. This makes tests more accessible and resilient
  to UI changes.
- Add clear test descriptions that explain what each test verifies.
- Handle the async nature of navigation and page loads with proper
  Playwright waiting strategies.
- Read test credentials from process.env.TEST_USER_EMAIL and
  process.env.TEST_USER_PASSWORD. Do not hardcode credentials. If those
  variables are not set, the credentialed tests should skip with a clear
  message rather than fail.

**What happened:**

> Copilot generated tests that mostly worked. It checked for email and
> password fields, a login button, and that the page logs in. It then
> checked for the navigation links "Overview", "Projects", and "Settings".
> Everything but the check for "Projects" worked.

### Prompt 2

**What I asked:**

Here's the error I'm getting while trying run a test on the site. What sorts of solutions are available for this:

1) tests\auth.spec.ts:43:7 › Auth — credentialed flows › SIDEBAR NAVIGATION: sidebar links visible after login 

    Error: expect(locator).toBeVisible() failed

    Locator: getByRole('link', { name: /projects/i })
    Expected: visible
    Error: strict mode violation: getByRole('link', { name: /projects/i }) resolved to 2 elements:
        1) <a href="/projects" data-size="default" data-active="false" data-sidebar="menu-button" data-slot="sidebar-menu-button" class="peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-for…>…</a> aka locator('ul').getByRole('link', { name: 'Projects' })
        2) <span role="link" aria-current="page" aria-disabled="true" data-slot="breadcrumb-page" class="font-normal text-foreground">Projects</span> aka getByLabel('breadcrumb').getByRole('link', { name: 'Projects' })

    Call log:
      - Expect "toBeVisible" with timeout 5000ms
      - waiting for getByRole('link', { name: /projects/i })


      59 |
      60 |     await expect(overview).toBeVisible()
    > 61 |     await expect(projects).toBeVisible()
         |                            ^
      62 |     await expect(settings).toBeVisible()
      63 |   })
      64 | })
        at C:\Users\Andrew\Documents\Class_Files_2026-Spring\ITDEV-164\Repos\part-2-ai-AndrewOgasMATC\tests\auth.spec.ts:61:28

**What happened:**

> Copilot generated a solution that involved adding a tag in the 
> code to let the check know about the conflicting elements. After
> this, all of the tests pass.

### Reflection

> Creating code with Copilot then using Copilot to fix problems with
> the code seems odd. It's presumably the same model, now just focused
> on a different task. Perhaps in the future, the systems that 
> interface with the model will change to do more steps to review what
> it generates.

### Course Reflection

> The agentic workflow is definitely different. It seems almost magic.
> Almost. There were definitely odd quirks and mistakes it made. At
> the same time, when trying to learn, it definitley seems like a 
> perfect way to prevent any learning. I worry about my skill being
> able to know what the code is doing, as I don't have to do the work.
> A muscle that isn't used atrophes. A memory not visited, is forgotten.
> Will I be able to keep a handle on what the AI is doing if I don't
> keep using my coding skills.

> At the same time, this seems to be the direction the world is headed.
> It is definitely exciting to see the AI systems generate a solution
> and things happen on screen. Code is produced quicker and things get
> done faster. These systems aren't going away, but what they develop
> into is anyone's guess.