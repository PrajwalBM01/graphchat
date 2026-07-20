import History from "@/app/chat/History"
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
  const canvases = await prisma.canvas.findMany({
    orderBy: { createdAt: "asc" },
  })
  console.log(canvases)
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarTrigger className="" />
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 p-2">
        <History canvases={canvases} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
