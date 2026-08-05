"use client"
import React, { useMemo } from "react"
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { chatNode } from "./reactflow/nodes"
import { cn } from "@/lib/utils"
import ReactMarkDown from "react-markdown"
import { useReactFlow } from "@xyflow/react"
import { useChat } from "@ai-sdk/react"
import { getNodeChat } from "@/lib/chat-registry"
import remarkGfm from "remark-gfm"

const ChatSidebar = ({ nodeId }: { nodeId: string }) => {
  const { getNode } = useReactFlow()
  const node = getNode(nodeId) as chatNode | undefined

  // same Chat instance the node uses -> live messages, incl. while streaming
  const chat = useMemo(
    () => getNodeChat(nodeId, node?.data.messages ?? []),
    [nodeId]
  )
  const { messages } = useChat({ chat })
  const title = node?.data.title ?? "Chat"

  return (
    <SheetContent className="overflow-y-scroll bg-accent data-[side=right]:sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription className="hidden">
          Chat history in side view
        </SheetDescription>
      </SheetHeader>
      <div
        className={cn(
          "stretch nodrag mx-auto flex w-full flex-col p-4 text-sm select-text",
          messages.length === 0 && "py-24"
        )}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <div
                      key={`${message.id}-${i}`}
                      className={cn(
                        "rounded-xl p-2 whitespace-pre-wrap",
                        message.role === "user" ? "w-2/3 bg-card" : "text-start"
                      )}
                    >
                      <ReactMarkDown remarkPlugins={[remarkGfm]}>
                        {part.text}
                      </ReactMarkDown>
                    </div>
                  )
              }
            })}
          </div>
        ))}
      </div>
    </SheetContent>
  )
}

export default ChatSidebar
