import { NodeType } from "@/app/generated/prisma/enums"
import {
  ChatNodeData,
  ChatNodeDataSchema,
  NodeData,
  TextNodeData,
  TextNodeDataSchema,
  WebNodeData,
  WebNodeDataSchema,
} from "@/components/reactflow/nodes"

export type NodePayload =
  | { type: "text"; data: TextNodeData }
  | { type: "web"; data: WebNodeData }
  | { type: "chat"; data: ChatNodeData }

export const createNodeData = (type: NodeType): NodePayload => {
  switch (type) {
    case "text":
      return { type, data: TextNodeDataSchema.parse({}) }
    case "web":
      return { type, data: WebNodeDataSchema.parse({}) }
    case "chat":
      return { type, data: ChatNodeDataSchema.parse({}) }
    default:
      throw new Error(`Unsupported node type: ${type}`)
  }
}
