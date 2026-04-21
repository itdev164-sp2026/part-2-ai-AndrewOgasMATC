"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const PAGE_LABELS: Record<string, string> = {
  "/": "Overview",
  "/projects": "Projects",
  "/settings": "Settings",
};

export function BreadcrumbNav() {
  const pathname = usePathname() || "/";
  const pageLabel = PAGE_LABELS[pathname] ?? "Overview";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathname === "/" ? (
            <BreadcrumbPage>ITDEV-164</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/">ITDEV-164</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{pageLabel}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
