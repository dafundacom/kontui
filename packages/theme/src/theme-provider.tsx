import * as React from "react"
import { __DEV__ } from "@kontui/utils"

import { Themes } from "./themes"
import { ThemeContext, AllThemesContext } from "./theme-context"

import type { AllThemesConfig } from "./theme-context"
import type { BaseTheme } from "./presets/types"

export interface ThemeProviderProps {
  themeType?: string
  themes?: Array<BaseTheme>
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children, themeType, themes = [] } = props

  const [allThemes, setAllThemes] = React.useState<AllThemesConfig>({
    themes: Themes.getPresets(),
  })

  const currentTheme = React.useMemo<BaseTheme>(() => {
    const theme = allThemes.themes.find((item) => item.type === themeType)
    if (theme) return theme
    return Themes.getPresetStaticTheme()
  }, [allThemes, themeType])

  React.useEffect(() => {
    if (!themes?.length) return
    setAllThemes((last) => {
      const safeThemes = themes.filter((item) =>
        Themes.isAvailableThemeType(item.type),
      )
      const nextThemes = Themes.getPresets().concat(safeThemes)
      return {
        ...last,
        themes: nextThemes,
      }
    })
  }, [themes])

  return (
    <AllThemesContext.Provider value={allThemes}>
      <ThemeContext.Provider value={currentTheme}>
        {children}
      </ThemeContext.Provider>
    </AllThemesContext.Provider>
  )
}

if (__DEV__) {
  ThemeProvider.displayName = "ThemeProvider"
}

export { ThemeProvider }
