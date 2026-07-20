import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

type Params = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params
  const canvasData = await prisma.canvas.findFirstOrThrow({
    where: { id: id },
    include: {
      edges: true,
      nodes: { include: { messages: { orderBy: { createdAt: "asc" } } } },
    },
  })
  console.log(typeof canvasData)
  return NextResponse.json(
    {
      message: canvasData,
    },
    { status: 200 }
  )
}
