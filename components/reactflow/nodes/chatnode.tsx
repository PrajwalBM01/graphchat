"use client"
import { cn } from "@/lib/utils"
import { UIMessage, useChat } from "@ai-sdk/react"
import { Handle, Node, NodeProps, Position } from "@xyflow/react"
import React, { useState } from "react"
import type { Message as DbMessage } from "@/app/generated/prisma/client"
import type { chatNode } from "./index"
import ReactMarkDown from "react-markdown"
import { ChatOnFinishCallback, DefaultChatTransport } from "ai"
import { updateMessages } from "@/actions/chatActions"
import { useCanSelect } from "@/hooks/use-select"
import { PanelRight, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChatSidebar } from "@/components/reactflow/SidebarContext"

//helpers
export const toUiMessage = (messages: DbMessage[]): UIMessage[] =>
  messages?.map((m) => ({
    id: m.id,
    role: m.role,
    parts: [{ type: "text", text: m.content }],
  }))

const chatnode = (props: NodeProps<chatNode>) => {
  const [input, setinput] = useState("")
  const { openSidebar } = useChatSidebar()
  const { messages, sendMessage } = useChat({
    id: props.id,
    messages: toUiMessage(props.data.messages),
    // onFinish: ({ message, messages, finishReason }) => {
    //   messages.slice(-2).map((msg, _i) => updateMessages(props.id, msg))
    // },
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest: ({ id, messages }) => {
        return {
          body: {
            nodeId: props.id,
            message: messages[messages.length - 1],
          },
        }
      },
    }),
  })

  return (
    <div
      className={cn(
        "group flex h-auto w-[550px] cursor-auto flex-col gap-2 rounded-xl bg-accent shadow-[1px_1px_7px_4px_rgba(0,0,0,0.1)]"
      )}
    >
      <div className="custom_drag_handle relative flex h-12 cursor-grab items-center justify-between rounded-t-xl bg-accent p-4 transition-colors duration-300 group-hover:bg-black/10 group-hover:dark:bg-background/40">
        <Handle
          type="target"
          position={Position.Left}
          id="target-a"
          isConnectableStart={false}
        />
        <div className="rounded-lg border p-1">{props.data.title}</div>
        <div className="flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <button
            type="button"
            title="Sidebar"
            className="nodrag"
            onClick={() => openSidebar(props.id)}
          >
            <PanelRight className="cursor-pointer" size={20} />
          </button>
          <div title="Delete">
            <Trash className="cursor-pointer stroke-destructive" size={20} />
          </div>
        </div>
        <Handle type="source" position={Position.Right} id="source-b" />
      </div>
      <div
        className={cn(
          "stretch nodrag mx-auto flex w-full flex-col p-1 select-text",
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
            {/* {message.role === "user" ? "User:" : "AI:"} */}
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
                      <ReactMarkDown>{part.text}</ReactMarkDown>
                      {/* {part.text} */}
                    </div>
                  )
              }
            })}
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage({ text: input })
            setinput("")
          }}
        >
          <input
            className="w-full rounded-md border p-1 text-sm"
            value={input}
            placeholder="Say something..."
            onChange={(e) => setinput(e.currentTarget.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default chatnode
