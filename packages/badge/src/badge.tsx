import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type {
  DefaultProps,
  ScaleProps,
  KontUIThemesPalette,
} from "@kontui/theme"
import type { NormalTypes } from "@kontui/utils"

interface BadgeProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLSpanElement> {
  /* as element*/
  as?: React.ElementType
  /* Controls badge appearance */
  colorScheme?: NormalTypes
  /* If `true` badge has dot */
  dot?: boolean
}

const getBgColor = (type: NormalTypes, palette: KontUIThemesPalette) => {
  const colors: { [key in NormalTypes]: string } = {
    default: palette.foreground,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    secondary: palette.secondary,
  }
  return colors[type]
}

const BadgeBase: React.FunctionComponent<BadgeProps> = (props) => {
  const {
    as: Comp = "span",
    colorScheme = "default",
    className,
    children,
    dot = false,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const bg = React.useMemo(
    () => getBgColor(colorScheme, theme.palette),
    [colorScheme, theme.palette],
  )
  const color = React.useMemo(() => {
    if (!colorScheme || colorScheme === "default")
      return theme.palette.background
    return "white"
  }, [colorScheme, theme.palette.background])
  const classes = useClasses("badge", { dot }, className)

  return (
    <>
      <Comp className={classes} {...rest}>
        {children}
      </Comp>
      <style jsx>{`
        .badge {
          display: inline-block;
          border-radius: 16px;
          font-variant: tabular-nums;
          line-height: 1;
          vertical-align: middle;
          background-color: ${bg};
          color: ${color};
          border: 0;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0.25)} ${SCALES.pr(0.4375)} ${SCALES.pb(0.25)}
            ${SCALES.pl(0.4375)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .dot {
          padding: ${SCALES.py(0.25)} ${SCALES.px(0.25)};
          border-radius: 50%;
          user-select: none;
        }
      `}</style>
    </>
  )
}

const Badge = withScale(BadgeBase)

if (__DEV__) {
  Badge.displayName = "Badge"
}

export type { BadgeProps }
export { Badge }
