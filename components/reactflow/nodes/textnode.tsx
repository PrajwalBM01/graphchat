"use client"
import React, { useState } from "react"
import { Handle, NodeProps, Position } from "@xyflow/react"
import { Input } from "@/components/ui/input"
import { textNode } from "./index"

const textnode = (props: NodeProps<textNode>) => {
  const [content, setcontent] = useState(props.data.content ?? "")
  return (
    <div className="h-auto min-h-25 w-[250px] rounded-xl bg-accent p-2">
      <Handle type="target" position={Position.Left} id="target-a" />
      <div>
        <textarea
          className="field-sizing-content min-h-25 w-full resize-none overflow-visible outline-0"
          placeholder="Your text goes here"
          value={content}
          onChange={(e) => {
            setcontent(e.target.value)
          }}
        />
      </div>
      <Handle type="source" position={Position.Right} id={"source-b"} />
    </div>
  )
}

export default textnode
