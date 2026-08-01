import { create } from "zustand"


export type selected = {
  nodeId: string
  messageId: string
  text: string
}

interface canvasState {
  isTextSelected: boolean
  selected: selected | null
}

export const useCanvasStore = create<canvasState>()((set) => ({
  isTextSelected: false,
  selected: null,
}))
