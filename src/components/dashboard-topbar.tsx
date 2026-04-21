"use client";

import type { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardTopbar({ breadcrumb }: { breadcrumb: ReactNode }) {

  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-5" />

        {breadcrumb}

        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}