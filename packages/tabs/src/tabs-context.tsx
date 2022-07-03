import * as React from "react"

type TabsInternalCellProps = {
  onClick: (value: string) => void
  onMouseOver: (e: React.MouseEvent<HTMLDivElement>) => void
  activeClassName?: string
  activeStyle?: React.CSSProperties
  hideBorder?: boolean
}

type TabsInternalCell = React.FC<TabsInternalCellProps>

interface TabsHeaderItem {
  value: string
  cell: TabsInternalCell
}

interface TabsConfig {
  register?: (item: TabsHeaderItem) => void
  currentValue?: string
  inGroup: boolean
  leftSpace?: React.CSSProperties["marginLeft"]
}

const defaultContext = {
  inGroup: false,
}

const TabsContext = React.createContext<TabsConfig>(defaultContext)
const useTabsContext = (): TabsConfig =>
  React.useContext<TabsConfig>(TabsContext)

export type {
  TabsInternalCellProps,
  TabsInternalCell,
  TabsHeaderItem,
  TabsConfig,
}
export { TabsContext, useTabsContext }
