"use client"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import dynamic from "next/dynamic"
import { use } from "react"
import type {
  Node as DbNode,
  Edge as DbEdge,
  Message as DbMessage,
} from "@/app/generated/prisma/client"
import { Edge, ReactFlowProvider } from "@xyflow/react"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuGroup,
} from "@/components/ui/context-menu"
import { appNodes } from "@/components/reactflow/nodes"
import { Sheet } from "lucide-react"
const Rfcanvas = dynamic(() => import("@/app/chat/chat-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-dvh w-full items-center justify-center bg-background">
      Loading
    </div>
  ),
})

export default function ChatCanvas({
  nodes,
  edges,
}: {
  nodes: appNodes[]
  edges: Edge[]
}) {
  const { state } = useSidebar()

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="h-dvh w-full">
          {state === "collapsed" && (
            <span className="absolute z-100 p-2">
              <SidebarTrigger />
            </span>
          )}
          <ReactFlowProvider>
            <Rfcanvas rfnodes={nodes} rfedges={edges} />
          </ReactFlowProvider>
        </div>
      </ContextMenuTrigger>
    </ContextMenu>
  )
}
