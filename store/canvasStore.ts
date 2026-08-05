import { create } from "zustand"
import { persist } from "zustand/middleware"

interface canvasState {
  freshStart: boolean
  isMouse: boolean
  /** node whose chat is shown in the side view — null means the sheet is closed */
  sideViewNodeId: string | null

  setFreshStart: (value: boolean) => void
  setIsMouse: (value: boolean) => void
  openSideView: (nodeId: string) => void
  closeSideView: () => void
}

export const useCanvasStore = create<canvasState>()(
  persist(
    (set) => ({
      freshStart: false,
      isMouse: true,
      sideViewNodeId: null,

      setIsMouse: (value) => set(() => ({ isMouse: value })),
      setFreshStart: (value) => set(() => ({ freshStart: value })),
      openSideView: (nodeId) => set(() => ({ sideViewNodeId: nodeId })),
      closeSideView: () => set(() => ({ sideViewNodeId: null })),
    }),
    {
      name: "mouse-sitting",
      partialize: (state) => ({ isMouse: state.isMouse }),
    }
  )
)
