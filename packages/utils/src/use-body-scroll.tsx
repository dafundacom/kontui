/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"

type ElementStackItem = {
  overflow: string
  paddingRight: string
}

type BodyScrollOptions = {
  scrollLayer?: boolean
  delayReset?: number
}

const defaultOptions: BodyScrollOptions = {
  scrollLayer: false,
  delayReset: 0,
}

const elementStack = new Map<HTMLElement, ElementStackItem>()

const getOwnerPaddingRight = (element: Element): number => {
  const owner = element?.ownerDocument || document
  const view = owner.defaultView || window
  return Number.parseInt(view.getComputedStyle(element).paddingRight, 10) || 0
}

const getOwnerScrollbarWidth = (element: Element): number => {
  const doc = element?.ownerDocument || document
  return Math.abs(window.innerWidth - doc.documentElement.clientWidth)
}

const useBodyScroll = (
  elementRef?: React.RefObject<HTMLElement> | null,
  options?: BodyScrollOptions,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  if (typeof document === "undefined") return [false, (t: any) => t]
  const elRef = elementRef || React.useRef<HTMLElement>(document.body)
  const [hidden, setHidden] = React.useState<boolean>(false)
  const safeOptions = {
    ...defaultOptions,
    ...(options || {}),
  }

  React.useEffect(() => {
    if (!elRef || !elRef.current) return
    const lastOverflow = elRef.current.style.overflow
    if (hidden) {
      if (elementStack.has(elRef.current)) return
      const paddingRight = getOwnerPaddingRight(elRef.current)
      const scrollbarWidth = getOwnerScrollbarWidth(elRef.current)
      elementStack.set(elRef.current, {
        overflow: lastOverflow,
        paddingRight: elRef.current.style.paddingRight,
      })
      elRef.current.style.overflow = "hidden"
      elRef.current.style.paddingRight = `${paddingRight + scrollbarWidth}px`
      return
    }

    // reset element overflow
    if (!elementStack.has(elRef.current)) return

    const reset = (el: HTMLElement) => {
      const store = elementStack.get(el) as ElementStackItem
      if (!store) return
      el.style.overflow = store.overflow
      el.style.paddingRight = store.paddingRight
      elementStack.delete(el)
    }

    const timer = window.setTimeout(() => {
      reset(elRef.current!)
      window.clearTimeout(timer)
    }, safeOptions.delayReset)
  }, [hidden, elRef, safeOptions.delayReset])

  return [hidden, setHidden]
}

export { useBodyScroll }

export type { ElementStackItem, BodyScrollOptions }
