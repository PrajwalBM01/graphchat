import * as z from 'zod';

export const CanvasScalarFieldEnumSchema = z.enum(['id', 'title', 'createdAt'])

export type CanvasScalarFieldEnum = z.infer<typeof CanvasScalarFieldEnumSchema>;