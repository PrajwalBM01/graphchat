import { BuiltInNode, Edge, Node, NodeTypes } from "@xyflow/react"
import chatnode from "./chatnode"
import type { Message as DbMessage } from "@/app/generated/prisma/client"
import textnode from "./textnode"
import webnode from "./webnode"

enum status {
  read,
  pending,
  failed,
}

export type chatNode = Node<
  {
    id: string
    title: string
    messages: DbMessage[]
    nodeData: { model: string }
  },
  "chat"
>

export type webNode = Node<
  {
    id: string
    title: string
    nodeData: {
      url: string
      status: status
      content: string
      fetchedAt: Date
    }
  },
  "web"
>

export type textNode = Node<
  {
    id: string
    title: string
    nodeData: { content: string }
  },
  "text"
>

export type appNodes = BuiltInNode | chatNode | textNode | webNode

export const nodeTypes = {
  chat: chatnode,
  text: textnode,
  web: webnode,
} satisfies NodeTypes
