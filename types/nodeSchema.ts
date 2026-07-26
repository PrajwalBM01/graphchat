import { NodeType } from "@/app/generated/prisma/enums"
import { z } from "zod"
import type { Node } from "@/app/generated/prisma/client"
import {
  ChatNodeDataSchema,
  NodeDataTypes,
  TextNodeDataSchema,
  WebNodeDataSchema,
} from "@/components/reactflow/nodes/index"

// export const webFetchStatus = z.enum(["read", "pending", "failed"])
// export type Webstatus = z.infer<typeof webFetchStatus>

// export const nodeDataSchemas = {
//   chat: z.object({
//     title: z.string(),
//     nodeData: z.object({ model: z.string() }).nullable,
//   }),
//   text: z.object({
//     title: z.string(),
//     nodeData: z.object({ content: z.string }).nullable(),
//   }),
//   web: z.object({
//     title: z.string(),
//     nodeData: z.object({
//       url: z.url(),
//       status: webFetchStatus,
//       content: z.string(),
//       fetchedAt: z.date(),
//     }).nullable,
//   }),
// } satisfies Record<NodeType, z.ZodType>

// export type NodeDataMap = {
//   [K in NodeType]: z.infer<(typeof nodeDataSchemas)[K]>
// }

// export const nodeDefaults: { [K in NodeType]: () => NodeDataMap[K] } = {
//   chat: () => ({
//     title: "Untitled Chat",
//     nodeData: { model: "gemini-2.5-flash" },
//   }),
//   text: () => ({ title: "Untitled Text", nodeData: null }),
//   web: () => ({ title: "Untitled Web", nodeData: null }),
// }

export const UpdateNodePosSchema = z.object({
  nodeId: z.string(),
  posX: z.number(),
  posY: z.number(),
})

export type updateNodePosType = z.infer<typeof UpdateNodePosSchema>

const baseNodeFields = {
  canvasId: z.string(),
  nodeId: z.string(),
  posX: z.number(),
  posY: z.number(),
}

export const CreateNodeSchema = z.discriminatedUnion("type", [
  z.object({
    ...baseNodeFields,
    type: z.literal(NodeType.text),
    data: TextNodeDataSchema,
  }),
  z.object({
    ...baseNodeFields,
    type: z.literal(NodeType.web),
    data: WebNodeDataSchema,
  }),
  z.object({
    ...baseNodeFields,
    type: z.literal(NodeType.chat),
    data: ChatNodeDataSchema,
  }),
])

export type createNodeType = z.infer<typeof CreateNodeSchema>

export const updateTextNodeSchema = z.object({
  nodeId: z.string(),
  content: TextNodeDataSchema,
})

export type updateTextNodeType = z.infer<typeof updateTextNodeSchema>

export const DeleteNodeSchema = z.object({
  nodeId: z.string(),
})

export type deleteNodeType = z.infer<typeof DeleteNodeSchema>
