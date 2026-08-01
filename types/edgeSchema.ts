import { z } from "zod"

export const CreateEdgeSchema = z.object({
  id: z.string(),
  canvasId: z.string(),
  sourceNodeId: z.string(),
  targetNodeId: z.string(),
  branchPointMessageId: z.string().optional().nullable(),
  branchMessage: z.string().optional().nullable(),
})

export type CreateEdgeType = z.infer<typeof CreateEdgeSchema>
