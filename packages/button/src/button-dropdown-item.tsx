/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"
import { Loading } from "@kontui/loading"
import { useTheme } from "@kontui/theme"

import { getButtonDropdownColors } from "./styles"
import { useButtonDropdown } from "./button-dropdown-context"

import type { DefaultProps } from "@kontui/theme"
import type { NormalTypes } from "@kontui/utils"

interface ButtonDropdownItemProps
  extends DefaultProps,
    React.HTMLAttributes<HTMLButtonElement> {
  main?: boolean
  colorScheme?: NormalTypes
  onClick?: React.MouseEventHandler<HTMLElement>
}

const ButtonDropdownItem: React.FC<ButtonDropdownItemProps> = (props) => {
  const {
    children,
    onClick,
    className,
    main,
    colorScheme: selfColorScheme,
    ...rest
  } = props
  const theme = useTheme()
  const {
    colorScheme: parentColorScheme,
    disabled,
    loading,
  } = useButtonDropdown()

  const colorScheme = main ? parentColorScheme : selfColorScheme
  const colors = getButtonDropdownColors(theme.palette, colorScheme, disabled)
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    onClick && onClick(event)
  }

  const cursor = React.useMemo(() => {
    if (loading) return "default"
    return disabled ? "not-allowed" : "pointer"
  }, [loading, disabled])

  return (
    <>
      <button className={className} onClick={clickHandler} {...rest}>
        {loading ? <Loading /> : children}
      </button>
      <style jsx>{`
        button {
          position: relative;
          -webkit-appearance: button;
          text-rendering: auto;
          display: inline-flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          text-align: center;
          cursor: ${cursor};
          box-sizing: border-box;
          margin: 0;
          border: none;
          background-color: ${colors.bgColor};
          color: ${colors.color};
          width: 100%;
          height: var(--kontui-dropdown-height);
          min-width: var(--kontui-dropdown-min-width);
          padding: var(--kontui-dropdown-padding);
          font-size: var(--kontui-dropdown-font-size);
        }

        button:hover {
          border-color: ${colors.hoverBorder};
          background-color: ${colors.hoverBgColor};
        }
      `}</style>
    </>
  )
}

export type { ButtonDropdownItemProps }
export { ButtonDropdownItem }
