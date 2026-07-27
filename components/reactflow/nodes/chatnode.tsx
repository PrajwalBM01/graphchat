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

//helpers
const toUiMessage = (messages: DbMessage[]): UIMessage[] =>
  messages?.map((m) => ({
    id: m.id,
    role: m.role,
    parts: [{ type: "text", text: m.content }],
  }))

const chatnode = (props: NodeProps<chatNode>) => {
  const select = useCanSelect()
  const [input, setinput] = useState("")
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
        "h-auto w-[500px] rounded-xl bg-accent p-2 shadow-[1px_1px_7px_4px_rgba(0,0,0,0.1)]"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="target-a"
        isConnectableStart={false}
      />
      <div
        className={cn(
          "stretch mx-auto flex w-full flex-col p-1",
          select && "nodrag cursor-auto select-text",
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
