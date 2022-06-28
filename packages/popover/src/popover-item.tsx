/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"
import { usePopoverContext } from "./popover-context"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface PopoverItemProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLElement> {
  line?: boolean
  withTitle?: boolean
  disableAutoClose?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const PopoverItemBase: React.FunctionComponent<PopoverItemProps> = (props) => {
  const {
    children,
    line = false,
    withTitle = false,
    className,
    onClick,
    disableAutoClose = false,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const { disableItemsAutoClose, onItemClick } = usePopoverContext()
  const hasHandler = Boolean(onClick)
  const dontCloseByClick =
    disableAutoClose || disableItemsAutoClose || withTitle || line
  const classes = useClasses("item", { line, withTitle }, className)

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick && onClick(event)
    if (dontCloseByClick) {
      return event.stopPropagation()
    }
    onItemClick(event)
  }

  return (
    <>
      <div className={classes} onClick={clickHandler} {...rest}>
        {children}
      </div>
      {withTitle && <PopoverItem line withTitle={false} />}
      <style jsx>{`
        .item {
          display: flex;
          box-sizing: border-box;
          justify-content: flex-start;
          align-items: center;
          color: ${theme.palette.accents_5};
          transition: color, background-color 150ms linear;
          line-height: 1.25em;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
          padding: ${SCALES.pt(0.5)} ${SCALES.pr(0.75)} ${SCALES.pb(0.5)}
            ${SCALES.pl(0.75)};
          cursor: ${hasHandler ? "pointer" : "default"};
        }

        .item:hover {
          color: ${theme.palette.foreground};
        }

        .item.line {
          line-height: 0;
          padding: 0;
          background-color: ${theme.palette.border};
          height: ${SCALES.height(0.0625)};
          margin: ${SCALES.mt(0.35)} ${SCALES.mr(0)} ${SCALES.mb(0.35)}
            ${SCALES.ml(0)};
          width: ${SCALES.width(1, "100%")};
        }

        .item.title {
          font-weight: 500;
          font-size: ${SCALES.font(0.925)};
          color: ${theme.palette.foreground};
        }
      `}</style>
    </>
  )
}

const PopoverItem = withScale(PopoverItemBase)

if (__DEV__) {
  PopoverItem.displayName = "PopoverItem"
}

export type { PopoverItemProps }
export { PopoverItem }
