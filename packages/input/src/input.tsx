/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import { InputLabel } from "./input-label"
import { InputBlockLabel } from "./input-block-label"
import { InputIcon } from "./input-icon"
import { InputIconClear } from "./input-icon-clear"

import type {
  DefaultProps,
  KontUIThemesPalette,
  ScaleProps,
} from "@kontui/theme"
import type { NormalTypes } from "@kontui/utils"

type InputColor = {
  color: string
  borderColor: string
  hoverBorder: string
}

const getInputColors = (
  palette: KontUIThemesPalette,
  status?: NormalTypes,
): InputColor => {
  const colors: { [key in NormalTypes]: InputColor } = {
    default: {
      color: palette.foreground,
      borderColor: palette.border,
      hoverBorder: palette.accents_5,
    },
    secondary: {
      color: palette.foreground,
      borderColor: palette.secondary,
      hoverBorder: palette.secondary,
    },
    success: {
      color: palette.foreground,
      borderColor: palette.successLight,
      hoverBorder: palette.success,
    },
    warning: {
      color: palette.foreground,
      borderColor: palette.warningLight,
      hoverBorder: palette.warning,
    },
    error: {
      color: palette.error,
      borderColor: palette.error,
      hoverBorder: palette.errorDark,
    },
  }

  if (!status) return colors.default
  return colors[status]
}

interface InputProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLInputElement> {
  as?: React.ElementType
  value?: string
  initialValue?: string
  placeholder?: string
  colorScheme?: NormalTypes
  type?: string
  readOnly?: boolean
  disabled?: boolean
  label?: string
  labelRight?: string
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  iconClickable?: boolean
  className?: string
  clearable?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  autoComplete?: string
}

const simulateChangeEvent = (
  el: HTMLInputElement,
  event: React.MouseEvent<HTMLDivElement>,
): React.ChangeEvent<HTMLInputElement> => {
  return {
    ...event,
    target: el,
    currentTarget: el,
  }
}

const InputBase = React.forwardRef<HTMLInputElement | unknown, InputProps>(
  (props, ref) => {
    const {
      as: Comp = "input",
      label,
      labelRight,
      colorScheme,
      type,
      icon,
      iconRight,
      iconClickable,
      onIconClick,
      initialValue,
      onChange,
      readOnly,
      value,
      onClearClick,
      clearable,
      className,
      onBlur,
      onFocus,
      autoComplete,
      placeholder,
      children,
      disabled,
      ...rest
    } = props

    const theme = useTheme()
    const { SCALES } = useScale()
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current)

    const [selfValue, setSelfValue] = React.useState<string | undefined>(
      initialValue,
    )
    const [hover, setHover] = React.useState<boolean>(false)
    const isControlledComponent = React.useMemo(
      () => value !== undefined,
      [value],
    )
    const labelClasses = React.useMemo(
      () => (labelRight ? "right-label" : label ? "left-label" : ""),
      [label, labelRight],
    )
    const iconClasses = React.useMemo(
      () => (iconRight ? "right-icon" : icon ? "left-icon" : ""),
      [icon, iconRight],
    )
    const { color, borderColor, hoverBorder } = React.useMemo(
      () => getInputColors(theme.palette, colorScheme),
      [theme.palette, colorScheme],
    )

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return
      setSelfValue(event.target.value)
      onChange && onChange(event)
    }
    const clearHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      setSelfValue("")
      onClearClick && onClearClick(event)
      /* istanbul ignore next */
      if (!inputRef.current) return

      const changeEvent = simulateChangeEvent(inputRef.current, event)
      changeEvent.target.value = ""
      onChange && onChange(changeEvent)
      inputRef.current.focus()
    }

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setHover(true)
      onFocus && onFocus(e)
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setHover(false)
      onBlur && onBlur(e)
    }

    const iconClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onIconClick && onIconClick(e)
    }
    const iconProps = React.useMemo(
      () => ({
        clickable: iconClickable,
        onClick: iconClickHandler,
      }),
      [iconClickable, iconClickHandler],
    )

    React.useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value as string)
      }
    })

    const controlledValue = isControlledComponent
      ? { value: selfValue }
      : { defaultValue: initialValue }
    const inputProps = {
      ...rest,
      ...controlledValue,
    }

    return (
      <>
        <div className="with-label">
          {children && <InputBlockLabel>{children}</InputBlockLabel>}
          <div className={useClasses("input-container", className)}>
            {label && <InputLabel>{label}</InputLabel>}
            <div
              className={useClasses(
                "input-wrapper",
                { hover, disabled },
                labelClasses,
              )}
            >
              {icon && <InputIcon icon={icon} {...iconProps} />}
              <Comp
                type={type}
                ref={inputRef}
                className={useClasses({ disabled }, iconClasses)}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                onFocus={focusHandler}
                onBlur={blurHandler}
                onChange={changeHandler}
                autoComplete={autoComplete}
                {...inputProps}
              />
              {clearable && (
                <InputIconClear
                  visible={Boolean(
                    inputRef.current && inputRef.current.value !== "",
                  )}
                  disabled={disabled || readOnly}
                  onClick={clearHandler}
                />
              )}
              {iconRight && <InputIcon icon={iconRight} {...iconProps} />}
            </div>
            {labelRight && <InputLabel isRight={true}>{labelRight}</InputLabel>}
          </div>
        </div>
        <style jsx>{`
          .with-label {
            display: inline-block;
            box-sizing: border-box;
            -webkit-box-align: center;
            --input-height: ${SCALES.height(2.25)};
            font-size: ${SCALES.font(0.875)};
            width: ${SCALES.width(1, "initial")};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
              ${SCALES.pl(0)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
              ${SCALES.ml(0)};
          }

          .input-container {
            display: inline-flex;
            align-items: center;
            width: ${SCALES.width(1, "initial")};
            height: var(--input-height);
          }

          .input-wrapper {
            display: inline-flex;
            vertical-align: middle;
            align-items: center;
            height: 100%;
            flex: 1;
            user-select: none;
            border-radius: ${theme.layout.radius};
            border: 1px solid ${borderColor};
            transition: border 0.2s ease 0s, color 0.2s ease 0s;
          }

          .input-wrapper.left-label {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }

          .input-wrapper.right-label {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          .input-wrapper.disabled {
            background-color: ${theme.palette.accents_1};
            border-color: ${theme.palette.accents_2};
            cursor: not-allowed;
          }

          input.disabled {
            cursor: not-allowed;
          }

          .input-wrapper.hover {
            border-color: ${hoverBorder};
          }

          input {
            margin: 0.25em 0.625em;
            padding: 0;
            box-shadow: none;
            font-size: ${SCALES.font(0.875)};
            background-color: transparent;
            border: none;
            color: ${color};
            outline: none;
            border-radius: 0;
            width: 100%;
            min-width: 0;
            -webkit-appearance: none;
          }

          input.left-icon {
            margin-left: 0;
          }

          input.right-icon {
            margin-right: 0;
          }

          ::placeholder,
          ::-moz-placeholder,
          :-ms-input-placeholder,
          ::-webkit-input-placeholder {
            color: ${theme.palette.accents_3};
          }

          ::-ms-reveal {
            display: none !important;
          }

          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:active,
          input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 30px ${theme.palette.background} inset !important;
            -webkit-text-fill-color: ${color} !important;
          }
        `}</style>
      </>
    )
  },
)

const Input = withScale(InputBase)

if (__DEV__) {
  Input.displayName = "Input"
}

export type { InputProps }
export { Input, getInputColors }
