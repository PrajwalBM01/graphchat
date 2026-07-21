"use client"
import { Input } from "@/components/ui/input"
import { Handle, NodeProps, Position } from "@xyflow/react"
import { webNode } from "./index"
import { useState } from "react"

const webnode = (props: NodeProps<webNode>) => {
  const [input, setinput] = useState(props.data.nodeData.url ?? "")
  return (
    <div className="h-auto w-[250px] rounded-xl bg-accent p-2">
      <Handle type="target" position={Position.Left} id="target-a" />

      <textarea
        className="field-sizing-content min-h-[100px] w-full resize-none overflow-visible outline-0"
        placeholder="Paste the web link here"
        value={input}
        onChange={(e) => {
          setinput(e.target.value)
        }}
      />

      <Handle type="source" position={Position.Right} id={"source-b"} />
    </div>
  )
}

export default webnode
