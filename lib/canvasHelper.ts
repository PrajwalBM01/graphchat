import { Edge } from "@xyflow/react"

export function cycleCheck(
  source: string,
  target: string,
  edges: Edge[]
): boolean {
  if (source === target) return true

  const visited = new Set<string>()
  const stack = [target]

  while (stack.length) {
    const current = stack.pop()
    if (!current) break
    if (current === source) return true
    if (visited.has(current)) continue
    visited.add(current)
    edges.forEach((e) => {
      if (e.source === current) stack.push(e.target)
    })
  }

  return false
}
