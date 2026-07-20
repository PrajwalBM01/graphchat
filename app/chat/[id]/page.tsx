"use client"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import dynamic from "next/dynamic"
import { use } from "react"

const Rfcanvas = dynamic(() => import("@/components/reactflow/chat-canvas"), {
  ssr: false,
  loading: () => <div className="h-dvh w-full bg-background flex justify-center items-center">Loading</div>,
})

export default function ChatCanvas({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { state } = useSidebar()
  console.log(id)
  return (
    <div className="h-dvh w-full">
      {state === "collapsed" && (
        <span className="absolute z-100 p-2">
          <SidebarTrigger />
        </span>
      )}
      <Rfcanvas />
    </div>
  )
}
