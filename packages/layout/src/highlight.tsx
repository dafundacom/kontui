/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { useTheme } from "@kontui/theme"
import { isUnplacedRect, useClasses, usePrevious } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"
import type { ReactiveDomReact } from "@kontui/utils"

type HighlightProps = DefaultProps & {
  rect: ReactiveDomReact
  visible?: boolean
  hoverHeightRatio?: number
  hoverWidthRatio?: number
  activeOpacity?: number
}

type HighlightPosition = {
  width: string
  left: string
  height: string
  top: string
  transition: string
}

const Highlight: React.FunctionComponent<HighlightProps> = (props) => {
  const {
    rect,
    visible,
    hoverHeightRatio = 1,
    hoverWidthRatio = 1,
    activeOpacity = 0.8,
    className,
    ...rest
  } = props

  const theme = useTheme()
  const ref = React.useRef<HTMLDivElement | null>(null)
  const isFirstVisible = usePrevious<boolean>(isUnplacedRect(rect))
  const position = React.useMemo<HighlightPosition>(() => {
    const width = rect.width * hoverWidthRatio
    const height = rect.height * hoverHeightRatio
    return {
      width: `${width}px`,
      left: `${rect.left + (rect.width - width) / 2}px`,
      height: `${height}px`,
      top: `${rect.elementTop + (rect.height - height) / 2}px`,
      transition: isFirstVisible ? "opacity" : "opacity, width, left, top",
    }
  }, [rect, hoverWidthRatio, hoverHeightRatio])

  return (
    <div ref={ref} className={useClasses("highlight", className)} {...rest}>
      <style jsx>{`
        .highlight {
          background: ${theme.palette.accents_2};
          position: absolute;
          border-radius: 5px;
          width: ${position.width};
          left: ${position.left};
          height: ${position.height};
          top: ${position.top};
          opacity: ${visible ? activeOpacity : 0};
          transition: 0.15s ease;
          transition-property: ${position.transition};
        }
      `}</style>
    </div>
  )
}

if (__DEV__) {
  Highlight.displayName = "Highlight"
}

export type { HighlightProps }
export { Highlight }
