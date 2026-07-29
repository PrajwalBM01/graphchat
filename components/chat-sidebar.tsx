"use client"
import React from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { ChatNodeData } from "./reactflow/nodes"
import { cn } from "@/lib/utils"
import { UIMessage } from "ai"
import ReactMarkDown from "react-markdown"
import { useReactFlow } from "@xyflow/react"

const ChatSidebar = ({
  messages,
  title,
}: {
  messages: UIMessage[]
  title: string
}) => {
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
        {/* <form
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
        </form> */}
      </div>
      {/* <SheetFooter>
        <Button type="submit">Save changes</Button>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter> */}
    </SheetContent>
  )
}

export default ChatSidebar
