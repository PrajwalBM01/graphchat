"use client"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import dynamic from "next/dynamic"
import { use } from "react"
import type {
  Node as DbNode,
  Edge as DbEdge,
  Message as DbMessage,
} from "@/app/generated/prisma/client"
const Rfcanvas = dynamic(() => import("@/components/reactflow/chat-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-dvh w-full items-center justify-center bg-background">
      Loading
    </div>
  ),
})

export type NodeCombined = { messages: DbMessage[] } & DbNode

export default function ChatCanvas({
  nodes,
  edges,
}: {
  nodes: NodeCombined[]
  edges: DbEdge[]
}) {
  const { state } = useSidebar()

  return (
    <div className="h-dvh w-full">
      {state === "collapsed" && (
        <span className="absolute z-100 p-2">
          <SidebarTrigger />
        </span>
      )}
      <Rfcanvas dbnodes={nodes} dbedges={edges} />
    </div>
  )
}
