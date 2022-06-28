import { BaseTheme, BaseThemePalette, BaseThemeExpressiveness } from "./types"
import { defaultFont, defaultBreakpoints, defaultLayout } from "./base"

export const palette: BaseThemePalette = {
  accents_1: "#171717",
  accents_2: "#262626",
  accents_3: "#404040",
  accents_4: "#525252",
  accents_5: "#737373",
  accents_6: "#A3A3A3",
  accents_7: "#E5E5E5",
  accents_8: "#fafafa",
  background: "#18181B",
  foreground: "#fff",
  selection: "#9333EA",
  secondary: "#737373",
  code: "#0BC5EA",
  border: "#262626",
  error: "#DC2626",
  errorLighter: "#FECACA",
  errorLight: "#EF4444",
  errorDark: "#B91C1C",
  success: "#16A34A",
  successLighter: "#BBF7D0",
  successLight: "#22C55E",
  successDark: "#15803D",
  warning: "#D69E2E",
  warningLighter: "#FAF089",
  warningLight: "#ECC94B",
  warningDark: "#B7791F",
  cyan: "#00B5D8",
  cyanLighter: "#9DECF9",
  cyanLight: "#0BC5EA",
  cyanDark: "#00A3C4",
  violet: "#8B5CF6",
  violetLighter: "#DDD6FE",
  violetLight: "#A78BFA",
  violetDark: "#7C3AED",
  purple: "#9333EA",
  alert: "#E53E3E",
  magenta: "#D53F8C",
  link: "#22C55E",
}

export const expressiveness: BaseThemeExpressiveness = {
  linkStyle: "none",
  linkHoverStyle: "none",
  dropdownBoxShadow: "0 0 0 1px #262626",
  scrollerStart: "rgba(255, 255, 255, 1)",
  scrollerEnd: "rgba(255, 255, 255, 0)",
  shadowSmall: "0 0 0 1px #262626",
  shadowMedium: "0 0 0 1px #262626",
  shadowLarge: "0 0 0 1px #262626",
  portalOpacity: 0.75,
}

export const font = defaultFont

export const breakpoints = defaultBreakpoints

export const layout = defaultLayout

export const themes: BaseTheme = {
  type: "dark",
  font,
  layout,
  palette,
  breakpoints,
  expressiveness,
}

export default themes
