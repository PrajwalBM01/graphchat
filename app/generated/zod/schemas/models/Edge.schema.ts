import * as z from 'zod';

export const EdgeSchema = z.object({
  id: z.string(),
  canvasId: z.string(),
  sourceNodeId: z.string(),
  targetNodeId: z.string(),
  branchPointMessageId: z.string().nullish(),
});

export type EdgeType = z.infer<typeof EdgeSchema>;
