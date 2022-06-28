import * as React from "react"
import { useTheme, useScale } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps, BaseThemePalette } from "@kontui/theme"
import type { BaseColorScheme } from "@kontui/utils"

interface TextChildProps extends DefaultProps, ScaleProps {
  as: keyof JSX.IntrinsicElements
  colorScheme?: BaseColorScheme
}

const getTextChildColor = (
  colorScheme: BaseColorScheme,
  palette: BaseThemePalette,
) => {
  const colors: { [key in BaseColorScheme]: string } = {
    default: "inherit",
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }

  return colors[colorScheme] || colors.default
}

const TextChild: React.FunctionComponent<TextChildProps> = (props) => {
  const { children, as, className, colorScheme = "default", ...rest } = props

  const Comp = as

  const theme = useTheme()
  const { SCALES, getScaleProps } = useScale()
  const font = getScaleProps("font")
  const mx = getScaleProps([
    "margin",
    "marginLeft",
    "marginRight",
    "mx",
    "ml",
    "mr",
  ])
  const my = getScaleProps([
    "margin",
    "marginTop",
    "marginBottom",
    "my",
    "mt",
    "mb",
  ])
  const px = getScaleProps([
    "padding",
    "paddingLeft",
    "paddingRight",
    "pl",
    "pr",
    "px",
  ])
  const py = getScaleProps([
    "padding",
    "paddingTop",
    "paddingBottom",
    "pt",
    "pb",
    "py",
  ])
  const color = React.useMemo(
    () => getTextChildColor(colorScheme, theme.palette),
    [colorScheme, theme.palette],
  )
  const classNames = React.useMemo<string>(() => {
    const keys = [
      { value: mx, className: "mx" },
      { value: my, className: "my" },
      { value: px, className: "px" },
      { value: py, className: "py" },
      { value: font, className: "font" },
    ]
    const scaleClassNames = keys.reduce((pre, next) => {
      if (typeof next.value === "undefined") return pre
      return `${pre} ${next.className}`
    }, "")
    return `${scaleClassNames} ${className}`.trim()
  }, [mx, my, px, py, font, className])

  return (
    <>
      <Comp className={classNames} {...rest}>
        {children}
      </Comp>
      <style jsx>{`
        ${as} {
          color: ${color};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
        }
        .font {
          font-size: ${SCALES.font(1, "inherit")};
        }
        .mx {
          margin-left: ${SCALES.ml(0, "revert")};
          margin-right: ${SCALES.mr(0, "revert")};
        }
        .my {
          margin-top: ${SCALES.mt(0, "revert")};
          margin-bottom: ${SCALES.mb(0, "revert")};
        }
        .px {
          padding-left: ${SCALES.pl(0, "revert")};
          padding-right: ${SCALES.pr(0, "revert")};
        }
        .py {
          padding-top: ${SCALES.pt(0, "revert")};
          padding-bottom: ${SCALES.pb(0, "revert")};
        }
      `}</style>
    </>
  )
}

if (__DEV__) {
  TextChild.displayName = "TextChild"
}

export type { TextChildProps }
export { TextChild }
