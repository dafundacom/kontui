import * as React from "react"

import { Input as InternalInput, getInputColors } from "./input"
import { InputPassword } from "./input-password"

import type { InputProps } from "./input"
import type { InputPasswordProps } from "./input-password"

interface Input
  extends React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLElement>
  > {
  Password: typeof InputPassword
}

const Input = InternalInput as Input

Input.Password = InputPassword

export type { InputProps, InputPasswordProps }
export { Input, InputPassword, getInputColors }
