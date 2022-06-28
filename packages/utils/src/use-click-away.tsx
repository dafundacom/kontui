import * as React from "react"

type ClickAwayGetContainer = () => HTMLElement | null

const useClickAway = (
  ref: React.MutableRefObject<HTMLElement | null>,
  handler: (event: Event) => void,
) => {
  const handlerRef = React.useRef(handler)
  React.useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  React.useEffect(() => {
    const callback = (event: MouseEvent) => {
      const el = ref.current
      if (!event || !el || el.contains(event.target as Node)) return
      handlerRef.current(event)
    }

    document.addEventListener("click", callback)
    return () => document.removeEventListener("click", callback)
  }, [ref])
}

export type { ClickAwayGetContainer }

export { useClickAway }
