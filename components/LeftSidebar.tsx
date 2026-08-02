import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "./ui/sidebar"

const LeftSidebar = () => {
  return (
    <Sidebar side="left" variant="floating">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 p-2"></SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default LeftSidebar
