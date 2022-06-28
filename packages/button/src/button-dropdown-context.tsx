import * as React from "react"

import type { NormalTypes } from "@kontui/utils"

interface ButtonDropdownConfig {
  colorScheme?: NormalTypes
  auto?: boolean
  disabled?: boolean
  loading?: boolean
}

const defaultContext = {
  colorScheme: "default" as NormalTypes,
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
