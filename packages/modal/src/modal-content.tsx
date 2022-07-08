import * as React from "react"
import { useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

interface ModalContentProps extends DefaultProps {}

const ModalContentBase: React.FunctionComponent<ModalContentProps> = (
  props,
) => {
  const { className, children, ...rest } = props
  const { SCALES } = useScale()

  return (
    <>
      <div className={useClasses("content", className)} {...rest}>
        {children}
      </div>
      <style jsx>{`
        .content {
          position: relative;
          text-align: left;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(1.3125)} ${SCALES.pr(1.3125)}
            ${SCALES.pb(0.6625)} ${SCALES.pl(1.3125)};
          margin: ${SCALES.mt(0)}
            ${SCALES.mr(0, "calc(var(--modal-wrapper-padding-right) * -1)")}
            ${SCALES.mb(0)}
            ${SCALES.ml(0, "calc(var(--modal-wrapper-padding-left) * -1)")};
        }

        .content > :global(*:first-child) {
          margin-top: 0;
        }

        .content > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  )
}

const ModalContent = withScale(ModalContentBase)

if (__DEV__) {
  ModalContent.displayName = "ModalContent"
}

export type { ModalContentProps }
export { ModalContent }
