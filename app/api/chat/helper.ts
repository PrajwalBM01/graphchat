import { Edge } from "@/app/generated/prisma/client"
import { TextNodeDataSchema } from "@/components/reactflow/nodes"
import prisma from "@/lib/prisma"
import { UIMessage } from "ai"

export async function loadMessages(nodeId: string): Promise<UIMessage[]> {
  const messages = await prisma.message.findMany({
    where: { nodeId: nodeId },
  })

  return messages.map((message) => {
    return {
      id: message.id,
      role: message.role,
      parts: [{ type: "text", text: message.content }],
    }
  })
}

const getAncestors = (nodeId: string, dbEdges: Edge[]): string[] => {
  const parentsMap = new Map<string, string[]>()

  for (const edge of dbEdges) {
    if (!parentsMap.has(edge.targetNodeId)) {
      parentsMap.set(edge.targetNodeId, [])
    }

    parentsMap.get(edge.targetNodeId)?.push(edge.sourceNodeId)
  }

  const visted = new Set<string>()
  const ancestors: string[] = []

  function dfs(current: string) {
    const parents = parentsMap.get(current) ?? []

    for (const parent of parents) {
      if (visted.has(parent)) continue

      visted.add(parent)
      ancestors.push(parent)

      dfs(parent)
    }
  }
  dfs(nodeId)
  return ancestors
}

export async function getContext(nodeId: string) {
  const nodeDetails = await prisma.node.findUnique({
    where: { id: nodeId },
  })

  const dbEdges = await prisma.edge.findMany({
    where: { canvasId: nodeDetails?.canvasId },
  })

  const ancestors = getAncestors(nodeId, dbEdges)

  const connectedNodes = await prisma.node.findMany({
    where: {
      id: {
        in: ancestors,
      },
    },
    select: {
      id: true,
      type: true,
      data: true,
    },
  })

  for (const node of connectedNodes) {
    if (node.type === "text") {
      const data = TextNodeDataSchema.parse(node.data)
      return `<source type=${node.type}>${data.content}</source> The user is in a canvas where nodes have thier own context, the above provided source is a text node with some content, use it as referance.`
    }
  }
  return `You are a helpfull assistant.`
}
