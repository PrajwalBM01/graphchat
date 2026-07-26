"use client"
import React, { ChangeEvent, useRef, useState } from "react"
import { Handle, NodeProps, Position } from "@xyflow/react"
import { Input } from "@/components/ui/input"
import { textNode } from "./index"
import { updateTextNode } from "@/actions/nodeActions"

const textnode = (props: NodeProps<textNode>) => {
  const [content, setcontent] = useState(props.data.content)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const onInputChange = (
    event: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>
  ) => {
    console.log(event)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setcontent(event.target.value)
    timerRef.current = setTimeout(() => {
      updateTextNode({
        nodeId: props.id,
        content: { title: props.data.title, content: content },
      })
    }, 2000)
  }
  return (
    <div className="h-auto min-h-25 w-[450px] rounded-xl bg-accent p-2">
      <div>
        <textarea
          className="field-sizing-content min-h-25 w-full resize-none overflow-visible outline-0"
          placeholder="Your text goes here"
          value={content}
          onChange={onInputChange}
        />
      </div>
      <Handle type="source" position={Position.Right} id={"source-b"} />
    </div>
  )
}

export default textnode
