import { BuiltInNode, Edge, Node, NodeTypes } from "@xyflow/react"
import chatnode, { chatNode } from "./chatnode"

export type appNodes = BuiltInNode | chatNode

export const initialNodes: appNodes[] = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  {
    id: "n2",
    type: "chat",
    width:250,
    // height: 400,
    position: { x: 0, y: 100 },
    data: { label: "Node 2" },
  },
  {
    id: "n3",
    type: "chat-node",
    width: 250,
    // height:400,
    position: { x: 500, y: 100 },
    data: { label: "Node 2" },
  },
]

// export const initialEdges: Edge[] = [
//   { id: "n1-n2", source: "n1", target: "n2" },
// ]

export const nodeTypes = {
  "chat": chatnode,
} satisfies NodeTypes
