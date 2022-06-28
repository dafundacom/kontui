import * as React from "react"

import { Themes } from "./themes"
import { BaseTheme } from "./presets/types"

const defaultTheme = Themes.getPresetStaticTheme()

const ThemeContext: React.Context<BaseTheme> =
  React.createContext<BaseTheme>(defaultTheme)
const useTheme = (): BaseTheme => React.useContext<BaseTheme>(ThemeContext)

/* All Themes */
type AllThemesConfig = {
  themes: Array<BaseTheme>
}

const defaultAllThemesConfig = {
  themes: Themes.getPresets(),
}

const AllThemesContext: React.Context<AllThemesConfig> =
  React.createContext<AllThemesConfig>(defaultAllThemesConfig)

const useAllThemes = (): AllThemesConfig =>
  React.useContext<AllThemesConfig>(AllThemesContext)

export type { AllThemesConfig }
export { ThemeContext, useTheme, AllThemesContext, useAllThemes }
