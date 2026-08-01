import * as z from 'zod';

export const EdgeScalarFieldEnumSchema = z.enum(['id', 'canvasId', 'sourceNodeId', 'targetNodeId', 'branchPointMessageId', 'branchMessage'])

export type EdgeScalarFieldEnum = z.infer<typeof EdgeScalarFieldEnumSchema>;