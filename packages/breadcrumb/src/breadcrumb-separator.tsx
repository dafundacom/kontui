import * as React from "react"
import { useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

interface BreadcrumbSeparatorProps
  extends DefaultProps,
    React.HTMLAttributes<HTMLDivElement> {}

const BreadcrumbSeparatorBase: React.FunctionComponent<
  BreadcrumbSeparatorProps
> = (props) => {
  const { children, className } = props

  const { SCALES } = useScale()
  const classes = useClasses("breadcrumb-separator", className)

  return (
    <div className={classes}>
      {children}
      <style jsx>{`
        .breadcrumb-separator {
          display: inline-flex;
          user-select: none;
          pointer-events: none;
          align-items: center;
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0.5)} ${SCALES.mb(0)}
            ${SCALES.ml(0.5)};
        }
      `}</style>
    </div>
  )
}

const BreadcrumbSeparator = withScale(BreadcrumbSeparatorBase)

if (__DEV__) {
  BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
}

export type { BreadcrumbSeparatorProps }
export { BreadcrumbSeparator }
