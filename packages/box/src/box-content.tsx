import * as React from "react"
import { useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface BoxContentProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {}

const BoxContentBase: React.FunctionComponent<BoxContentProps> = (props) => {
  const { className, children, ...rest } = props

  const { SCALES } = useScale()

  return (
    <>
      <div className={useClasses("box-content", className)} {...rest}>
        {children}
      </div>
      <style jsx>{`
        .box-content {
          width: ${SCALES.width(1, "100%")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(1)} ${SCALES.pr(1)} ${SCALES.pb(1)}
            ${SCALES.pl(1)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .box-content > :global(p:first-child) {
          margin-top: 0;
        }

        .box-content > :global(p:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  )
}

const BoxContent = withScale(BoxContentBase)

if (__DEV__) {
  BoxContent.displayName = "BoxContent"
}

export type { BoxContentProps }
export { BoxContent }
