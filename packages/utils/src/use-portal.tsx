import * as React from "react"

import { getId } from "./collections"
import { useSSR } from "./use-ssr"

const createElement = (id: string): HTMLElement => {
  const el = document.createElement("div")
  el.setAttribute("id", id)
  return el
}

const usePortal = (
  selectId: string = getId(),
  getContainer?: () => HTMLElement | null,
): HTMLElement | null => {
  const id = `kontui-${selectId}`
  const { isBrowser } = useSSR()
  const [elSnapshot, setElSnapshot] = React.useState<HTMLElement | null>(
    isBrowser ? createElement(id) : null,
  )

  React.useEffect(() => {
    const customContainer = getContainer ? getContainer() : null
    const parentElement = customContainer || document.body
    const hasElement = parentElement.querySelector<HTMLElement>(`#${id}`)
    const el = hasElement || createElement(id)

    if (!hasElement) {
      parentElement.appendChild(el)
    }
    setElSnapshot(el)
  }, [getContainer, id])

  return elSnapshot
}

export { usePortal }
