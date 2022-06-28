import type { BaseThemePalette } from "@kontui/theme"
import type { BaseColorScheme } from "@kontui/utils"

type BoxColorSchemeTypes =
  | BaseColorScheme
  | "error"
  | "dark"
  | "lite"
  | "alert"
  | "purple"
  | "violet"
  | "cyan"

type BoxStyles = {
  color: string
  bgColor: string
  borderColor: string
}

const getStyles = (
  type: BoxColorSchemeTypes,
  palette: BaseThemePalette,
  isShadow?: boolean,
): BoxStyles => {
  const colors: {
    [key in BoxColorSchemeTypes]: Omit<BoxStyles, "borderColor">
  } = {
    default: {
      color: palette.foreground,
      bgColor: palette.background,
    },
    dark: {
      color: palette.background,
      bgColor: palette.foreground,
    },
    secondary: {
      color: palette.background,
      bgColor: palette.secondary,
    },
    success: {
      color: palette.background,
      bgColor: palette.success,
    },
    warning: {
      color: palette.background,
      bgColor: palette.warning,
    },
    error: {
      color: palette.background,
      bgColor: palette.error,
    },
    lite: {
      color: palette.foreground,
      bgColor: palette.background,
    },
    alert: {
      color: "white",
      bgColor: palette.alert,
    },
    purple: {
      color: "white",
      bgColor: palette.purple,
    },
    violet: {
      color: "white",
      bgColor: palette.violet,
    },
    cyan: {
      color: "black",
      bgColor: palette.cyan,
    },
  }
  const showBorder = type === "default" && !isShadow
  return {
    ...colors[type],
    borderColor: showBorder ? palette.border : "transparent",
  }
}

export type { BoxColorSchemeTypes, BoxStyles }
export { getStyles }
