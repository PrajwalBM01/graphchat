import * as z from 'zod';

export const CanvasScalarFieldEnumSchema = z.enum(['id', 'title', 'userId', 'createdAt'])

export type CanvasScalarFieldEnum = z.infer<typeof CanvasScalarFieldEnumSchema>;