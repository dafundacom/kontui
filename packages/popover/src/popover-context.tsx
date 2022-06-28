import * as React from "react"

type PopoverConfig = {
  disableItemsAutoClose: boolean
  onItemClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const defaultContext = {
  disableItemsAutoClose: false,
  onItemClick: () => {},
}

const PopoverContext = React.createContext<PopoverConfig>(defaultContext)

const usePopoverContext = () => React.useContext<PopoverConfig>(PopoverContext)

export type { PopoverConfig }
export { PopoverContext, usePopoverContext }
