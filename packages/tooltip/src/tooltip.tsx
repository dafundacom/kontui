/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { withScale } from "@kontui/theme"
import { useClasses, useClickAway, __DEV__ } from "@kontui/utils"
import { TooltipContent } from "./tooltip-content"
import { getRect } from "./utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type {
  TriggerColorScheme,
  Placement,
  SnippetColorScheme,
} from "@kontui/utils"
import type { TooltipIconOffset } from "./tooltip-content"

type TooltipOnVisibleChange = (visible: boolean) => void

interface TooltipProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  text: string | React.ReactNode
  colorScheme?: SnippetColorScheme
  placement?: Placement
  visible?: boolean
  initialVisible?: boolean
  hideArrow?: boolean
  trigger?: TriggerColorScheme
  enterDelay?: number
  leaveDelay?: number
  offset?: number
  portalClassName?: string
  onVisibleChange?: TooltipOnVisibleChange
}

const TooltipBase: React.FunctionComponent<TooltipProps> = (props) => {
  const {
    children,
    initialVisible = false,
    text,
    offset = 12,
    placement = "top",
    portalClassName,
    enterDelay = 100,
    leaveDelay = 150,
    trigger = "hover",
    colorScheme = "default",
    className,
    onVisibleChange = () => {},
    hideArrow = false,
    visible: customVisible,
    ...rest
  } = props

  const timer = React.useRef<number>()
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState<boolean>(initialVisible)
  const iconOffset = React.useMemo<TooltipIconOffset>(() => {
    if (!ref?.current) return { x: "0.75em", y: "0.75em" }
    const rect = getRect(ref)
    return {
      x: `${rect.width ? rect.width / 2 : 0}px`,
      y: `${rect.height ? rect.height / 2 : 0}px`,
    }
  }, [])
  const contentProps = {
    colorScheme,
    visible,
    offset,
    placement,
    hideArrow,
    iconOffset,
    parent: ref,
    className: portalClassName,
  }

  function changeVisible(nextState: boolean): void {
    const clear = () => {
      clearTimeout(timer.current)
      timer.current = undefined
    }
    const handler = (nextState: boolean) => {
      setVisible(nextState)
      onVisibleChange(nextState)
      clear()
    }
    clear()
    if (nextState) {
      timer.current = window.setTimeout(() => handler(true), enterDelay)
      return
    }
    const leaveDelayWithoutClick = trigger === "click" ? 0 : leaveDelay
    timer.current = window.setTimeout(
      () => handler(false),
      leaveDelayWithoutClick,
    )
  }

  const mouseEventHandler = (next: boolean) =>
    trigger === "hover" && changeVisible(next)
  const clickEventHandler = () => trigger === "click" && changeVisible(!visible)

  useClickAway(ref, () => trigger === "click" && changeVisible(false))
  React.useEffect(() => {
    if (customVisible === undefined) return
    changeVisible(customVisible)
  }, [changeVisible, customVisible])

  return (
    <>
      <div
        ref={ref}
        className={useClasses("tooltip", className)}
        onClick={clickEventHandler}
        onMouseEnter={() => mouseEventHandler(true)}
        onMouseLeave={() => mouseEventHandler(false)}
        {...rest}
      >
        {children}
        <TooltipContent {...contentProps}>{text}</TooltipContent>
      </div>
      <style jsx>{`
        .tooltip {
          width: max-content;
          display: inline-block;
        }
      `}</style>
    </>
  )
}

const Tooltip = withScale(TooltipBase)

if (__DEV__) {
  Tooltip.displayName = "Tooltip"
}

export type { TooltipProps, TooltipOnVisibleChange }
export { Tooltip }
