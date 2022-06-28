import * as React from "react"

import { Button as InternalButton, ButtonProps } from "./button"
import { ButtonGroup, ButtonGroupProps } from "./button-group"
import { ButtonDropdown as InternalButtonDropdown } from "./button-dropdown"
import { ButtonDropdownItem } from "./button-dropdown-item"

import type { ButtonDropdownProps } from "./button-dropdown"

interface Button
  extends React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  > {
  Dropdown: typeof InternalButtonDropdown
  DropdownItem: typeof ButtonDropdownItem
  Group: typeof ButtonGroup
}

interface ButtonDropdown
  extends React.ForwardRefExoticComponent<
    ButtonDropdownProps & React.RefAttributes<HTMLButtonElement>
  > {
  Item: typeof ButtonDropdownItem
}

const Button = InternalButton as Button

Button.Dropdown = InternalButtonDropdown
Button.Group = ButtonGroup
Button.DropdownItem = ButtonDropdownItem

export type { ButtonProps, ButtonGroupProps, ButtonDropdownProps }
export { Button, ButtonGroup, ButtonDropdown, ButtonDropdownItem }
