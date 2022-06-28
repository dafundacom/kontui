/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"

import { useCurrentState } from "./use-current-state"

type DraggingEvent = {
  startX: number
  currentX: number
}

type DraggingHandler = (event: DraggingEvent) => void

const useDrag = (
  elementRef: React.RefObject<HTMLElement> | null,
  draggingHandler: DraggingHandler = () => {},
  dragStartHandler: DraggingHandler = () => {},
  dragEndHandler: DraggingHandler = () => {},
) => {
  const onDragging = React.useRef<boolean>(false)
  const [, setStartX, startXRef] = useCurrentState<number>(0)
  const [, setCurrentX, currentXRef] = useCurrentState<number>(0)

  const getCustomEvent = () => ({
    startX: startXRef.current,
    currentX: currentXRef.current,
  })

  const elementMouseDownHandler = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation()
    event.stopImmediatePropagation()
    onDragging.current = true
    if (!elementRef || !elementRef.current) return
    setStartX(elementRef.current.getBoundingClientRect().x)
    dragStartHandler(getCustomEvent())
  }
  const globalDraggingHandler = (event: MouseEvent | TouchEvent) => {
    if (!onDragging.current) return
    if (event.type === "touchmove") {
      setCurrentX((event as TouchEvent).changedTouches[0].clientX)
    } else {
      setCurrentX((event as MouseEvent).clientX)
    }
    draggingHandler(getCustomEvent())
  }
  const globalDragEndHandler = () => {
    if (!onDragging.current) return
    onDragging.current = false
    dragEndHandler(getCustomEvent())
  }

  React.useEffect(() => {
    if (!elementRef || !elementRef.current) return
    elementRef.current.addEventListener("mousedown", elementMouseDownHandler)
    elementRef.current.addEventListener("touchstart", elementMouseDownHandler)

    window.addEventListener("mousemove", globalDraggingHandler)
    window.addEventListener("touchmove", globalDraggingHandler)
    window.addEventListener("mouseup", globalDragEndHandler)
    window.addEventListener("touchend", globalDragEndHandler)

    return () => {
      window.removeEventListener("mousemove", globalDraggingHandler)
      window.removeEventListener("touchmove", globalDraggingHandler)
      window.removeEventListener("mouseup", globalDragEndHandler)
      window.removeEventListener("touchend", globalDragEndHandler)

      if (!elementRef || !elementRef.current) return
      elementRef.current.removeEventListener(
        "mousedown",
        elementMouseDownHandler,
      )
      elementRef.current.removeEventListener(
        "touchstart",
        elementMouseDownHandler,
      )
    }
  }, [elementRef])
}

export type { DraggingEvent, DraggingHandler }

export { useDrag }
