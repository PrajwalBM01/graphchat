import * as z from 'zod';

export const MessageScalarFieldEnumSchema = z.enum(['id', 'nodeId', 'role', 'content', 'createdAt'])

export type MessageScalarFieldEnum = z.infer<typeof MessageScalarFieldEnumSchema>;