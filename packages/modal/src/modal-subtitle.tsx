import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

interface ModalSubtitleProps extends DefaultProps {}

const ModalSubtitleBase: React.FunctionComponent<ModalSubtitleProps> = (
  props,
) => {
  const { className, children, ...rest } = props

  const theme = useTheme()
  const { SCALES } = useScale()

  return (
    <>
      <p className={className} {...rest}>
        {children}
      </p>
      <style jsx>{`
        p {
          font-weight: normal;
          display: inline-block;
          text-align: center;
          word-break: break-word;
          text-transform: uppercase;
          color: ${theme.palette.accents_5};
          font-size: ${SCALES.font(0.875)};
          line-height: 1.5em;
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "1.5em")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
      `}</style>
    </>
  )
}

const ModalSubtitle = withScale(ModalSubtitleBase)

if (__DEV__) {
  ModalSubtitle.displayName = "ModalSubtitle"
}

export type { ModalSubtitleProps }
export { ModalSubtitle }
