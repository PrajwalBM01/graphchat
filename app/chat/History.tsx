"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCanvasStore } from "@/store/canvasStore"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"

interface historyType {
  canvases: { id: string; title: string | null; createdAt: Date }[]
}

const History = ({ canvases }: historyType) => {
  const { id } = useParams()
  const { setIsMouse } = useCanvasStore()

  return (
    <div className="flex flex-col gap-2">
      {canvases.map((canvas, _i) => (
        <Link
          href={`/chat/${canvas.id}`}

          key={canvas.id}
          className={cn(
            "cursor-pointer rounded-md p-1 hover:bg-accent",
            id === canvas.id && "bg-accent"
          )}
        >
          {canvas.title ?? "Untitled"}
        </Link>
      ))}

      <div className="flex justify-between">
        <Button onClick={() => setIsMouse(true)}>mouse</Button>
        <Button onClick={() => setIsMouse(false)}>touchpad</Button>
      </div>
    </div>
  )
}

export default History
