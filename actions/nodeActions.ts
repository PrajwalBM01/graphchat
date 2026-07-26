"use server"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { NodeType } from "../app/generated/prisma/enums"
import {
  CreateNodeSchema,
  createNodeType,
  DeleteNodeSchema,
  deleteNodeType,
  UpdateNodePosSchema,
  updateNodePosType,
  updateTextNodeSchema,
  updateTextNodeType,
} from "@/types/nodeSchema"

export async function insertNode(data: createNodeType) {
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

//update
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

export async function updateTextNode(data: updateTextNodeType) {
  const validField = updateTextNodeSchema.safeParse(data)

  if (!validField.success) {
    throw new Error("invalid input data")
  }

  await prisma.node.update({
    where: { id: validField.data.nodeId },
    data: {
      data: validField.data.content,
    },
  })
}

//delete
export async function deleteNode(data: deleteNodeType) {
  const validateFileds = DeleteNodeSchema.safeParse(data)

  if (!validateFileds.success) {
    throw new Error("invlaid input data")
  }

  await prisma.node.delete({ where: { id: validateFileds.data.nodeId } })
}
