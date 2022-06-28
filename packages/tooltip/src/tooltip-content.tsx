/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"
import { createPortal } from "react-dom"

import { CssTransition, useTheme, useScale } from "@kontui/theme"
import {
  useClasses,
  useClickAnyWhere,
  usePortal,
  useResize,
  __DEV__,
} from "@kontui/utils"
import { getPosition, defaultTooltipPosition } from "./tooltip-placement"
import { TooltipIcon } from "./tooltip-icon"
import { getRect } from "./utils"

import type {
  DefaultProps,
  ScaleProps,
  KontUIThemesPalette,
} from "@kontui/theme"
import type { Placement, SnippetTypes } from "@kontui/utils"
import type { TooltipPosition } from "./tooltip-placement"

type TooltipColors = {
  bgColor: string
  color: string
}

const getTooltipColors = (
  colorScheme: SnippetTypes,
  palette: KontUIThemesPalette,
): TooltipColors => {
  const colors: { [key in SnippetTypes]: string } = {
    default: palette.background,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    secondary: palette.secondary,
    dark: palette.foreground,
    lite: palette.background,
  }
  const color =
    colorScheme === "lite" || colorScheme === "default"
      ? palette.foreground
      : palette.background

  return {
    color,
    bgColor: colors[colorScheme],
  }
}

interface TooltipContentProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLElement> {
  parent?: React.MutableRefObject<HTMLElement | null> | undefined
  placement: Placement
  colorScheme: SnippetTypes
  visible: boolean
  hideArrow: boolean
  offset: number
  className?: string
  iconOffset: TooltipIconOffset
}

type TooltipIconOffset = {
  x: string
  y: string
}

const TooltipContent: React.FC<TooltipContentProps> = (props) => {
  const {
    children,
    parent,
    visible,
    offset,
    iconOffset,
    placement,
    colorScheme,
    className,
    hideArrow,
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const el = usePortal("tooltip")
  const selfRef = React.useRef<HTMLDivElement>(null)
  const [rect, setRect] = React.useState<TooltipPosition>(
    defaultTooltipPosition,
  )
  const colors = React.useMemo(
    () => getTooltipColors(colorScheme, theme.palette),
    [colorScheme, theme.palette],
  )
  const hasShadow = colorScheme === "default"
  const classes = useClasses("tooltip-content", className)
  if (!parent) return null

  const updateRect = () => {
    const position = getPosition(placement, getRect(parent), offset)
    setRect(position)
  }

  useResize(updateRect)
  useClickAnyWhere(() => updateRect())

  React.useEffect(() => {
    updateRect()
  }, [updateRect, visible])

  const preventHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }

  if (!el) return null
  return createPortal(
    <React.Fragment>
      <CssTransition visible={visible}>
        <div className={classes} ref={selfRef} onClick={preventHandler}>
          <div className="inner">
            {!hideArrow && (
              <TooltipIcon placement={placement} shadow={hasShadow} />
            )}
            {children}
          </div>
        </div>
      </CssTransition>
      <style jsx>{`
        .tooltip-content {
          --tooltip-icon-offset-x: ${iconOffset.x};
          --tooltip-icon-offset-y: ${iconOffset.y};
          --tooltip-content-bg: ${colors.bgColor};
          box-sizing: border-box;
          position: absolute;
          top: ${rect.top};
          left: ${rect.left};
          transform: ${rect.transform};
          background-color: var(--tooltip-content-bg);
          color: ${colors.color};
          border-radius: ${theme.layout.radius};
          padding: 0;
          z-index: 1000;
          box-shadow: ${hasShadow ? theme.expressiveness.shadowMedium : "none"};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
        }

        .inner {
          box-sizing: border-box;
          position: relative;
          font-size: ${SCALES.font(1)};
          padding: ${SCALES.pt(0.65)} ${SCALES.pr(0.9)} ${SCALES.pb(0.65)}
            ${SCALES.pl(0.9)};
          height: 100%;
        }
      `}</style>
    </React.Fragment>,
    el,
  )
}

if (__DEV__) {
  TooltipContent.displayName = "TooltipContent"
}

export type { TooltipContentProps, TooltipIconOffset }
export { TooltipContent }
