import * as React from "react"

import { Checkbox as InternalCheckbox } from "./checkbox"
import { CheckboxGroup } from "./checkbox-group"

import type {
  CheckboxProps,
  CheckboxEvent,
  CheckboxEventTarget,
} from "./checkbox"
import type { CheckboxGroupProps } from "./checkbox-group"

interface Checkbox
  extends React.ForwardRefExoticComponent<
    CheckboxProps & React.RefAttributes<HTMLInputElement>
  > {
  Group: typeof CheckboxGroup
}

const Checkbox = InternalCheckbox as Checkbox

Checkbox.Group = CheckboxGroup

export type {
  CheckboxProps,
  CheckboxEvent,
  CheckboxEventTarget,
  CheckboxGroupProps,
}

export { Checkbox, CheckboxGroup }
