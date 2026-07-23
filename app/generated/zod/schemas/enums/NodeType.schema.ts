import * as z from 'zod';

export const NodeTypeSchema = z.enum(['chat', 'text', 'web'])

export type NodeType = z.infer<typeof NodeTypeSchema>;