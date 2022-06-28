import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface CenterProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  shadow?: boolean
}

const CenterBase: React.FC<CenterProps> = (props) => {
  const { children, shadow = false, className, ...rest } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const classes = useClasses("center", className)
  const showShadow = React.useMemo(
    () => shadow && theme.type !== "dark",
    [theme.type, shadow],
  )

  return (
    <>
      <div className={classes} {...rest}>
        <div className="center-content">{children}</div>
      </div>
      <style jsx>{`
        .center {
          display: block;
          max-width: 100%;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, "100%")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(2.5)} ${SCALES.mr(0, "auto")} ${SCALES.mb(2.5)}
            ${SCALES.ml(0, "auto")};
        }

        .center-content {
          display: block;
          margin: 0 auto;
          border-radius: 4px;
          overflow: hidden;
          width: ${SCALES.width(1, "max-content")};
          box-shadow: ${showShadow ? theme.expressiveness.shadowLarge : "none"};
          max-width: 100%;
        }

        .center-content :global(pre) {
          margin: 0;
          transition: min-width ease 0.2s;
        }

        .center-content :global(img) {
          display: block;
        }
      `}</style>
    </>
  )
}

const Center = withScale(CenterBase)

if (__DEV__) {
  Center.displayName = "Center"
}

export type { CenterProps }
export { Center }
