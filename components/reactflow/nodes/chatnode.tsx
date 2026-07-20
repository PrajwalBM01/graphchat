"use client"
import { cn } from "@/lib/utils"
import { useChat } from "@ai-sdk/react"
import { Handle, Node, NodeProps, Position } from "@xyflow/react"
import React, { useState } from "react"

export type chatNode = Node<
  {
    label?: string
  },
  "chat"
>

const chatnode = (props: NodeProps<chatNode>) => {
  const [input, setinput] = useState("")
  const { messages, sendMessage } = useChat()
  return (
    <div className="h-auto w-[250px] rounded-xl bg-accent p-2">
      <Handle type="target" position={Position.Left} id="target-a" />
      <div
        className={cn(
          "stretch mx-auto flex w-full flex-col p-1",
          messages.length === 0 && "py-24"
        )}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "whitespace-pre-wrap",
              message.role === "user" ? "text-end" : "text-start"
            )}
          >
            {message.role === "user" ? "User:" : "AI:"}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message.id}-${i}`}>{part.text}</div>
              }
            })}
          </div>
        ))}
      </div>

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
      <Handle type="source" position={Position.Right} id="source-b" />
    </div>
  )
}

export default chatnode
