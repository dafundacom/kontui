/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { Tooltip } from "@kontui/tooltip"
import { useScale, withScale } from "@kontui/theme"
import { getReactNode, useClasses, __DEV__ } from "@kontui/utils"

import { PopoverContext } from "./popover-context"

import type { TooltipProps } from "@kontui/tooltip"
import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type {
  Placement,
  SnippetColorScheme,
  TriggerColorScheme,
} from "@kontui/utils"
import type { PopoverConfig } from "./popover-context"

type PopoverTriggerColorScheme = TriggerColorScheme

interface IPopoverProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  content?: React.ReactNode | (() => React.ReactNode)
  trigger?: PopoverTriggerColorScheme
  placement?: Placement
  disableItemsAutoClose?: boolean
  colorScheme?: SnippetColorScheme
}

type ExcludeTooltipProps = {
  text: any
  trigger: any
  placement: any
}

type PopoverProps = IPopoverProps &
  Omit<TooltipProps, keyof ExcludeTooltipProps>

const PopoverBase: React.FunctionComponent<PopoverProps> = (props) => {
  const {
    content,
    children,
    trigger = "click",
    placement = "bottom",
    initialVisible = false,
    hideArrow = false,
    colorScheme = "default",
    portalClassName,
    disableItemsAutoClose = false,
    onVisibleChange = () => {},
    visible: customVisible,
    ...rest
  } = props
  const { SCALES } = useScale()
  const [visible, setVisible] = React.useState<boolean>(initialVisible)
  const textNode = React.useMemo(() => getReactNode(content), [content])
  const onChildClick = () => {
    onPopoverVisibleChange(false)
  }
  const value = React.useMemo<PopoverConfig>(
    () => ({
      onItemClick: onChildClick,
      disableItemsAutoClose,
    }),
    [disableItemsAutoClose, onChildClick],
  )
  const classes = useClasses("popover", portalClassName)

  const onPopoverVisibleChange = (next: boolean) => {
    setVisible(next)
    onVisibleChange(next)
  }

  React.useEffect(() => {
    if (customVisible === undefined) return
    onPopoverVisibleChange(customVisible)
  }, [customVisible, onPopoverVisibleChange])
  return (
    <>
      <PopoverContext.Provider value={value}>
        <Tooltip
          text={textNode}
          colorScheme={colorScheme}
          trigger={trigger}
          placement={placement}
          hideArrow={hideArrow}
          portalClassName={classes}
          visible={visible}
          onVisibleChange={onPopoverVisibleChange}
          {...rest}
        >
          {children}
        </Tooltip>
      </PopoverContext.Provider>
      <style jsx>{`
        :global(.tooltip-content.popover > .inner) {
          padding: ${SCALES.pt(0.9)} ${SCALES.pr(0)} ${SCALES.pb(0.9)}
            ${SCALES.pl(0)};
        }
      `}</style>
    </>
  )
}

const Popover = withScale(PopoverBase)

if (__DEV__) {
  Popover.displayName = "Popover"
}

export type { PopoverProps }
export { Popover }
