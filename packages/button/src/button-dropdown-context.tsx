import * as React from "react"

import type { BaseColorScheme } from "@kontui/utils"

interface ButtonDropdownConfig {
  colorScheme?: BaseColorScheme
  auto?: boolean
  disabled?: boolean
  loading?: boolean
}

const defaultContext = {
  colorScheme: "default" as BaseColorScheme,
  auto: false,
  disabled: false,
  loading: false,
}

const ButtonDropdownContext =
  React.createContext<ButtonDropdownConfig>(defaultContext)

const useButtonDropdown = (): ButtonDropdownConfig =>
  React.useContext<ButtonDropdownConfig>(ButtonDropdownContext)

export type { ButtonDropdownConfig }
export { ButtonDropdownContext, useButtonDropdown }
