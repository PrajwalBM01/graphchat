import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from "ai"
import { google } from "@ai-sdk/google"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { messages }: { messages: UIMessage[] } = await req.json()
  console.log("reciiving the req", req)

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: await convertToModelMessages(messages),
  })
  console.log(result)

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}

