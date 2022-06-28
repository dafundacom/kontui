import * as React from "react"

import { Popover as InternalPopover } from "./popover"
import { PopoverItem } from "./popover-item"

import type { PopoverProps } from "./popover"
import type { PopoverItemProps } from "./popover-item"

interface Popover
  extends React.ForwardRefExoticComponent<
    PopoverProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: typeof PopoverItem
  Option: typeof PopoverItem
}

const Popover = InternalPopover as Popover
Popover.Item = PopoverItem
Popover.Option = PopoverItem

export type { PopoverProps, PopoverItemProps }
export { Popover, PopoverItem }
