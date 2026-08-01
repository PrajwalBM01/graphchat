import { TextNodeDataSchema } from "@/components/reactflow/nodes"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { nodeId } = body

  let context = ``

  console.log("nodeId", nodeId)

  const nodeDetials = await prisma.node.findUnique({
    where: { id: nodeId },
  })

  console.log("nodedetials", nodeDetials)

  const dbEdges = await prisma.edge.findMany({
    where: { canvasId: nodeDetials?.canvasId },
  })

  console.log("dbedges", dbEdges)

  const parentsMap = new Map<string, string[]>()
  const cutoffs = new Map<
    string,
    { messageId: string | null; highlight: string | null } | null
  >()
  for (const edge of dbEdges) {
    if (!parentsMap.has(edge.targetNodeId)) {
      parentsMap.set(edge.targetNodeId, [])
    }

    parentsMap.get(edge.targetNodeId)?.push(edge.sourceNodeId)
    if (edge.branchPointMessageId) {
      cutoffs.set(edge.sourceNodeId, {
        messageId: edge.branchPointMessageId,
        highlight: edge.branchMessage,
      })
    } else {
      cutoffs.set(edge.sourceNodeId, null)
    }
  }
  console.log("parentsmap", parentsMap, cutoffs)

  const visted = new Set<string>()
  const ancestors: string[] = []

  function dfs(current: string) {
    const parents = parentsMap.get(current) ?? []

    for (const parent of parents) {
      if (visted.has(parent)) continue

      visted.add(parent)

      dfs(parent)
      ancestors.push(parent)
    }
  }
  dfs(nodeId)

  console.log("dfs", visted, ancestors)

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
      messages: { orderBy: { createdAt: "asc" } },
    },
  })

  const byid = new Map(connectedNodes.map((n) => [n.id, n]))

  for (const id of ancestors) {
    const node = byid.get(id)
    console.log("node", node)
    if (!node) continue
    if (node.type === "text") {
      const data = TextNodeDataSchema.parse(node.data)
      context += ` <source type=${node.type}>${data.content}</source>`
    }
    if (node.type === "chat") {
      let chatContent = ``
      const cutoff = cutoffs.get(node.id) ?? null
      const msgs = cutoff
        ? node.messages.slice(
            0,
            node.messages.findIndex((msg) => msg.id === cutoff.messageId) + 1
          )
        : node.messages

      for (const msg of msgs) {
        const content =
          msg.role === "assistant"
            ? msg.content
                .replace(/['"]\s*\+\s*[\n\r]*\s*['"]/g, "")
                .replace(/^'|'$/g, "")
                .replace(/###\s*/g, "")
                .replace(/\*\*/g, "")
                .replace(/\*\s+/g, "")
                .replace(/[\n\r]+/g, " ")
                .replace(/\s+/g, " ")
                .trim()
            : msg.content
        chatContent += `<block role=${msg.role}>${content}</block>`
        if (cutoff) {
          chatContent += `<highlight>${cutoff.highlight}</highlight>`
        }
      }

    }
  }
  console.log("after all/")
  // console.log("connectednodes", connectedNodes)
  // console.log("messages", connectedNodes[0].messages)
  // console.log("incoming", nodeDetials?.incoming)

  // const branchcutoof = nodeDetials?.incoming.find(
  //   (message) => message.branchPointMessageId !== null
  // )

  // console.log("cutof", branchcutoof)

  // const finalMesage = connectedNodes[0].messages.findIndex(
  //   (message) => message.id === branchcutoof?.branchPointMessageId
  // )

  // console.log("finalmes index", finalMesage + 1)
  // const finalMesages = connectedNodes[0].messages.slice(0, finalMesage + 1)

  // console.log("finalmessags", finalMesages)

  return NextResponse.json({ message: `Hello` }, { status: 200 })
}
