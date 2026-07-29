import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from "ai"
import { google } from "@ai-sdk/google"
import { NextRequest, NextResponse } from "next/server"
import { getContext, loadMessages } from "./helper"
import { updateMessages } from "@/actions/chatActions"
import { createId } from "@paralleldrive/cuid2"
import { createOpenRouter } from "@openrouter/ai-sdk-provider"

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})
export async function POST(req: NextRequest) {
  const { message, nodeId }: { message: UIMessage; nodeId: string } =
    await req.json()

  await updateMessages(nodeId, message)

  const messages = await loadMessages(nodeId)
  messages.push({ id: message.id, role: message.role, parts: message.parts })

  //context
  const system = await getContext(nodeId)

  console.log("system prompt", system)

  const result = streamText({
    model: openrouter.chat("google/gemma-4-26b-a4b-it:free"),
    instructions: system,
    messages: await convertToModelMessages(messages),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onEnd: async (endData) => {
        await updateMessages(nodeId, {
          ...endData.responseMessage,
          id: createId(),
        })
      },
    }),
  })
}
