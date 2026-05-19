"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderOpen, Settings, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { signOut } from "@/app/actions"
import type { User } from "@supabase/supabase-js"

export function AppSidebar({ user }: { user?: User | null }) {
  const pathname = usePathname() || "/"
  const { isMobile, open, setOpenMobile } = useSidebar()

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <div className="flex h-full flex-col">
        <SidebarHeader className="h-14 px-2 py-3">
          {open ? (
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">Dashboard</span>
            </div>
          ) : null}
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/"}>
                <Link href="/" className="flex w-full items-center gap-2" onClick={handleMenuClick}>
                  <Home className="h-4 w-4" />
                  <span>Overview</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/projects/")}>
                <Link href="/projects/" className="flex w-full items-center gap-2" onClick={handleMenuClick}>
                  <FolderOpen className="h-4 w-4" />
                  <span>Projects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/settings")}>
                <Link href="/settings" className="flex w-full items-center gap-2" onClick={handleMenuClick}>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="mt-auto p-2">
          <div className="flex flex-col items-center justify-center gap-2">
            {user ? (
              <div className="w-full">
                <Button variant="ghost" size="sm" onClick={async () => await signOut()}>
                  <div className="flex items-center gap-2">
                    <LogOut className="size-4" />
                    <span>Sign Out</span>
                  </div>
                </Button>
              </div>
            ) : null}

            <div className="flex items-center justify-center">
              <ModeToggle />
            </div>
          </div>
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}

