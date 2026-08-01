"use server"

import prisma from "@/lib/prisma"
import { CreateEdgeSchema, CreateEdgeType } from "@/types/edgeSchema"

export async function insertEdge(data: CreateEdgeType) {
  const validFields = CreateEdgeSchema.safeParse(data)

  console.log(data)
  console.log(validFields)

  if (!validFields.success) {
    throw new Error("invlaid input data")
  }

  await prisma.edge.create({
    data: validFields.data,
  })
}
