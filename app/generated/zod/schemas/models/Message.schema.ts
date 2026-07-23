import * as z from 'zod';
import { RoleSchema } from '../enums/Role.schema';

export const MessageSchema = z.object({
  id: z.string(),
  nodeId: z.string(),
  role: RoleSchema,
  content: z.string(),
  createdAt: z.date(),
});

export type MessageType = z.infer<typeof MessageSchema>;
