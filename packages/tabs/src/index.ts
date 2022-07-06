import * as React from "react"

import { Tabs as InternalTabs } from "./tabs"
import { TabsItem } from "./tabs-item"

import type { TabsProps } from "./tabs"
import type { TabsItemProps } from "./tabs-item"

interface Tabs
  extends React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: typeof TabsItem
  Tab: typeof TabsItem
}

const Tabs = InternalTabs as Tabs
Tabs.Item = TabsItem
Tabs.Tab = TabsItem
const Tab = TabsItem

export type { TabsProps, TabsItemProps }
export { Tab, Tabs, TabsItem }

export * from "./use-tabs"
