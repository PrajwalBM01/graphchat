"use server"
import prisma from "@/lib/prisma"

export async function updateNodePos(
  nodeId: string,
  posX: number,
  posY: number
) {
  await prisma.node.update({
    where: { id: nodeId },
    data: {
      positionX: posX,
      positionY: posY,
    },
  })
}
