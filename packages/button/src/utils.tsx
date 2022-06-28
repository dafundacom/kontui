/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"
import { useClasses } from "@kontui/utils"

import { ButtonIcon } from "./button-icon"

import type { ButtonProps } from "./button"
import type { ButtonGroupConfig } from "./button-group-context"

const getButtonChildrenWithIcon = (
  auto: boolean,
  children: React.ReactNode,
  icons: {
    icon?: React.ReactNode
    iconRight?: React.ReactNode
  },
) => {
  const { icon, iconRight } = icons
  const hasIcon = icon || iconRight
  const isRight = Boolean(iconRight)
  const paddingForAutoMode = auto
    ? `calc(var(--kontui-button-height) / 2 + var(--kontui-button-icon-padding) * .5)`
    : 0
  const classes = useClasses("text", isRight ? "right" : "left")

  if (!hasIcon) return <div className="text">{children}</div>
  if (React.Children.count(children) === 0) {
    return (
      <ButtonIcon isRight={isRight} isSingle>
        {hasIcon}
      </ButtonIcon>
    )
  }
  return (
    <>
      <ButtonIcon isRight={isRight}>{hasIcon}</ButtonIcon>
      <div className={classes}>
        {children}
        <style jsx>{`
          .left {
            padding-left: ${paddingForAutoMode};
          }
          .right {
            padding-right: ${paddingForAutoMode};
          }
        `}</style>
      </div>
    </>
  )
}

const filterPropsWithGroup = <T extends React.PropsWithChildren<ButtonProps>>(
  props: T,
  config: ButtonGroupConfig,
): T => {
  if (!config.isButtonGroup) return props
  return {
    ...props,
    auto: true,
    shadow: false,
    ghost: config.ghost || props.ghost,
    colorScheme: config.colorScheme || props.colorScheme,
    disabled: config.disabled || props.disabled,
  }
}

export { getButtonChildrenWithIcon, filterPropsWithGroup }
