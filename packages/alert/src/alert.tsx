import * as React from "react"

import { useScale, useTheme, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps, KontUIThemes, ScaleProps } from "@kontui/theme"
import type { NormalTypes } from "@kontui/utils"

type AlertColorSchemeTypes = NormalTypes

interface AlertProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  colorScheme?: AlertColorSchemeTypes
  label?: string | boolean
  filled?: boolean
}

const getStatusColor = (
  type: AlertColorSchemeTypes,
  filled: boolean,
  theme: KontUIThemes,
) => {
  const colors: { [key in AlertColorSchemeTypes]?: string } = {
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  }
  const statusColor = colors[type]

  if (!filled)
    return {
      color: statusColor || theme.palette.foreground,
      borderColor: statusColor || theme.palette.border,
      bgColor: theme.palette.background,
    }
  const filledColor = statusColor ? "white" : theme.palette.background
  return {
    color: filledColor,
    borderColor: statusColor || theme.palette.foreground,
    bgColor: statusColor || theme.palette.foreground,
  }
}

const AlertBase: React.FunctionComponent<AlertProps> = (props) => {
  const {
    as: Comp = "div",
    colorScheme = "default",
    label = "alert",
    filled = false,
    className,
    children,
    ...rest
  } = props
  const theme = useTheme()
  const { SCALES } = useScale()
  const { color, borderColor, bgColor } = React.useMemo(
    () => getStatusColor(colorScheme, filled, theme),
    [colorScheme, filled, theme],
  )

  return (
    <>
      <Comp className={useClasses("alert", className)} {...rest}>
        {label && (
          <span className="label">
            <b>{label}:</b>
          </span>
        )}
        {children}
      </Comp>

      <style jsx>{`
        .alert {
          line-height: 1.8;
          border: 1px solid ${borderColor};
          color: ${color};
          background-color: ${bgColor};
          border-radius: ${theme.layout.radius};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0.667)} ${SCALES.pr(1.32)} ${SCALES.pb(0.667)}
            ${SCALES.pl(1.32)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .note :global(p) {
          margin: 0;
        }

        .label {
          text-transform: uppercase;
          user-select: none;
          line-height: 1.5;
          padding-right: 0.38em;
        }
      `}</style>
    </>
  )
}

const Alert = withScale(AlertBase)

if (__DEV__) {
  Alert.displayName = "Alert"
}

export type { AlertProps }
export { Alert }
