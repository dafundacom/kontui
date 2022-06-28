import * as React from "react"

import { Image } from "@kontui/image"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { hasChild, pickChild, useClasses, __DEV__ } from "@kontui/utils"

import { getStyles } from "./style"
import { BoxContent } from "./box-content"
import { BoxFooter } from "./box-footer"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type { BoxColorSchemeTypes } from "./style"

interface BoxProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  /* element as */
  as?: React.ElementType
  colorScheme?: BoxColorSchemeTypes
  hoverable?: boolean
  shadow?: boolean
}

const BoxBase: React.FunctionComponent<BoxProps> = (props) => {
  const {
    as: Comp = "div",
    colorScheme = "default",
    className,
    children,
    hoverable = false,
    shadow = false,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const hoverShadow = React.useMemo(() => {
    if (shadow) return theme.expressiveness.shadowMedium
    return hoverable ? theme.expressiveness.shadowSmall : "none"
  }, [hoverable, shadow, theme.expressiveness])
  const { color, bgColor, borderColor } = React.useMemo(
    () => getStyles(colorScheme, theme.palette, shadow),
    [colorScheme, theme.palette, shadow],
  )

  const [withoutFooterChildren, footerChildren] = pickChild(children, BoxFooter)
  const [withoutImageChildren, imageChildren] = pickChild(
    withoutFooterChildren,
    Image,
  )
  const hasContent = hasChild(withoutImageChildren, BoxContent)

  return (
    <>
      <Comp className={useClasses("box", className)} {...rest}>
        {imageChildren}
        {hasContent ? (
          withoutImageChildren
        ) : (
          <BoxContent>{withoutImageChildren}</BoxContent>
        )}
        {footerChildren}
      </Comp>
      <style jsx>{`
        .box {
          background: ${theme.palette.background};
          transition: all 0.2s ease;
          border-radius: ${theme.layout.radius};
          box-shadow: ${shadow ? theme.expressiveness.shadowSmall : "none"};
          box-sizing: border-box;
          color: ${color};
          background-color: ${bgColor};
          border: 1px solid ${borderColor};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .box:hover {
          box-shadow: ${hoverShadow};
        }

        .box :global(img) {
          width: 100%;
        }

        .box :global(.image) {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      `}</style>
    </>
  )
}

const Box = withScale(BoxBase)

if (__DEV__) {
  Box.displayName = "Box"
}

export type { BoxProps }
export { Box }
