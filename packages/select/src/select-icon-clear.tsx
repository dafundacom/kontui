/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"
import { useTheme } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

interface SelectIconClearProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const SelectIconClearBase: React.FunctionComponent<SelectIconClearProps> = (
  props,
) => {
  const { onClick } = props

  const theme = useTheme()
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    onClick && onClick(event)
  }
  return (
    <>
      <div onClick={clickHandler} className="clear-icon">
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </div>
      <style jsx>{`
        .clear-icon {
          padding: 0 0 0 0.5em;
          margin: 0;
          display: inline-flex;
          align-items: center;
          height: 100%;
          cursor: pointer;
          box-sizing: border-box;
          transition: color 150ms ease 0s;
          color: ${theme.palette.accents_3};
          visibility: visible;
          opacity: 1;
        }

        .clear-icon:hover {
          color: ${theme.palette.foreground};
        }

        svg {
          color: currentColor;
          width: 1em;
          height: 1em;
        }
      `}</style>
    </>
  )
}

const SelectIconClear = React.memo(SelectIconClearBase)

if (__DEV__) {
  SelectIconClear.displayName = "SelectIconClear"
}

export type { SelectIconClearProps }
export { SelectIconClear }
