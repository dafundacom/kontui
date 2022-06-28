import { addColorAlpha } from "@kontui/utils"
import { ButtonProps } from "./button"

import type { BaseThemePalette } from "@kontui/theme"
import type { BaseColorScheme, ButtonColorScheme } from "@kontui/utils"

interface ButtonColorGroup {
  bg: string
  border: string
  color: string
}

const getButtonGhostColors = (
  palette: BaseThemePalette,
  colorScheme: ButtonColorScheme,
): ButtonColorGroup | null => {
  const colors: { [key in ButtonColorScheme]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.background,
      border: palette.foreground,
      color: palette.foreground,
    },
    success: {
      bg: palette.background,
      border: palette.success,
      color: palette.success,
    },
    warning: {
      bg: palette.background,
      border: palette.warning,
      color: palette.warning,
    },
    error: {
      bg: palette.background,
      border: palette.error,
      color: palette.error,
    },
  }

  return colors[colorScheme] || null
}

const getButtonColors = (
  palette: BaseThemePalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { colorScheme, disabled, ghost } = props
  const colors: { [key in ButtonColorScheme]?: ButtonColorGroup } = {
    default: {
      bg: palette.background,
      border: palette.border,
      color: palette.accents_5,
    },
    secondary: {
      bg: palette.foreground,
      border: palette.foreground,
      color: palette.background,
    },
    success: {
      bg: palette.success,
      border: palette.success,
      color: "#fff",
    },
    warning: {
      bg: palette.warning,
      border: palette.warning,
      color: "#fff",
    },
    error: {
      bg: palette.error,
      border: palette.error,
      color: "#fff",
    },
    abort: {
      bg: "transparent",
      border: "transparent",
      color: palette.accents_5,
    },
  }
  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.accents_2,
      color: "#ccc",
    }

  const withoutLightType = colorScheme?.replace(
    "-light",
    "",
  ) as ButtonColorScheme
  const defaultColor = colors.default as ButtonColorGroup

  if (ghost)
    return getButtonGhostColors(palette, withoutLightType) || defaultColor
  return colors[withoutLightType] || defaultColor
}

const getButtonGhostHoverColors = (
  palette: BaseThemePalette,
  colorScheme: ButtonColorScheme,
): ButtonColorGroup | null => {
  const colors: { [key in ButtonColorScheme]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.foreground,
      border: palette.background,
      color: palette.background,
    },
    success: {
      bg: palette.success,
      border: palette.background,
      color: "white",
    },
    warning: {
      bg: palette.warning,
      border: palette.background,
      color: "white",
    },
    error: {
      bg: palette.error,
      border: palette.background,
      color: "white",
    },
  }
  const withoutLightType = colorScheme.replace(
    "-light",
    "",
  ) as ButtonColorScheme
  return colors[withoutLightType] || null
}

const getButtonHoverColors = (
  palette: BaseThemePalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { colorScheme, disabled, loading, shadow, ghost } = props
  const defaultColor = getButtonColors(palette, props)
  const alphaBackground = addColorAlpha(defaultColor.bg, 0.85)
  const colors: {
    [key in ButtonColorScheme]: Omit<ButtonColorGroup, "color"> & {
      color?: string
    }
  } = {
    default: {
      bg: palette.background,
      border: palette.foreground,
    },
    secondary: {
      bg: palette.background,
      border: palette.foreground,
    },
    success: {
      bg: palette.background,
      border: palette.success,
    },
    warning: {
      bg: palette.background,
      border: palette.warning,
    },
    error: {
      bg: palette.background,
      border: palette.error,
    },
    abort: {
      bg: "transparent",
      border: "transparent",
      color: palette.accents_5,
    },
    "secondary-light": {
      ...defaultColor,
      bg: alphaBackground,
    },
    "success-light": {
      ...defaultColor,
      bg: alphaBackground,
    },
    "warning-light": {
      ...defaultColor,
      bg: alphaBackground,
    },
    "error-light": {
      ...defaultColor,
      bg: alphaBackground,
    },
  }
  if (disabled)
    return {
      bg: palette.accents_1,
      border: palette.accents_2,
      color: "#ccc",
    }
  if (loading)
    return {
      ...defaultColor,
      color: "transparent",
    }
  if (shadow) return defaultColor

  const hoverColor =
    (ghost
      ? getButtonGhostHoverColors(palette, colorScheme!)
      : colors[colorScheme!]) || colors.default
  return {
    ...hoverColor,
    color: hoverColor.color || hoverColor.border,
  }
}

interface ButtonCursorGroup {
  cursor: string
  events: string
}

const getButtonCursor = (
  disabled: boolean,
  loading: boolean,
): ButtonCursorGroup => {
  if (disabled)
    return {
      cursor: "not-allowed",
      events: "auto",
    }
  if (loading)
    return {
      cursor: "default",
      events: "none",
    }

  return {
    cursor: "pointer",
    events: "auto",
  }
}

const getButtonDripColor = (palette: BaseThemePalette, props: ButtonProps) => {
  const { colorScheme } = props
  const isLightHover = colorScheme?.endsWith("light")
  const hoverColors = getButtonHoverColors(palette, props)
  return isLightHover
    ? addColorAlpha(hoverColors.bg, 0.65)
    : addColorAlpha(palette.accents_2, 0.65)
}

type ButtonDropdownColors = {
  color: string
  bgColor: string
  hoverBgColor: string
  hoverBorder: string
  borderLeftColor: string
}

const getButtonDropdownColors = (
  palette: BaseThemePalette,
  colorScheme: BaseColorScheme | undefined,
  disabled: boolean = false,
) => {
  const colors: { [key in BaseColorScheme]: ButtonDropdownColors } = {
    default: {
      color: palette.accents_5,
      bgColor: palette.background,
      borderLeftColor: palette.accents_2,
      hoverBgColor: palette.accents_1,
      hoverBorder: palette.accents_2,
    },
    secondary: {
      color: palette.background,
      bgColor: palette.foreground,
      borderLeftColor: palette.accents_7,
      hoverBgColor: palette.accents_7,
      hoverBorder: palette.accents_7,
    },
    success: {
      color: palette.background,
      bgColor: palette.success,
      borderLeftColor: palette.successDark,
      hoverBgColor: palette.successDark,
      hoverBorder: palette.successDark,
    },
    warning: {
      color: palette.background,
      bgColor: palette.warning,
      borderLeftColor: palette.warningDark,
      hoverBgColor: palette.warningDark,
      hoverBorder: palette.warningDark,
    },
    error: {
      color: palette.background,
      bgColor: palette.error,
      borderLeftColor: palette.errorDark,
      hoverBgColor: palette.errorDark,
      hoverBorder: palette.errorDark,
    },
  }

  if (disabled)
    return {
      ...colors.default,
      bgColor: palette.accents_1,
      color: palette.accents_4,
    }
  return colorScheme ? colors[colorScheme] : colors.default
}

export type {
  ButtonColorScheme,
  ButtonColorGroup,
  ButtonCursorGroup,
  ButtonDropdownColors,
}
export {
  getButtonColors,
  getButtonGhostColors,
  getButtonHoverColors,
  getButtonGhostHoverColors,
  getButtonCursor,
  getButtonDripColor,
  getButtonDropdownColors,
}
