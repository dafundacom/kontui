import { KontUIThemes } from "./presets/types"
import lightTheme from "./presets/default"
import darkTheme from "./presets/dark"

import type { DeepPartial } from "@kontui/utils"

type KontUserTheme = DeepPartial<KontUIThemes> & { type: string }

const isObject = (target: unknown) => target && typeof target === "object"

const deepDuplicable = <T extends Record<string, unknown>>(
  source: T,
  target: T,
): T => {
  if (!isObject(target) || !isObject(source)) return source as T

  const sourceKeys = Object.keys(source) as Array<keyof T>
  let result = {} as any
  for (const key of sourceKeys) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      result[key] = targetValue.concat(sourceValue)
    } else if (isObject(sourceValue) && isObject(targetValue)) {
      result[key] = deepDuplicable(sourceValue as Record<string, unknown>, {
        ...(targetValue as Record<string, unknown>),
      })
    } else if (targetValue) {
      result[key] = targetValue
    } else {
      result[key] = sourceValue
    }
  }
  return result
}

const getPresets = (): Array<KontUIThemes> => {
  return [lightTheme, darkTheme]
}

const getPresetStaticTheme = (): KontUIThemes => {
  return lightTheme
}

const isAvailableThemeType = (type?: string): boolean => {
  if (!type) return false
  const presetThemes = getPresets()
  const hasType = presetThemes.find((theme) => theme.type === type)
  return !hasType
}

const isPresetTheme = (
  themeOrType?: KontUserTheme | KontUIThemes | string,
): boolean => {
  if (!themeOrType) return false
  const isType = typeof themeOrType === "string"
  const type = isType
    ? (themeOrType as string)
    : (themeOrType as Exclude<typeof themeOrType, string>).type
  return !isAvailableThemeType(type)
}

const hasUserCustomTheme = (themes: Array<KontUIThemes> = []): boolean => {
  return !!themes.find((item) => isAvailableThemeType(item.type))
}

const create = (base: KontUIThemes, custom: KontUserTheme): KontUIThemes => {
  if (!isAvailableThemeType(custom.type)) {
    throw new Error("Duplicate or unavailable theme type")
  }

  return deepDuplicable(base, custom) as KontUIThemes
}

const createFromDark = (custom: KontUserTheme) => create(darkTheme, custom)
const createFromLight = (custom: KontUserTheme) => create(lightTheme, custom)

const Themes = {
  isPresetTheme,
  isAvailableThemeType,
  hasUserCustomTheme,
  getPresets,
  getPresetStaticTheme,
  create,
  createFromDark,
  createFromLight,
}

export type { KontUserTheme }
export { isObject, deepDuplicable, Themes }
