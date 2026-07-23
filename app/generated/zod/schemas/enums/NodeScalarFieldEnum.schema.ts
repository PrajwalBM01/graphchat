import * as z from 'zod';

export const NodeScalarFieldEnumSchema = z.enum(['id', 'canvasId', 'type', 'positionX', 'positionY', 'title', 'data', 'isolated'])

export type NodeScalarFieldEnum = z.infer<typeof NodeScalarFieldEnumSchema>;