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
import type {
  Node as DbNode,
  Edge as DbEdge,
} from "@/app/generated/prisma/client"
import { NodeCombined } from "@/app/chat/[id]/canvas-view"
const page = ({
  dbnodes,
  dbedges,
}: {
  dbnodes: NodeCombined[]
  dbedges: DbEdge[]
}) => {
  const rfnodes = dbnodes.map((n) => ({
    id: n.id,
    type: n.type,
    position: { x: n.positionX, y: n.positionY },
    data: { id: n.id, title: n.title, messages: n.messages },
  }))

  const rfedges = dbedges.map((e) => ({
    id: e.id,
    source: e.sourceNodeId,
    target: e.targetNodeId,
  }))
  const [nodes, , onNodesChange] = useNodesState(rfnodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(rfedges)

  const { resolvedTheme } = useTheme()
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
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
