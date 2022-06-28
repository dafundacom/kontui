import * as React from "react"
import { useScale, withScale } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface ContainerProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {}

const ContainerBase: React.FunctionComponent<ContainerProps> = (props) => {
  const { className, children, ...rest } = props
  const { SCALES } = useScale()

  return (
    <>
      <main className={className} {...rest}>
        {children}
      </main>
      <style jsx>{`
        main {
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, "100%")};
          height: ${SCALES.height(1, "100%")};
          padding: ${SCALES.pt(3.125)} ${SCALES.pr(0)} ${SCALES.pb(3.125)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
      `}</style>
    </>
  )
}

const Container = withScale(ContainerBase)

if (__DEV__) {
  Container.displayName = "Container"
}

export type { ContainerProps }
export { Container }
