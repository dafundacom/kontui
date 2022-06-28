import * as React from "react"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

interface ButtonIconProps
  extends DefaultProps,
    React.HTMLAttributes<HTMLSpanElement> {
  isRight?: boolean
  isSingle?: boolean
  className?: string
}

const ButtonIcon: React.FunctionComponent<ButtonIconProps> = (props) => {
  const { isRight, isSingle, children, className, ...rest } = props
  const classes = useClasses(
    "button-icon",
    { right: isRight, single: isSingle },
    className,
  )

  return (
    <>
      <span className={classes} {...rest}>
        {children}
      </span>
      <style jsx>{`
        .button-icon {
          position: absolute;
          left: var(--kontui-button-icon-padding);
          right: auto;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--kontui-button-color);
          z-index: 1;
        }

        .right {
          right: var(--kontui-button-icon-padding);
          left: auto;
        }

        .icon :global(svg) {
          background: transparent;
          height: calc(var(--kontui-button-height) / 2.35);
          width: calc(var(--kontui-button-height) / 2.35);
        }

        .single {
          position: static;
          transform: none;
        }
      `}</style>
    </>
  )
}

if (__DEV__) {
  ButtonIcon.displayName = "ButtonIcon"
}

export type { ButtonIconProps }
export { ButtonIcon }
