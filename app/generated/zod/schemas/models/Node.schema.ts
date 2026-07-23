import * as z from 'zod';
import { NodeTypeSchema } from '../enums/NodeType.schema';

export const NodeSchema = z.object({
  id: z.string(),
  canvasId: z.string(),
  type: NodeTypeSchema,
  positionX: z.number(),
  positionY: z.number(),
  title: z.string().nullish(),
  data: z.unknown().refine((val) => { const getDepth = (obj: unknown, depth: number = 0): number => { if (depth > 10) return depth; if (obj === null || typeof obj !== 'object') return depth; const values = Object.values(obj as Record<string, unknown>); if (values.length === 0) return depth; return Math.max(...values.map(v => getDepth(v, depth + 1))); }; return getDepth(val) <= 10; }, "JSON nesting depth exceeds maximum of 10").nullish(),
  isolated: z.boolean(),
});

export type NodeType = z.infer<typeof NodeSchema>;
