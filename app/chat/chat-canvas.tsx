"use client"
import "@xyflow/react/dist/style.css"
import {
  Background,
  Controls,
  Edge,
  MiniMap,
  OnConnect,
  OnConnectEnd,
  OnNodeDrag,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type IsValidConnection,
} from "@xyflow/react"
import { useTheme } from "next-themes"
import { appNodes, nodeTypes } from "../../components/reactflow/nodes"
import {
  deleteNode,
  insertNode,
  updateNodePos,
} from "../../actions/nodeActions"
import PaneContext from "@/components/reactflow/PaneContext"
import { useCallback } from "react"
import { createId } from "@paralleldrive/cuid2"
import { createNodeData } from "@/lib/node-data"
import { useParams } from "next/navigation"
import { insertEdge } from "@/actions/edgeActions"
import { cycleCheck } from "@/lib/canvasHelper"
import { toast } from "sonner"

const handleNodeDrag: OnNodeDrag = (event, node) => {
  updateNodePos({
    nodeId: node.id,
    posX: node.position.x,
    posY: node.position.y,
  })
}

// const handleEdgeDrop: OnConnectEnd = (event, connectionState) => {
//   console.log("event", event)
//   console.log("coneectionState", connectionState)
// }

const page = ({
  rfnodes,
  rfedges,
}: {
  rfnodes: appNodes[]
  rfedges: Edge[]
}) => {
  const { id } = useParams<{ id: string }>()
  const [nodes, setNodes, onNodesChange] = useNodesState(rfnodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(rfedges)
  const { resolvedTheme } = useTheme()
  const { screenToFlowPosition, getEdges } = useReactFlow()

  const handleEdgeDrop: OnConnectEnd = useCallback(
    async (event, connectionState) => {
      if (!connectionState.isValid && connectionState.fromNode) {
        const nodeId = createId()
        const edgeId = createId()
        const { clientX, clientY } =
          "changedTouches" in event ? event.changedTouches[0] : event
        const nodeData = createNodeData("chat")
        const positions = screenToFlowPosition({
          x: clientX,
          y: clientY,
        })

        await insertNode({
          nodeId: nodeId,
          canvasId: id,
          posX: positions.x,
          posY: positions.y,
          ...nodeData,
        })

        setNodes((nodes) =>
          nodes.concat({ id: nodeId, position: positions, ...nodeData })
        )

        await insertEdge({
          id: edgeId,
          canvasId: id,
          sourceNodeId: connectionState.fromNode.id,
          targetNodeId: nodeId,
        })
        setEdges((eds) =>
          eds.concat({
            id: edgeId,
            source: connectionState.fromNode.id,
            target: nodeId,
            className: "custom-edge",
          })
        )
      }
    },
    [screenToFlowPosition]
  )

  const handleEdgeConnection: OnConnect = useCallback(
    async (connection) => {
      const { source, target } = connection
      const edges = getEdges()
      const formsCycle = cycleCheck(source, target, edges)
      const edgeId = createId()

      if (!source || !target) return

      if (source === target) {
        toast("Self Connection Not allowed")
        return
      }

      if (edges.some((e) => e.source === source && e.target === target)) {
        toast("No duplicate connection")
        return
      }

      if (formsCycle) {
        toast("Can not form a loop")
        return
      }

      await insertEdge({
        id: edgeId,
        canvasId: id,
        sourceNodeId: source,
        targetNodeId: target,
      })

      setEdges((eds) =>
        eds.concat({
          id: edgeId,
          source: source,
          target: target,
          className: "custom-edge",
        })
      )
    },
    [getEdges]
  )

  return (
    <ReactFlow
      debug={true}
      onNodeContextMenu={(e) => {
        e.preventDefault()
      }}
      onConnectEnd={handleEdgeDrop}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDragStop={handleNodeDrag}
      onNodesDelete={(nodes) => {
        nodes.map((n) => {
          deleteNode({ nodeId: n.id })
        })
      }}
      onConnect={handleEdgeConnection}
      colorMode={resolvedTheme === "dark" ? "dark" : "light"}
      // isValidConnection={validateConnection}
    >
      <PaneContext />
      <MiniMap />
      <Background />
      <Controls />
    </ReactFlow>
  )
}

export default page
