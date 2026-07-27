import { useEffect, useState } from "react"

export function useCanSelect() {
  const [select, setSelect] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "s") {
        ev.preventDefault()
        setSelect(true)
      }
    }

    const handleKeyUp = (ev: KeyboardEvent) => {
      if (ev.key === "s") {
        ev.preventDefault()
        setSelect(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
  }, [])

  return select
}
