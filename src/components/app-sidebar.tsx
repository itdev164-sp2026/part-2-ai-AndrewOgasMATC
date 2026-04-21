"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderOpen, Settings } from "lucide-react"
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

export function AppSidebar() {
  const pathname = usePathname() || "/"
  const { isMobile, setOpenMobile } = useSidebar()

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <div className="flex h-full flex-col">
        <SidebarHeader className="px-2 py-3">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">Dashboard</span>
          </div>
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
              <SidebarMenuButton asChild isActive={pathname.startsWith("/projects")}>
                <Link href="/projects" className="flex w-full items-center gap-2" onClick={handleMenuClick}>
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
          <div className="flex items-center justify-center">
            <ModeToggle />
          </div>
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}

