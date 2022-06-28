import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface BoxFooterProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLElement> {
  disableAutoMargin?: boolean
}

const BoxFooterBase: React.FunctionComponent<BoxFooterProps> = (props) => {
  const { className, children, disableAutoMargin = false, ...rest } = props

  const theme = useTheme()
  const { SCALES } = useScale()

  const classes = useClasses(
    { "box-footer-auto-margin": !disableAutoMargin },
    className,
  )

  return (
    <>
      <footer className={classes} {...rest}>
        {children}
      </footer>
      <style jsx>{`
        footer {
          padding: ${SCALES.py(0.66)} ${SCALES.px(1.31)};
          display: flex;
          align-items: center;
          overflow: hidden;
          color: inherit;
          background-color: inherit;
          font-size: ${SCALES.font(0.875)};
          border-top: 1px solid ${theme.palette.border};
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
          min-height: ${SCALES.height(3.3)};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
        .box-footer-auto-margin :global(*) {
          margin-top: 0;
          margin-bottom: 0;
          margin-right: ${theme.layout.gapQuarter};
        }
      `}</style>
    </>
  )
}

const BoxFooter = withScale(BoxFooterBase)

if (__DEV__) {
  BoxFooter.displayName = "BoxFooter"
}

export type { BoxFooterProps }
export { BoxFooter }
