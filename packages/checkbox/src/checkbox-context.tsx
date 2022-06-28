import * as React from "react"

interface CheckboxConfig {
  updateState?: (value: string, checked: boolean) => void
  disabledAll: boolean | undefined
  values: string[]
  inGroup: boolean
}

const defaultContext = {
  disabledAll: false,
  inGroup: false,
  values: [],
}

const CheckboxContext = React.createContext<CheckboxConfig>(defaultContext)

const useCheckbox = (): CheckboxConfig =>
  React.useContext<CheckboxConfig>(CheckboxContext)

export type { CheckboxConfig }

export { CheckboxContext, useCheckbox }
