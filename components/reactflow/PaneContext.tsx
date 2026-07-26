"use client"
import React, { useEffect, useRef } from "react"
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuGroup,
  ContextMenuLabel,
} from "@/components/ui/context-menu"
import { useReactFlow } from "@xyflow/react"
import { useParams } from "next/navigation"
import { NodeType } from "@/app/generated/prisma/enums"
import { createId } from "@paralleldrive/cuid2"
import { createNodeData } from "@/lib/node-data"
import { insertNode } from "@/actions/nodeActions"

const PaneContext = () => {
  const { id } = useParams<{ id: string }>()
  const { screenToFlowPosition, addNodes } = useReactFlow()
  const flowPositions = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const getPosition = (e: MouseEvent) => {
      e.preventDefault()
      const flowPosition = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      })
      flowPositions.current = { x: flowPosition.x, y: flowPosition.y }
    }
    window.addEventListener("contextmenu", getPosition)

    return () => window.removeEventListener("contextmenu", getPosition)
  }, [])

  const createNode = async (type: NodeType) => {
    const nodeId = createId()
    const data = createNodeData(type)
    console.log(data)
    await insertNode({
      canvasId: id,
      nodeId: nodeId,
      posX: flowPositions.current.x,
      posY: flowPositions.current.y,
      ...data,
    })
    addNodes({
      id: nodeId,
      position: { x: flowPositions.current.x, y: flowPositions.current.y },
      ...data,
    })
  }

  return (
    <ContextMenuContent>
      <ContextMenuGroup>
        <ContextMenuLabel>Create Node</ContextMenuLabel>
        <ContextMenuItem
          onClick={() => {
            createNode("chat")
          }}
        >
          Chat
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            createNode("web")
          }}
        >
          Web
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            createNode("text")
          }}
        >
          Text
        </ContextMenuItem>
      </ContextMenuGroup>
    </ContextMenuContent>
  )
}

export default PaneContext
