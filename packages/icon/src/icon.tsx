import * as React from "react"

import { DefaultProps } from "@kontui/theme"
import { cx, __DEV__ } from "@kontui/utils"
import { VisuallyHidden } from "@kontui/visually-hidden"

import { QuestionCircleIcon } from "./core"

export interface IconProps extends DefaultProps {
  as?: React.ElementType
  inline?: boolean
  role?: string
  color?: string
  height?: string
  width?: string
  /**
   * The accessible label for the icon. This label will be visually hidden but announced to screen
   * reader users, similar to `alt` text for `img` tags.
   */
  label?: string
}

export const Icon = React.forwardRef<any, IconProps>((props, ref) => {
  const {
    as: Comp = QuestionCircleIcon,
    width,
    height,
    inline = true,
    className,
    role = "presentation",
    label,
    ...rest
  } = props

  return (
    <>
      <Comp
        ref={ref}
        height={height}
        width={width}
        className={cx(inline ? "icon-inline" : "icon-block", className)}
        role={role}
        aria-hidden={true}
        focusable={false}
        {...rest}
      />
      <VisuallyHidden>{label}</VisuallyHidden>
    </>
  )
})

if (__DEV__) {
  Icon.displayName = "Icon"
}
