import * as React from "react"

import { ButtonColorScheme } from "./styles"

interface ButtonGroupConfig {
  colorScheme?: ButtonColorScheme
  ghost?: boolean
  disabled?: boolean
  isButtonGroup: boolean
}

const defaultContext = {
  isButtonGroup: false,
  disabled: false,
}

const ButtonGroupContext =
  React.createContext<ButtonGroupConfig>(defaultContext)

const useButtonGroupContext = (): ButtonGroupConfig =>
  React.useContext<ButtonGroupConfig>(ButtonGroupContext)

export type { ButtonGroupConfig }
export { ButtonGroupContext, useButtonGroupContext }
