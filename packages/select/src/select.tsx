/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import {
  useClasses,
  useCurrentState,
  pickChildByProps,
  __DEV__,
} from "@kontui/utils"
import { Ellipsis, Grid } from "@kontui/layout"
import { SelectIcon } from "./select-icon"
import { SelectDropdown } from "./select-dropdown"
import { SelectMultipleValue } from "./select-multiple-value"
import { SelectContext } from "./select-context"
import { SelectInput } from "./select-input"

import type { DefaultProps, ScaleProps, BaseThemePalette } from "@kontui/theme"
import type { BaseColorScheme } from "@kontui/utils"
import type { SelectConfig } from "./select-context"

export type SelectColor = {
  border: string
  borderActive: string
  iconBorder: string
  placeholderColor: string
}

export const getSelectColors = (
  palette: BaseThemePalette,
  status?: BaseColorScheme,
): SelectColor => {
  const colors: { [key in BaseColorScheme]: SelectColor } = {
    default: {
      border: palette.border,
      borderActive: palette.foreground,
      iconBorder: palette.accents_5,
      placeholderColor: palette.accents_3,
    },
    secondary: {
      border: palette.border,
      borderActive: palette.foreground,
      iconBorder: palette.accents_5,
      placeholderColor: palette.accents_3,
    },
    success: {
      border: palette.successLight,
      borderActive: palette.successDark,
      iconBorder: palette.success,
      placeholderColor: palette.accents_3,
    },
    warning: {
      border: palette.warningLight,
      borderActive: palette.warningDark,
      iconBorder: palette.warning,
      placeholderColor: palette.accents_3,
    },
    error: {
      border: palette.errorLight,
      borderActive: palette.errorDark,
      iconBorder: palette.error,
      placeholderColor: palette.error,
    },
  }

  if (!status) return colors.default
  return colors[status]
}

export type SelectRef = {
  focus: () => void
  blur: () => void
  scrollTo?: (options?: ScrollToOptions) => void
}

interface SelectProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLElement> {
  disabled?: boolean
  colorScheme?: BaseColorScheme
  value?: string | string[]
  initialValue?: string | string[]
  icon?: React.ReactNode
  onChange?: any
  // onChange?: (
  //   value: string | string[],
  // ) => void | React.FormEventHandler<HTMLElement>
  pure?: boolean
  multiple?: boolean
  clearable?: boolean
  dropdownClassName?: string
  dropdownStyle?: React.CSSProperties
  disableMatchWidth?: boolean
  onDropdownVisibleChange?: (visible: boolean) => void
  getPopupContainer?: () => HTMLElement | null
}

const SelectBase = React.forwardRef<SelectRef, SelectProps>(
  (props, selectRef) => {
    const {
      children,
      colorScheme = "default",
      disabled = false,
      initialValue: init,
      value: customValue,
      icon = <SelectIcon />,
      onChange,
      pure = false,
      multiple = false,
      clearable = false,
      placeholder,
      className,
      dropdownClassName,
      dropdownStyle,
      disableMatchWidth = false,
      getPopupContainer,
      onDropdownVisibleChange = () => {},
      ...rest
    } = props

    const theme = useTheme()
    const { SCALES } = useScale()
    const ref = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const [visible, setVisible] = React.useState<boolean>(false)
    const [selectFocus, setSelectFocus] = React.useState<boolean>(false)
    const [value, setValue, valueRef] = useCurrentState<
      string | string[] | undefined
    >(() => {
      if (!multiple) return init
      if (Array.isArray(init)) return init
      return typeof init === "undefined" ? [] : [init]
    })
    const isEmpty = React.useMemo(() => {
      if (!Array.isArray(value)) return !value
      return value.length === 0
    }, [value])

    const { border, borderActive, iconBorder, placeholderColor } =
      React.useMemo(
        () => getSelectColors(theme.palette, colorScheme),
        [theme.palette, colorScheme],
      )

    const updateVisible = (next: boolean) => {
      onDropdownVisibleChange(next)
      setVisible(next)
    }
    const updateValue = (next: string) => {
      setValue((last) => {
        if (!Array.isArray(last)) return next
        if (!last.includes(next)) return [...last, next]
        return last.filter((item) => item !== next)
      })
      onChange && onChange(valueRef.current)
      if (!multiple) {
        updateVisible(false)
      }
    }

    const initialValue: SelectConfig = React.useMemo(
      () => ({
        value,
        visible,
        updateValue,
        updateVisible,
        ref,
        disableAll: disabled,
      }),
      [visible, disabled, ref, value, multiple],
    )

    const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
      event.preventDefault()
      if (disabled) return

      updateVisible(!visible)
      event.preventDefault()
    }
    const mouseDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      if (visible) {
        event.preventDefault()
      }
    }

    React.useEffect(() => {
      if (customValue === undefined) return
      setValue(customValue)
    }, [customValue])
    React.useImperativeHandle(
      selectRef,
      () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        scrollTo: (options) => dropdownRef.current?.scrollTo(options),
      }),
      [inputRef, dropdownRef],
    )

    const selectedChild = React.useMemo(() => {
      const [, optionChildren] = pickChildByProps(children, "value", value)
      return React.Children.map(optionChildren, (child) => {
        if (!React.isValidElement(child)) return null
        const el = React.cloneElement(child, { preventAllEvents: true })
        if (!multiple) return el
        return (
          <SelectMultipleValue
            disabled={disabled}
            onClear={clearable ? () => updateValue(child.props.value) : null}
          >
            {el}
          </SelectMultipleValue>
        )
      })
    }, [value, children, multiple])

    const onInputBlur = () => {
      updateVisible(false)
      setSelectFocus(false)
    }
    const classes = useClasses(
      "select",
      {
        active: selectFocus || visible,
        multiple,
      },
      className,
    )

    return (
      <>
        <SelectContext.Provider value={initialValue}>
          <div
            className={classes}
            ref={ref}
            onClick={clickHandler}
            onMouseDown={mouseDownHandler}
            {...rest}
          >
            <SelectInput
              ref={inputRef}
              visible={visible}
              onBlur={onInputBlur}
              onFocus={() => setSelectFocus(true)}
            />
            {isEmpty && (
              <span className="value placeholder">
                <Ellipsis height="var(--select-height)">{placeholder}</Ellipsis>
              </span>
            )}
            {value && !multiple && (
              <span className="value">{selectedChild}</span>
            )}
            {value && multiple && (
              <Grid.Container gap={0.5}>{selectedChild}</Grid.Container>
            )}
            <SelectDropdown
              ref={dropdownRef}
              visible={visible}
              className={dropdownClassName}
              dropdownStyle={dropdownStyle}
              disableMatchWidth={disableMatchWidth}
              getPopupContainer={getPopupContainer}
            >
              {children}
            </SelectDropdown>
            {!pure && <div className="icon">{icon}</div>}
          </div>
          <style jsx>{`
            .select {
              display: inline-flex;
              align-items: center;
              user-select: none;
              white-space: nowrap;
              position: relative;
              cursor: ${disabled ? "not-allowed" : "pointer"};
              max-width: 90vw;
              overflow: hidden;
              transition: border 150ms ease-in 0s, color 200ms ease-out 0s,
                box-shadow 200ms ease 0s;
              border: 1px solid ${border};
              border-radius: ${theme.layout.radius};

              background-color: ${disabled
                ? theme.palette.accents_1
                : theme.palette.background};
              --select-font-size: ${SCALES.font(0.875)};
              --select-height: ${SCALES.height(2.25)};
              min-width: 11.5em;
              width: ${SCALES.width(1, "initial")};
              height: var(--select-height);
              padding: ${SCALES.pt(0)} ${SCALES.pr(0.334)} ${SCALES.pb(0)}
                ${SCALES.pl(0.667)};
              margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
                ${SCALES.ml(0)};
            }

            .multiple {
              height: auto;
              min-height: var(--select-height);
              padding: ${SCALES.pt(0.334)} ${SCALES.pr(0.334)}
                ${SCALES.pb(0.334)} ${SCALES.pl(0.667)};
            }

            .select.active,
            .select:hover {
              border-color: ${disabled ? theme.palette.border : borderActive};
            }

            .select.active.icon,
            .select:hover .icon {
              color: ${disabled ? theme.palette.accents_5 : borderActive};
            }

            .value {
              display: inline-flex;
              flex: 1;
              height: 100%;
              align-items: center;
              line-height: 1;
              padding: 0;
              margin-right: 1.25em;
              font-size: var(--select-font-size);
              color: ${disabled
                ? theme.palette.accents_4
                : theme.palette.foreground};
              width: calc(100% - 1.25em);
            }

            .value > :global(div),
            .value > :global(div:hover) {
              border-radius: 0;
              background-color: transparent;
              padding: 0;
              margin: 0;
              color: inherit;
            }

            .placeholder {
              color: ${placeholderColor};
            }

            .icon {
              position: absolute;
              right: ${theme.layout.gapQuarter};
              font-size: var(--select-font-size);
              top: 50%;
              bottom: 0;
              transform: translateY(-50%) rotate(${visible ? "180" : "0"}deg);
              pointer-events: none;
              transition: transform 200ms ease;
              display: flex;
              align-items: center;
              color: ${iconBorder};
            }
          `}</style>
        </SelectContext.Provider>
      </>
    )
  },
)

const Select = withScale(SelectBase)

if (__DEV__) {
  Select.displayName = "Select"
}

export type { SelectProps }
export { Select }
