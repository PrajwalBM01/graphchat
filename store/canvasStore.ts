import { create } from "zustand"

export type canvasType = {
  id: string
  title: string | null
  nodes: NodeType[]
  edges: EdgeType[]
  createdAt: string
}

export type NodeType = {
  id: string
  type: ["chat", "text", "web"]
  canvasId: string
  positionX: number
  positionY: number
  title: string
  isolated: boolean
  messages: MessageType[]
}

export type EdgeType = {
  id: string
  canvasId: string
  sourceNodeId: string
  targetNodeId: string
  branchPointMessageId: string | null
}

export type MessageType = {
  id: string
  nodeId: string
  role: ["user", "assistant"]
  content: string
  createdAt: string
}

interface canvasState {
  canvasId: string | null
  setCanvasId: (id: string) => void
}

export const useCanvasStore = create<canvasState>()((set) => ({
  canvasId: null,
  setCanvasId: (id: string) => set({ canvasId: id }),
}))
