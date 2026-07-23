import * as z from 'zod';

export const CanvasSchema = z.object({
  id: z.string(),
  title: z.string().nullish(),
  createdAt: z.date(),
});

export type CanvasType = z.infer<typeof CanvasSchema>;
