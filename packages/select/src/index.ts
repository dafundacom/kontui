import * as React from "react"

import { Select as InternalSelect } from "./select"
import { SelectOption } from "./select-option"

import type { SelectProps } from "./select"
import type { SelectOptionProps } from "./select-option"

interface Select
  extends React.ForwardRefExoticComponent<
    SelectProps & React.RefAttributes<HTMLDivElement>
  > {
  Anchor: typeof SelectOption
}

const Select = InternalSelect as Select
Select.Anchor = SelectOption

export type { SelectProps, SelectOptionProps }
export { Select, SelectOption }
