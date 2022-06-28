/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import { ButtonDrip } from "./button-drip"
import { ButtonLoading } from "./button-loading"

import { filterPropsWithGroup, getButtonChildrenWithIcon } from "./utils"
import { useButtonGroupContext } from "./button-group-context"
import {
  getButtonColors,
  getButtonCursor,
  getButtonDripColor,
  getButtonHoverColors,
} from "./styles"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type { ButtonColorScheme } from "./styles"

interface ButtonProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType
  type?: React.ButtonHTMLAttributes<any>["type"]
  colorScheme?: ButtonColorScheme
  ghost?: boolean
  loading?: boolean
  shadow?: boolean
  auto?: boolean
  effect?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      as: Comp = "button",
      type = "button",
      colorScheme = "default",
      children,
      disabled = false,
      loading = false,
      shadow = false,
      ghost = false,
      effect = true,
      onClick,
      auto = false,
      icon,
      iconRight,
      className,
      ...rest
    } = props

    const theme = useTheme()
    const { SCALES } = useScale()
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    React.useImperativeHandle(ref, () => buttonRef.current as any)

    const [dripShow, setDripShow] = React.useState<boolean>(false)
    const [dripX, setDripX] = React.useState<number>(0)
    const [dripY, setDripY] = React.useState<number>(0)
    const groupConfig = useButtonGroupContext()

    const filteredProps = filterPropsWithGroup(props, groupConfig)
    const { bg, border, color } = React.useMemo(
      () => getButtonColors(theme.palette, filteredProps),
      [theme.palette, filteredProps],
    )
    const hover = React.useMemo(
      () => getButtonHoverColors(theme.palette, filteredProps),
      [theme.palette, filteredProps],
    )
    const { cursor, events } = React.useMemo(
      () => getButtonCursor(disabled, loading),
      [disabled, loading],
    )
    const dripColor = React.useMemo(
      () => getButtonDripColor(theme.palette, filteredProps),
      [theme.palette, filteredProps],
    )

    const dripCompletedHandle = () => {
      setDripShow(false)
      setDripX(0)
      setDripY(0)
    }

    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return
      const showDrip = !shadow && !ghost && effect
      if (showDrip && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setDripShow(true)
        setDripX(event.clientX - rect.left)
        setDripY(event.clientY - rect.top)
      }
      onClick && onClick(event)
    }

    const childrenWithIcon = React.useMemo(
      () =>
        getButtonChildrenWithIcon(auto, children, {
          icon,
          iconRight,
        }),
      [auto, children, icon, iconRight],
    )
    const [paddingLeft, paddingRight] = [
      auto ? SCALES.pl(1.15) : SCALES.pl(1.375),
      auto ? SCALES.pr(1.15) : SCALES.pr(1.375),
    ]

    return (
      <>
        <Comp
          ref={buttonRef}
          type={type}
          colorScheme={colorScheme}
          className={useClasses("button", className)}
          disabled={disabled}
          onClick={clickHandler}
          {...rest}
        >
          {loading && <ButtonLoading color={color} />}
          {childrenWithIcon}
          {dripShow && (
            <ButtonDrip
              x={dripX}
              y={dripY}
              color={dripColor}
              onCompleted={dripCompletedHandle}
            />
          )}
        </Comp>
        <style jsx>{`
          .button {
            box-sizing: border-box;
            display: inline-block;
            line-height: ${SCALES.height(2.5)};
            border-radius: ${theme.layout.radius};
            font-weight: 400;
            font-size: ${SCALES.font(0.875)};
            user-select: none;
            outline: none;
            text-transform: capitalize;
            justify-content: center;
            text-align: center;
            white-space: nowrap;
            transition: background-color 200ms ease 0ms,
              box-shadow 200ms ease 0ms, border 200ms ease 0ms,
              color 200ms ease 0ms;
            position: relative;
            overflow: hidden;
            color: ${color};
            background-color: ${bg};
            border: 1px solid ${border};
            cursor: ${cursor};
            pointer-events: ${events};
            box-shadow: ${shadow ? theme.expressiveness.shadowSmall : "none"};
            --kontui-button-icon-padding: ${SCALES.pl(0.727)};
            --kontui-button-height: ${SCALES.height(2.5)};
            --kontui-button-color: ${color};
            --kontui-button-bg: ${bg};
            min-width: ${auto ? "min-content" : SCALES.width(10.5)};
            width: ${auto ? "auto" : "initial"};
            height: ${SCALES.height(2.5)};
            padding: ${SCALES.pt(0)} ${paddingRight} ${SCALES.pb(0)}
              ${paddingLeft};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
              ${SCALES.ml(0)};
          }

          .button:hover,
          .button:focus {
            color: ${hover.color};
            --kontui-button-color: ${hover.color};
            background-color: ${hover.bg};
            border-color: ${hover.border};
            cursor: ${cursor};
            pointer-events: ${events};
            box-shadow: ${shadow ? theme.expressiveness.shadowMedium : "none"};
            transform: translate3d(0px, ${shadow ? "-1px" : "0px"}, 0px);
          }

          .button :global(.text) {
            position: relative;
            z-index: 1;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            line-height: inherit;
            top: -1px;
          }

          .button :global(.text p),
          .button :global(.text pre),
          .button :global(.text div) {
            margin: 0;
          }
        `}</style>
      </>
    )
  },
)

const Button = withScale(ButtonBase)

if (__DEV__) {
  Button.displayName = "Button"
}

export type { ButtonProps }
export { Button }
