"use client"

import { Panel } from "@xyflow/react"
import { useSidebar } from "./ui/sidebar"
import { Settings } from "lucide-react"

export const LeftTrigger = () => {
  const { toggleSidebar } = useSidebar()
  return (
    <Panel position="top-left">
      <div
        className="cursor-pointer rounded-md bg-card p-1"
        onClick={toggleSidebar}
      >
        Roots
      </div>
    </Panel>
  )
}

export const RightTrigger = () => {
  const { toggleSidebar } = useSidebar()
  return (
    <Panel position="top-right">
      <div className="bg-card p-1 rounded-full">
        {" "}
        <Settings
          className="cursor-pointer"
          size={20}
          strokeWidth={1.5}
          onClick={toggleSidebar}
        />
      </div>
    </Panel>
  )
}
