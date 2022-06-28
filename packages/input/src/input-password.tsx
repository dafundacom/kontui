/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { useScale, withScale } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import { InputPasswordIcon } from "./input-password-icon"
import { Input } from "./input"

import type { InputProps } from "./input"

interface InputPasswordProps extends InputProps {
  hideToggle?: boolean
}

const InputPasswordBase = React.forwardRef<
  HTMLInputElement | unknown,
  InputPasswordProps
>((props, ref) => {
  const { hideToggle = false, children, ...rest } = props
  const { getAllScaleProps } = useScale()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [visible, setVisible] = React.useState<boolean>(false)
  React.useImperativeHandle(ref, () => inputRef.current)

  const iconClickHandler = () => {
    setVisible((v) => !v)
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }

  const inputProps = React.useMemo(
    () => ({
      ...rest,
      ref: inputRef,
      iconClickable: true,
      onIconClick: iconClickHandler,
      type: visible ? "text" : "password",
    }),
    [props, iconClickHandler, visible, inputRef],
  )
  const icon = React.useMemo(() => {
    if (hideToggle) return null
    return <InputPasswordIcon visible={visible} />
  }, [hideToggle, visible])

  return (
    <Input iconRight={icon} {...getAllScaleProps()} {...inputProps}>
      {children}
    </Input>
  )
})

const InputPassword = withScale(InputPasswordBase)

if (__DEV__) {
  InputPassword.displayName = "InputPassword"
}

export type { InputPasswordProps }
export { InputPassword }
