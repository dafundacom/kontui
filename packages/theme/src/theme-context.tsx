import * as React from "react"

import { Themes } from "./themes"
import { KontUIThemes } from "./presets/types"

const defaultTheme = Themes.getPresetStaticTheme()

const ThemeContext: React.Context<KontUIThemes> =
  React.createContext<KontUIThemes>(defaultTheme)
const useTheme = (): KontUIThemes =>
  React.useContext<KontUIThemes>(ThemeContext)

/* All Themes */
type AllThemesConfig = {
  themes: Array<KontUIThemes>
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
