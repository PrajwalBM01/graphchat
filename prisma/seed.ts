import { Prisma, PrismaClient } from "@/app/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import "dotenv/config"

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  await prisma.edge.deleteMany()
  await prisma.message.deleteMany()
  await prisma.node.deleteMany()
  await prisma.canvas.deleteMany()

  const canvas1 = await prisma.canvas.create({
    data: {},
  })

  const rootChat = await prisma.node.create({
    data: {
      canvasId: canvas1.id,
      type: "chat",
      positionX: 100,
      positionY: 200,
      title: "Main discussion",
      messages: {
        create: [
          {
            id: "msg_root_1",
            role: "user",
            content: "Explain transformers in simple terms.",
          },
          {
            id: "msg_root_2",
            role: "assistant",
            content:
              "Transformers are neural networks that process sequences using attention — each token can look at every other token to decide what matters.",
          },
          {
            id: "msg_root_3",
            role: "user",
            content: "How does attention scale with sequence length?",
          },
          {
            id: "msg_root_4",
            role: "assistant",
            content:
              "Standard self-attention scales quadratically, O(n²), since every token attends to every other token.",
          },
        ],
      },
    },
  })

  const branchChat = await prisma.node.create({
    data: {
      id: "node_branch_chat",
      canvasId: canvas1.id,
      type: "chat",
      positionX: 520,
      positionY: 80,
      title: "Branch: attention deep-dive",
      messages: {
        create: [
          {
            id: "msg_branch_1",
            role: "user",
            content: "What are some sub-quadratic attention variants?",
          },
          {
            id: "msg_branch_2",
            role: "assistant",
            content:
              "Linear attention, sliding-window attention, and sparse patterns like Longformer or BigBird all reduce the quadratic cost.",
          },
        ],
      },
    },
  })

  const notesNode = await prisma.node.create({
    data: {
      id: "node_notes",
      canvasId: canvas1.id,
      type: "text",
      positionX: 520,
      positionY: 340,
      title: "Key takeaways",
      messages: {
        create: [
          {
            id: "msg_notes_1",
            role: "user",
            content:
              "- Attention = tokens weighing each other\n- Vanilla attention is O(n²)\n- Check linear attention papers",
          },
        ],
      },
    },
  })

  const webNode = await prisma.node.create({
    data: {
      id: "node_web_ref",
      canvasId: canvas1.id,
      type: "web",
      positionX: 100,
      positionY: 480,
      title: "Attention Is All You Need (arXiv)",
      isolated: true,
    },
  })

  await prisma.edge.createMany({
    data: [
      {
        id: "edge_root_to_branch",
        canvasId: canvas1.id,
        sourceNodeId: rootChat.id,
        targetNodeId: branchChat.id,
        // Frozen edge: branch forked after message 2
        branchPointMessageId: "msg_root_2",
      },
      {
        id: "edge_root_to_notes",
        canvasId: canvas1.id,
        sourceNodeId: rootChat.id,
        targetNodeId: notesNode.id,
        // Live edge: notes always see the latest root chat
        branchPointMessageId: null,
      },
      {
        id: "edge_web_to_root",
        canvasId: canvas1.id,
        sourceNodeId: webNode.id,
        targetNodeId: rootChat.id,
        branchPointMessageId: null,
      },
    ],
  })
  const canvas2 = await prisma.canvas.create({
    data: {
      id: "canvas_blog",
      title: "Blog Post Draft",
    },
  })

  const outlineNode = await prisma.node.create({
    data: {
      id: "node_outline",
      canvasId: canvas2.id,
      type: "text",
      positionX: 80,
      positionY: 150,
      title: "Outline",
      messages: {
        create: [
          {
            id: "msg_outline_1",
            role: "user",
            content: "1. Hook\n2. Problem\n3. Solution\n4. CTA",
          },
        ],
      },
    },
  })

  const draftChat = await prisma.node.create({
    data: {
      id: "node_draft_chat",
      canvasId: canvas2.id,
      type: "chat",
      positionX: 460,
      positionY: 150,
      title: "Draft with AI",
      messages: {
        create: [
          {
            id: "msg_draft_1",
            role: "user",
            content: "Write an intro paragraph based on the outline.",
          },
          {
            id: "msg_draft_2",
            role: "assistant",
            content:
              "Ever spent an hour hunting for a chat message you know exists? You're not alone — and there's a better way.",
          },
        ],
      },
    },
  })

  await prisma.edge.create({
    data: {
      id: "edge_outline_to_draft",
      canvasId: canvas2.id,
      sourceNodeId: outlineNode.id,
      targetNodeId: draftChat.id,
      branchPointMessageId: null,
    },
  })
  // ─────────────────────────────────────────────
  // Canvas 3: Empty canvas
  // ─────────────────────────────────────────────
  await prisma.canvas.create({
    data: {
      id: "12654asd231as6d4a321sd65a4sd",
      title: "Untitled Canvas",
    },
  })

  console.log("Seed complete:")
  console.log("  - canvas_research: 4 nodes, 3 edges (1 frozen), 7 messages")
  console.log("  - canvas_blog: 2 nodes, 1 edge, 3 messages")
  console.log("  - canvas_empty: no nodes")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
