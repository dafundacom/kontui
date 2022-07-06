/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"
import { createPortal } from "react-dom"

import {
  useClasses,
  usePortal,
  useResize,
  useClickAnyWhere,
  useDOMObserver,
  useWarning,
  getRefRect,
  __DEV__,
} from "@kontui/utils"
import { CssTransition } from "@kontui/theme"

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  parent?: React.MutableRefObject<HTMLElement | null> | undefined
  visible: boolean
  disableMatchWidth?: boolean
  getPopupContainer?: () => HTMLElement | null
}

interface ReactiveDomReact {
  top: number
  left: number
  right: number
  width: number
}

const defaultRect: ReactiveDomReact = {
  top: -1000,
  left: -1000,
  right: -1000,
  width: 0,
}

const Dropdown: React.FunctionComponent<DropdownProps> = React.memo((props) => {
  const { children, parent, visible, disableMatchWidth, getPopupContainer } =
    props

  const el = usePortal("dropdown", getPopupContainer)
  const [rect, setRect] = React.useState<ReactiveDomReact>(defaultRect)
  const classes = useClasses(
    "dropdown",
    disableMatchWidth ? "disable-match" : "width-match",
  )

  if (!parent) return null

  if (process.env.NODE_ENV !== "production") {
    if (getPopupContainer && getPopupContainer()) {
      const el = getPopupContainer()
      const style = window.getComputedStyle(el as HTMLDivElement)
      if (style.position === "static") {
        useWarning(
          'The element specified by "getPopupContainer" must have "position" set.',
        )
      }
    }
  }

  const updateRect = () => {
    const {
      top,
      left,
      right,
      width: nativeWidth,
    } = getRefRect(parent, getPopupContainer)
    setRect({ top, left, right, width: nativeWidth })
  }

  useResize(updateRect)
  useClickAnyWhere(() => {
    const { top, left } = getRefRect(parent, getPopupContainer)
    const shouldUpdatePosition = top !== rect.top || left !== rect.left
    if (!shouldUpdatePosition) return
    updateRect()
  })
  useDOMObserver(parent, () => {
    updateRect()
  })
  React.useEffect(() => {
    if (!parent || !parent.current) return
    parent.current.addEventListener("mouseenter", updateRect)
    return () => {
      if (!parent || !parent.current) return
      parent.current.removeEventListener("mouseenter", updateRect)
    }
  }, [parent, updateRect])

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    event.preventDefault()
  }
  const mouseDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  if (!el) return null
  return createPortal(
    <>
      <CssTransition visible={visible}>
        <div
          className={classes}
          onClick={clickHandler}
          onMouseDown={mouseDownHandler}
        >
          {children}
        </div>
      </CssTransition>
      <style jsx>{`
        .dropdown {
          position: absolute;
          top: ${rect.top + 2}px;
          left: ${rect.left}px;
          z-index: 1100;
        }
        .width-match {
          width: ${rect.width}px;
        }
        .disable-match {
          min-width: ${rect.width}px;
        }
      `}</style>
    </>,
    el,
  )
})

if (__DEV__) {
  Dropdown.displayName = "Dropdown"
}

export type { DropdownProps }
export { Dropdown }
