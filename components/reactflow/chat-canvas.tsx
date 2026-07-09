"use client"
import "@xyflow/react/dist/style.css"

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"
import { useTheme } from "next-themes"
import { initialNodes, nodeTypes } from "./nodes"

const page = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const { resolvedTheme } = useTheme()
  return (
    <ReactFlow
      nodes={nodes}
      // edges={edges}
      nodeTypes={nodeTypes}
      fitView
      onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      colorMode={resolvedTheme === "dark" ? "dark" : "light"}
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  )
}

export default page
