"use client"
import "@xyflow/react/dist/style.css"

import {
  Background,
  Controls,
  MiniMap,
  OnNodeDrag,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react"
import { useTheme } from "next-themes"
import { nodeTypes } from "../../components/reactflow/nodes"
import type {
  Node as DbNode,
  Edge as DbEdge,
} from "@/app/generated/prisma/client"
import { NodeCombined } from "@/app/chat/[id]/canvas-view"
import { updateNodePos } from "./nodeActions"

const nodeDragStop: OnNodeDrag = (event, node) => {
  updateNodePos(node.id, node.position.x, node.position.y)
}

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
    data: { id: n.id, title: n.title, messages: n.messages, nodeData: n.data },
  }))

  const rfedges = dbedges.map((e) => ({
    id: e.id,
    source: e.sourceNodeId,
    target: e.targetNodeId,
  }))
  const [nodes, , onNodesChange] = useNodesState(rfnodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(rfedges)
  const reactFlowinstance = useReactFlow()

  const { resolvedTheme } = useTheme()
  return (
    <ReactFlow
      debug={true}
      onPaneContextMenu={(e) => {
        console.log(e)
        e.preventDefault()
      }}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      onNodesChange={onNodesChange}
      onNodeDragStop={nodeDragStop}
      colorMode={resolvedTheme === "dark" ? "dark" : "light"}
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  )
}

export default page
