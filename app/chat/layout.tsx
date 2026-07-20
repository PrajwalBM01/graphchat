import { AppSidebar } from "@/components/app-provider"
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import prisma from "@/lib/prisma"
import React from "react"

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <main className="h-full w-full">{children}</main>
    </SidebarProvider>
  )
}

export default layout
