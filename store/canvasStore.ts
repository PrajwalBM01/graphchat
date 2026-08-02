import { create } from "zustand"
import { persist } from "zustand/middleware"
interface canvasState {
  freshStart: boolean
  isMouse: boolean

  setIsMouse: (value: boolean) => void
  setFreshStart: (value: boolean) => void
}

export const useCanvasStore = create<canvasState>()(
  persist(
    (set) => ({
      freshStart: false,
      isMouse: true,

      setIsMouse: (value) => set(() => ({ isMouse: value })),
      setFreshStart: (value) => set(() => ({ freshStart: value })),
    }),
    {
      name: "mouse-sitting",
      partialize: (state) => ({ isMouse: state.isMouse }),
    }
  )
)
