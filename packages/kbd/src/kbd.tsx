import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface KbdProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLElement> {
  command?: boolean
  shift?: boolean
  option?: boolean
  ctrl?: boolean
  className?: string
}

const KbdBase: React.FunctionComponent<KbdProps> = (props) => {
  const {
    command = false,
    shift = false,
    option = false,
    ctrl = false,
    children,
    className,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()

  return (
    <>
      <kbd className={className} {...rest}>
        {command && <span>⌘</span>}
        {shift && <span>⇧</span>}
        {option && <span>⌥</span>}
        {ctrl && <span>⌃</span>}
        {children && <span>{children}</span>}
      </kbd>
      <style jsx>{`
        kbd {
          line-height: 2em;
          text-align: center;
          display: inline-block;
          color: ${theme.palette.accents_5};
          background-color: ${theme.palette.accents_1};
          font-family: ${theme.font.sans};
          border-radius: ${theme.layout.radius};
          border: 1px solid ${theme.palette.accents_2};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, "fit-content")};
          height: ${SCALES.height(1, "auto")};
          min-width: 2em;
          min-height: 2em;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0.34)} ${SCALES.pb(0)}
            ${SCALES.pl(0.34)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        span {
          line-height: 2em;
          font-size: 1em;
          text-align: center;
        }

        span + span {
          margin-left: 0.3em;
        }
      `}</style>
    </>
  )
}

const Kbd = withScale(KbdBase)

if (__DEV__) {
  Kbd.displayName = "Kbd"
}

export type { KbdProps }
export { Kbd }
