import * as React from "react"
import { useScale, withScale } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface SpacerProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLSpanElement> {
  inline?: boolean
  className?: string
}

const SpacerBase: React.FunctionComponent<SpacerProps> = (props) => {
  const { inline = false, className, ...rest } = props
  const { SCALES } = useScale()

  return (
    <>
      <span className={className} {...rest} />
      <style jsx>{`
        span {
          display: ${inline ? "inline-block" : "block"};
          width: ${SCALES.width(1)};
          height: ${SCALES.height(1)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
      `}</style>
    </>
  )
}

const Spacer = withScale(SpacerBase)

if (__DEV__) {
  Spacer.displayName = "Spacer"
}

export type { SpacerProps }
export { Spacer }
