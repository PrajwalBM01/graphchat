import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import prisma from "@/lib/prisma"

export async function AppSidebar() {
  const canvases = await prisma.canvas.findMany()
  //   console.log(canvases)
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTrigger className="border border-red-600" />
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 p-2"></SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
