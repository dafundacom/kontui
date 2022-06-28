/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"
import { useTheme } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

interface InputIconClearProps
  extends DefaultProps,
    React.HTMLAttributes<HTMLDivElement> {
  visible: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  disabled?: boolean
}

const InputIconClearBase: React.FC<InputIconClearProps> = (props) => {
  const { onClick, disabled, visible } = props
  const theme = useTheme()
  const classes = useClasses("input-clear-icon", { visible })

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    onClick && onClick(event)
  }
  return (
    <>
      <div onClick={clickHandler} className={classes}>
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
        .input-clear-icon {
          box-sizing: border-box;
          display: inline-flex;
          width: calc(var(--input-height) - 2px);
          flex-shrink: 0;
          height: 100%;
          align-items: center;
          justify-content: center;
          cursor: ${disabled ? "not-allowed" : "pointer"};
          transition: color 150ms ease 0s;
          margin: 0;
          padding: 0;
          color: ${theme.palette.accents_3};
          visibility: hidden;
          opacity: 0;
        }

        .visible {
          visibility: visible;
          opacity: 1;
        }

        .input-clear-icon:hover {
          color: ${disabled
            ? theme.palette.accents_3
            : theme.palette.foreground};
        }

        svg {
          color: currentColor;
          width: calc(var(--input-height) - 2px);
          height: calc(var(--input-height) - 2px);
          transform: scale(0.44);
        }
      `}</style>
    </>
  )
}

const InputIconClear = React.memo(InputIconClearBase)

if (__DEV__) {
  InputIconClear.displayName = "InputIconClear"
}

export type { InputIconClearProps }
export { InputIconClear }
