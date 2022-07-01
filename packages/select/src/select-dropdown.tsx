import * as React from "react"
import { useTheme } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"
import { Dropdown } from "@kontui/dropdown"
import { useSelectContext } from "./select-context"

import type { DefaultProps } from "@kontui/theme"

interface SelectDropdownProps
  extends DefaultProps,
    React.HTMLAttributes<HTMLDivElement> {
  visible: boolean
  dropdownStyle?: React.CSSProperties
  disableMatchWidth?: boolean
  getPopupContainer?: () => HTMLElement | null
}

const SelectDropdown = React.forwardRef<
  HTMLDivElement | null,
  SelectDropdownProps
>((props, dropdownRef) => {
  const {
    visible,
    children,
    className,
    dropdownStyle = {},
    disableMatchWidth,
    getPopupContainer,
  } = props

  const theme = useTheme()
  const internalDropdownRef = React.useRef<HTMLDivElement | null>(null)
  const { ref } = useSelectContext()
  const classes = useClasses("select-dropdown", className)

  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    dropdownRef,
    () => internalDropdownRef.current,
  )

  return (
    <>
      <Dropdown
        parent={ref}
        visible={visible}
        disableMatchWidth={disableMatchWidth}
        getPopupContainer={getPopupContainer}
      >
        <div
          ref={internalDropdownRef}
          className={classes}
          style={dropdownStyle}
        >
          {children}
        </div>
      </Dropdown>
      <style jsx>{`
        .select-dropdown {
          border-radius: ${theme.layout.radius};
          box-shadow: ${theme.expressiveness.shadowLarge};
          background-color: ${theme.palette.background};
          max-height: 17em;
          overflow-y: auto;
          overflow-anchor: none;
          padding: 0.38em 0;
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  )
})

if (__DEV__) {
  SelectDropdown.displayName = "SelectDropdown"
}

export type { SelectDropdownProps }
export { SelectDropdown }
