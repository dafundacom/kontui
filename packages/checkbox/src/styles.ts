import type { BaseThemePalette } from "@kontui/theme"
import type { BaseColorScheme } from "@kontui/utils"

type CheckboxColor = {
  fill: string
  bg: string
}

const getCheckboxColors = (
  palette: BaseThemePalette,
  status?: BaseColorScheme,
): CheckboxColor => {
  const colors: { [key in BaseColorScheme]: CheckboxColor } = {
    default: {
      fill: palette.foreground,
      bg: palette.background,
    },
    secondary: {
      fill: palette.foreground,
      bg: palette.background,
    },
    success: {
      fill: palette.success, // fondo
      bg: palette.background,
    },
    warning: {
      fill: palette.warning,
      bg: palette.background,
    },
    error: {
      fill: palette.error,
      bg: palette.background,
    },
  }

  if (!status) return colors.default
  return colors[status]
}

export type { CheckboxColor }
export { getCheckboxColors }
