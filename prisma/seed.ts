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

  // ---------------------------------------------------------------------
  // Canvas 1: Research Trip Planning
  // ---------------------------------------------------------------------
  const canvas1 = await prisma.canvas.create({
    data: { title: "Research Trip Planning" },
  })

  const c1Web = await prisma.node.create({
    data: {
      canvasId: canvas1.id,
      type: "web",
      positionX: 0,
      positionY: 0,
      title: "Best time to visit Japan",
      data: {
        url: "https://www.japan-guide.com/e/e2273.html",
        status: "read",
        content:
          "jdfjdhjadjadkjfdkjafsdkjfdjkfjasfdjkasfjhafjkfdjfdhjjafdjhjhdjlkjadsaadshjsadsdjdsajjasjasddsakjsadkjsdajkhsdkhdshsdhdsahkkhasdkjhsdahasdasdhdfjjf",
        fetchedAt: "2026-06-01T09:15:00.000Z",
      },
    },
  })

  const c1Chat = await prisma.node.create({
    data: {
      canvasId: canvas1.id,
      type: "chat",
      positionX: 320,
      positionY: 0,
      title: "Trip planning assistant",
      data: { model: "claude-sonnet-5" },
    },
  })

  const c1Text = await prisma.node.create({
    data: {
      canvasId: canvas1.id,
      type: "text",
      positionX: 640,
      positionY: 0,
      title: "Draft itinerary",
      data: {
        content:
          "Day 1: Arrive Tokyo, Shinjuku.\nDay 2: Asakusa + teamLab.\nDay 3: Day trip to Nikko.",
      },
    },
  })

  const c1Isolated = await prisma.node.create({
    data: {
      canvasId: canvas1.id,
      type: "text",
      positionX: 640,
      positionY: 260,
      title: "Random packing note",
      isolated: true,
      data: { content: "Remember: adapter plug, rain jacket, JR pass." },
    },
  })

  const c1Message1 = await prisma.message.create({
    data: {
      nodeId: c1Chat.id,
      role: "user",
      content:
        "Based on this article, when is the best time to visit Japan for mild weather?",
    },
  })
  await prisma.message.create({
    data: {
      nodeId: c1Chat.id,
      role: "assistant",
      content:
        "Late March to May (spring) or October to November (autumn) tend to have the mildest, most comfortable weather.",
    },
  })

  await prisma.edge.create({
    data: {
      canvasId: canvas1.id,
      sourceNodeId: c1Web.id,
      targetNodeId: c1Chat.id,
    },
  })
  await prisma.edge.create({
    data: {
      canvasId: canvas1.id,
      sourceNodeId: c1Chat.id,
      targetNodeId: c1Text.id,
      branchPointMessageId: c1Message1.id,
    },
  })

  // ---------------------------------------------------------------------
  // Canvas 2: Product Launch Notes
  // ---------------------------------------------------------------------
  const canvas2 = await prisma.canvas.create({
    data: { title: "Product Launch Notes" },
  })

  const c2Text = await prisma.node.create({
    data: {
      canvasId: canvas2.id,
      type: "text",
      positionX: 0,
      positionY: 0,
      title: "Launch brief",
      data: {
        content:
          "Launching v2.0 with new analytics dashboard on Aug 15. Target: existing Pro users.",
      },
    },
  })

  const c2Chat = await prisma.node.create({
    data: {
      canvasId: canvas2.id,
      type: "chat",
      positionX: 320,
      positionY: 0,
      title: "Messaging brainstorm",
      data: { model: "claude-opus-4-8" },
    },
  })

  const c2Web = await prisma.node.create({
    data: {
      canvasId: canvas2.id,
      type: "web",
      positionX: 320,
      positionY: 260,
      title: "Competitor launch page",
      data: {
        url: "https://competitor.example.com/changelog",
        status: "fetching",
        fetchedAt: null,
      },
    },
  })

  const c2Chat2 = await prisma.node.create({
    data: {
      canvasId: canvas2.id,
      type: "chat",
      positionX: 640,
      positionY: 0,
      title: "Email copy variant",
      data: { model: "claude-haiku-4-5-20251001" },
    },
  })

  const c2Message1 = await prisma.message.create({
    data: {
      nodeId: c2Chat.id,
      role: "user",
      content: "Give me 3 headline options for the v2.0 dashboard launch.",
    },
  })
  await prisma.message.create({
    data: {
      nodeId: c2Chat.id,
      role: "assistant",
      content:
        '1) "See your data differently." 2) "Analytics, reimagined." 3) "Your dashboard just got smarter."',
    },
  })
  await prisma.message.create({
    data: {
      nodeId: c2Chat2.id,
      role: "user",
      content: "Turn headline #2 into a short launch email.",
    },
  })
  await prisma.message.create({
    data: {
      nodeId: c2Chat2.id,
      role: "assistant",
      content:
        "Subject: Analytics, reimagined.\n\nHi there — starting Aug 15, your dashboard gets a major upgrade...",
    },
  })

  await prisma.edge.create({
    data: {
      canvasId: canvas2.id,
      sourceNodeId: c2Text.id,
      targetNodeId: c2Chat.id,
    },
  })
  await prisma.edge.create({
    data: {
      canvasId: canvas2.id,
      sourceNodeId: c2Chat.id,
      targetNodeId: c2Chat2.id,
      branchPointMessageId: c2Message1.id,
    },
  })

  // ---------------------------------------------------------------------
  // Canvas 3: Learning Rust
  // ---------------------------------------------------------------------
  const canvas3 = await prisma.canvas.create({
    data: { title: "Learning Rust" },
  })

  const c3Web = await prisma.node.create({
    data: {
      canvasId: canvas3.id,
      type: "web",
      positionX: 0,
      positionY: 0,
      title: "The Rust Book - Ownership",
      data: {
        url: "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html",
        status: "failed",
        fetchedAt: "2026-07-10T14:22:00.000Z",
      },
    },
  })

  const c3Chat = await prisma.node.create({
    data: {
      canvasId: canvas3.id,
      type: "chat",
      positionX: 320,
      positionY: 0,
      title: "Ownership Q&A",
      data: { model: "claude-sonnet-5" },
    },
  })

  const c3Text1 = await prisma.node.create({
    data: {
      canvasId: canvas3.id,
      type: "text",
      positionX: 640,
      positionY: -140,
      title: "Key takeaway: move semantics",
      data: {
        content:
          "Assigning a String to another variable moves it; the original variable is no longer valid.",
      },
    },
  })

  const c3Text2 = await prisma.node.create({
    data: {
      canvasId: canvas3.id,
      type: "text",
      positionX: 640,
      positionY: 140,
      title: "Key takeaway: borrowing",
      data: {
        content:
          "References let you use a value without taking ownership, via & and &mut.",
      },
    },
  })

  const c3Message1 = await prisma.message.create({
    data: {
      nodeId: c3Chat.id,
      role: "user",
      content:
        "The page failed to load — from what you know, explain ownership vs borrowing in Rust simply.",
    },
  })
  await prisma.message.create({
    data: {
      nodeId: c3Chat.id,
      role: "assistant",
      content:
        "Ownership means one variable is responsible for a value and it moves between owners; borrowing lets other code use it temporarily via references without taking ownership.",
    },
  })

  await prisma.edge.create({
    data: {
      canvasId: canvas3.id,
      sourceNodeId: c3Web.id,
      targetNodeId: c3Chat.id,
    },
  })
  await prisma.edge.create({
    data: {
      canvasId: canvas3.id,
      sourceNodeId: c3Chat.id,
      targetNodeId: c3Text1.id,
      branchPointMessageId: c3Message1.id,
    },
  })
  await prisma.edge.create({
    data: {
      canvasId: canvas3.id,
      sourceNodeId: c3Chat.id,
      targetNodeId: c3Text2.id,
      branchPointMessageId: c3Message1.id,
    },
  })

  console.log("Seed complete:", {
    canvases: [canvas1.id, canvas2.id, canvas3.id],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
