/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import {
  useClasses,
  useClickAway,
  pickChild,
  pickChildByProps,
  __DEV__,
} from "@kontui/utils"

import { ButtonDropdownContext } from "./button-dropdown-context"
import { ButtonDropdownItem } from "./button-dropdown-item"
import { ButtonDropdownIcon } from "./button-dropdown-icon"
import { getButtonDropdownColors } from "./styles"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type { BaseColorScheme } from "@kontui/utils"

interface ButtonDropdownProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  colorScheme?: BaseColorScheme
  auto?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
}

const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation()
  event.nativeEvent.stopImmediatePropagation()
}

const ButtonDropdownBase: React.FunctionComponent<ButtonDropdownProps> = (
  props,
) => {
  const {
    children,
    colorScheme,
    auto,
    className,
    disabled,
    loading,
    icon,
    ...rest
  } = props

  const { SCALES } = useScale()
  const ref = React.useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const colors = getButtonDropdownColors(theme.palette, colorScheme)
  const itemChildren = pickChild(children, ButtonDropdownItem)[1]
  const [itemChildrenWithoutMain, mainItemChildren] = pickChildByProps(
    itemChildren,
    "main",
    true,
  )
  const [visible, setVisible] = React.useState<boolean>(false)
  const clickHandler = React.useCallback(
    (event: React.MouseEvent<HTMLDetailsElement>) => {
      event.preventDefault()
      stopPropagation(event)
      if (disabled || loading) return
      setVisible(!visible)
    },
    [visible],
  )

  const initialValue = {
    colorScheme,
    auto,
    disabled,
    loading,
  }
  const bgColor = React.useMemo(() => {
    if (disabled || loading) return theme.palette.accents_1
    return visible ? colors.hoverBgColor : colors.bgColor
  }, [visible, colors, theme.palette])
  const [paddingLeft, paddingRight] = [
    auto ? SCALES.pl(1.15) : SCALES.pl(1.375),
    auto ? SCALES.pr(1.15) : SCALES.pr(1.375),
  ]

  useClickAway(ref, () => setVisible(false))

  return (
    <>
      <ButtonDropdownContext.Provider value={initialValue}>
        <div
          ref={ref}
          className={useClasses("button-dropdown", className)}
          onClick={stopPropagation}
          {...rest}
        >
          {mainItemChildren}
          <details open={visible}>
            <summary onClick={clickHandler}>
              <div className="dropdown-box">
                {icon ? (
                  <span
                    className="dropdown-icon"
                    style={{
                      color: colors.color,
                      height: SCALES.height(2.5),
                      width: SCALES.height(2.5),
                    }}
                  >
                    {icon}
                  </span>
                ) : (
                  <ButtonDropdownIcon
                    color={colors.color}
                    height={SCALES.height(2.5)}
                  />
                )}
              </div>
            </summary>
            <div className="content">{itemChildrenWithoutMain}</div>
          </details>
        </div>
      </ButtonDropdownContext.Provider>
      <style jsx>{`
        .button-dropdown {
          display: inline-flex;
          position: relative;
          box-sizing: border-box;
          border: 1px solid ${theme.palette.border};
          border-radius: ${theme.layout.radius};
          --kontui-dropdown-height: ${SCALES.height(2.5)};
          --kontui-dropdown-min-width: ${auto
            ? "min-content"
            : SCALES.width(10.5)};
          --kontui-dropdown-padding: ${SCALES.pt(0)} ${paddingRight}
            ${SCALES.pb(0)} ${paddingLeft};
          --kontui-dropdown-font-size: ${SCALES.font(0.875)};
        }

        .button-dropdown > :global(button) {
          border-top-left-radius: ${theme.layout.radius};
          border-bottom-left-radius: ${theme.layout.radius};
        }

        details {
          border-top-right-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
          overflow: hidden;
        }

        .dropdown-box {
          height: ${SCALES.height(2.5)};
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
        }

        summary {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
          list-style: none;
          outline: none;
          color: ${colors.color};
          background-color: ${bgColor};
          height: ${SCALES.height(2.5)};
          border-left: 1px solid ${colors.borderLeftColor};
          cursor: ${disabled || loading ? "not-allowed" : "pointer"};
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
          padding: 0 1px;
          transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
        }

        summary:hover {
          border-color: ${colors.hoverBorder};
          background-color: ${colors.hoverBgColor};
        }

        .content {
          position: absolute;
          right: 0;
          left: 0;
          z-index: 90;
          width: 100%;
          border-radius: ${theme.layout.radius};
          box-shadow: ${theme.expressiveness.shadowLarge};
          transform: translateY(${theme.layout.gapHalf});
          background-color: ${theme.palette.background};
        }

        .content > :global(button:first-of-type) {
          border-top-left-radius: ${theme.layout.radius};
          border-top-right-radius: ${theme.layout.radius};
        }

        .content > :global(button:last-of-type) {
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }

        .dropdown-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          transform: scale(0.6);
        }
      `}</style>
    </>
  )
}

const ButtonDropdown = withScale(ButtonDropdownBase)

if (__DEV__) {
  ButtonDropdown.displayName = "ButtonDropdown"
}

export type { ButtonDropdownProps }
export { ButtonDropdown }
