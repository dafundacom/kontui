import { BaseTheme, BaseThemePalette, BaseThemeExpressiveness } from "./types"
import { defaultFont, defaultBreakpoints, defaultLayout } from "./base"

export const palette: BaseThemePalette = {
  accents_1: "#fafafa",
  accents_2: "#E5E5E5",
  accents_3: "#A3A3A3",
  accents_4: "#737373",
  accents_5: "#525252",
  accents_6: "#404040",
  accents_7: "#262626",
  accents_8: "#171717",
  background: "#fff",
  foreground: "#18181B",
  selection: "#0BC5EA",
  secondary: "#525252",
  code: "#9333EA",
  border: "#E5E5E5",
  error: "#DC2626",
  errorLight: "#EF4444",
  errorLighter: "#FECACA",
  errorDark: "#B91C1C",
  success: "#16A34A",
  successLight: "#22C55E",
  successLighter: "#BBF7D0",
  successDark: "#15803D",
  warning: "#D69E2E",
  warningLight: "#ECC94B",
  warningLighter: "#FAF089",
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
  link: "#16A34A",
}

export const expressiveness: BaseThemeExpressiveness = {
  linkStyle: "none",
  linkHoverStyle: "none",
  dropdownBoxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.02)",
  scrollerStart: "rgba(255, 255, 255, 1)",
  scrollerEnd: "rgba(255, 255, 255, 0)",
  shadowSmall: "0 5px 10px rgba(0, 0, 0, 0.12)",
  shadowMedium: "0 8px 30px rgba(0, 0, 0, 0.12)",
  shadowLarge: "0 30px 60px rgba(0, 0, 0, 0.12)",
  portalOpacity: 0.25,
}

export const font = defaultFont

export const breakpoints = defaultBreakpoints

export const layout = defaultLayout

export const themes: BaseTheme = {
  type: "light",
  font,
  layout,
  palette,
  breakpoints,
  expressiveness,
}

export default themes
