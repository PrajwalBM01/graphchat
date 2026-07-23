"use server"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { NodeType } from "../generated/prisma/enums"
import {
  CreateNodeSchema,
  createNodeType,
  DeleteNodeSchema,
  deleteNodeType,
  UpdateNodePosSchema,
  updateNodePosType,
} from "@/types/nodeSchema"

export async function InsertNode(data: createNodeType) {
  const validFields = CreateNodeSchema.safeParse(data)
  console.log(data)
  console.log(validFields)

  if (!validFields.success) {
    throw new Error("invalid input data")
  }

  await prisma.node.create({
    data: {
      id: validFields.data.nodeId,
      canvasId: validFields.data.canvasId,
      type: validFields.data.type,
      positionX: validFields.data.posX,
      positionY: validFields.data.posY,
      data: validFields.data.data,
    },
  })
}

export async function updateNodePos(data: updateNodePosType) {
  console.log(data)
  const validateFileds = UpdateNodePosSchema.safeParse(data)
  console.log(validateFileds)

  if (!validateFileds.success) {
    throw new Error("invalid input data")
  }

  await prisma.node.update({
    where: { id: validateFileds.data.nodeId },
    data: {
      positionX: validateFileds.data.posX,
      positionY: validateFileds.data.posY,
    },
  })
}

export async function deleteNode(data: deleteNodeType) {
  const validateFileds = DeleteNodeSchema.safeParse(data)

  if (!validateFileds.success) {
    throw new Error("invlaid input data")
  }

  await prisma.node.delete({ where: { id: validateFileds.data.nodeId } })
}
