"use client"
import "@xyflow/react/dist/style.css"
import {
  Background,
  Controls,
  Edge,
  MiniMap,
  OnNodeDrag,
  OnNodesDelete,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"
import { useTheme } from "next-themes"
import { appNodes, nodeTypes } from "../../components/reactflow/nodes"
import { deleteNode, updateNodePos } from "./nodeActions"
import PaneContext from "@/components/reactflow/PaneContext"

const handleNodeDrag: OnNodeDrag = (event, node) => {
  updateNodePos({
    nodeId: node.id,
    posX: node.position.x,
    posY: node.position.y,
  })
}

const page = ({
  rfnodes,
  rfedges,
}: {
  rfnodes: appNodes[]
  rfedges: Edge[]
}) => {
  const [nodes, , onNodesChange] = useNodesState(rfnodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(rfedges)
  const { resolvedTheme } = useTheme()

  return (
    <ReactFlow
      debug={true}
      onNodeContextMenu={(e) => {
        e.preventDefault()
        console.log(e)
      }}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      onNodesChange={onNodesChange}
      onNodeDragStop={handleNodeDrag}
      onNodesDelete={(nodes) => {
        nodes.map((n) => {
          deleteNode({ nodeId: n.id })
        })
      }}
      colorMode={resolvedTheme === "dark" ? "dark" : "light"}
    >
      <PaneContext />
      <MiniMap />
      <Background />
      <Controls />
    </ReactFlow>
  )
}

export default page
