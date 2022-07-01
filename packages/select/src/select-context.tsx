import * as React from "react"

interface SelectConfig {
  value?: string | string[]
  updateValue?: (next: string) => void
  visible?: boolean
  updateVisible?: (next: boolean) => unknown
  disableAll?: boolean
  ref?: React.MutableRefObject<HTMLElement | null>
}

const defaultContext = {
  visible: false,
  disableAll: false,
}

const SelectContext = React.createContext<SelectConfig>(defaultContext)

const useSelectContext = (): SelectConfig =>
  React.useContext<SelectConfig>(SelectContext)

export type { SelectConfig }
export { SelectContext, useSelectContext }
