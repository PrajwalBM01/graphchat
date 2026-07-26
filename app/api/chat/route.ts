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
  const { messages, nodeId }: { messages: UIMessage[]; nodeId: string } =
    await req.json()
  // const reqData = await req.json()
  // console.log("reciiving the req", reqData)
  // console.log("body req", reqData)
  console.log("nodeId", nodeId)

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: await convertToModelMessages(messages),
  })
  console.log(result)

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}
