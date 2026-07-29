"use client"
import { createContext, useContext } from "react"

type ChatSidebarCtx = {
  openNodeId: string | null
  openSidebar: (nodeId: string) => void
  closeSidebar: () => void
}

export const ChatSidebarContext = createContext<ChatSidebarCtx | null>(null)

export const useChatSidebar = () => {
  const ctx = useContext(ChatSidebarContext)
  if (!ctx) {
    throw new Error("useChatSidebar must be used inside <ChatSidebarContext>")
  }
  return ctx
}
