import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import ChatCanvas from "./canvas-view"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const canvasData = await prisma.canvas.findUnique({
    where: { id },
    include: {
      nodes: { include: { messages: { orderBy: { createdAt: "asc" } } } },
      edges: true,
    },
  })
  console.log(canvasData)
  if (!canvasData) notFound()
  return <ChatCanvas nodes={canvasData.nodes} edges={canvasData.edges} />
}

export default page
