"use server"

import prisma from "@/lib/prisma"
import { UIMessage } from "ai"
export async function updateMessages(nodeId: string, message: UIMessage) {
  const content = message.parts.find((part) => part.type === "text")
  await prisma.message.create({
    data: {
      id: message.id,
      nodeId: nodeId,
      role: message.role,
      content: content?.text ?? "No content",
    },
  })
}
