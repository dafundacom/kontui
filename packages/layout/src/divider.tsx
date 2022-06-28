import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps, BaseThemePalette } from "@kontui/theme"
import type { DividerAlign, SnippetColorScheme } from "@kontui/utils"

interface DividerProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  colorScheme?: SnippetColorScheme
  align?: DividerAlign
}

const getDividerColor = (
  colorScheme: SnippetColorScheme,
  palette: BaseThemePalette,
) => {
  const colors: { [key in SnippetColorScheme]: string } = {
    default: palette.border,
    lite: palette.accents_1,
    success: palette.successLight,
    warning: palette.warningLight,
    error: palette.errorLight,
    secondary: palette.secondary,
    dark: palette.foreground,
  }
  return colors[colorScheme]
}

const DividerBase: React.FunctionComponent<DividerProps> = (props) => {
  const {
    colorScheme = "default",
    align = "center",
    children,
    className,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const classes = useClasses("divider", className)
  const color = React.useMemo(
    () => getDividerColor(colorScheme, theme.palette),
    [colorScheme, theme.palette],
  )
  const alignClassName = React.useMemo(() => {
    if (!align || align === "center") return ""
    if (align === "left" || align === "start") return "start"
    return "end"
  }, [align])
  const alignClasses = useClasses("divider-text", alignClassName)
  const textColor = colorScheme === "default" ? theme.palette.foreground : color

  return (
    <>
      <div role="separator" className={classes} {...rest}>
        {children && <span className={alignClasses}>{children}</span>}
      </div>
      <style jsx>{`
        .divider {
          max-width: 100%;
          background-color: ${color};
          position: relative;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(0.0625)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0.5)} ${SCALES.mr(0)} ${SCALES.mb(0.5)}
            ${SCALES.ml(0)};
        }
        .divider-text {
          position: absolute;
          left: 50%;
          top: 50%;
          min-height: 100%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transform: translate(-50%, -50%);
          padding: 0 0.75em;
          font-size: inherit;
          font-weight: bold;
          text-transform: capitalize;
          background-color: ${theme.palette.background};
          color: ${textColor};
          z-index: 10;
        }
        .divider-text.start {
          transform: translateY(-50%);
          left: 7%;
        }
        .divider-text.end {
          transform: translateY(-50%);
          left: auto;
          right: 7%;
        }
      `}</style>
    </>
  )
}

const Divider = withScale(DividerBase)

if (__DEV__) {
  Divider.displayName = "Divider"
}

export type { DividerProps }
export { Divider }
