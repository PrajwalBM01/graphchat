import * as z from 'zod';

export const RoleSchema = z.enum(['user', 'assistant', 'system'])

export type Role = z.infer<typeof RoleSchema>;