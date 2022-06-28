import * as React from "react"
import { useTheme } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

interface InputLabelProps
  extends DefaultProps,
    React.HTMLAttributes<HTMLSpanElement> {
  isRight?: boolean
}

const InputLabelBase: React.FunctionComponent<InputLabelProps> = (props) => {
  const { children, isRight } = props
  const theme = useTheme()

  return (
    <>
      <span className={isRight ? "right" : ""}>{children}</span>
      <style jsx>{`
        span {
          display: inline-flex;
          width: initial;
          height: 100%;
          align-items: center;
          pointer-events: none;
          margin: 0;
          padding: 0 ${theme.layout.gapHalf};
          color: ${theme.palette.accents_4};
          background-color: ${theme.palette.accents_1};
          border-top-left-radius: ${theme.layout.radius};
          border-bottom-left-radius: ${theme.layout.radius};
          border-top: 1px solid ${theme.palette.border};
          border-left: 1px solid ${theme.palette.border};
          border-bottom: 1px solid ${theme.palette.border};
          font-size: inherit;
          line-height: 1;
        }

        span.right {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
          border-left: 0;
          border-right: 1px solid ${theme.palette.border};
        }
      `}</style>
    </>
  )
}

const InputLabel = React.memo(InputLabelBase)

if (__DEV__) {
  InputLabel.displayName = "InputLabel"
}

export type { InputLabelProps }
export { InputLabel }
