/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"

import { getInputColors } from "@kontui/input"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, tuple, __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type { BaseColorScheme } from "@kontui/utils"

const resizeTypes = tuple(
  "none",
  "both",
  "horizontal",
  "vertical",
  "initial",
  "inherit",
)
export type TextareaResizes = typeof resizeTypes[number]

interface TextareaProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLTextAreaElement> {
  value?: string
  initialValue?: string
  placeholder?: string
  colorScheme?: BaseColorScheme
  disabled?: boolean
  readOnly?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  className?: string
  resize?: TextareaResizes
}

const TextareaBase = React.forwardRef<
  HTMLTextAreaElement | unknown,
  TextareaProps
>((props, ref) => {
  const {
    colorScheme = "default",
    disabled = false,
    readOnly = false,
    onFocus,
    onBlur,
    className,
    initialValue = "",
    onChange,
    value,
    placeholder,
    resize = "none",
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  React.useImperativeHandle(ref, () => textareaRef.current)
  const isControlledComponent = React.useMemo(
    () => value !== undefined,
    [value],
  )
  const [selfValue, setSelfValue] = React.useState<string>(initialValue)
  const [hover, setHover] = React.useState<boolean>(false)
  const { color, borderColor, hoverBorder } = React.useMemo(
    () => getInputColors(theme.palette, colorScheme),
    [theme.palette, colorScheme],
  )
  const classes = useClasses("wrapper", { hover, disabled }, className)

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled || readOnly) return
    setSelfValue(event.target.value)
    onChange && onChange(event)
  }
  const focusHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setHover(true)
    onFocus && onFocus(e)
  }
  const blurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setHover(false)
    onBlur && onBlur(e)
  }

  React.useEffect(() => {
    if (isControlledComponent) {
      setSelfValue(value as string)
    }
  })

  const controlledValue = isControlledComponent
    ? { value: selfValue }
    : { defaultValue: initialValue }
  const textareaProps = {
    ...rest,
    ...controlledValue,
  }

  return (
    <>
      <div className={classes}>
        <textarea
          ref={textareaRef}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onChange={changeHandler}
          {...textareaProps}
        />
      </div>
      <style jsx>{`
        .wrapper {
          display: inline-flex;
          box-sizing: border-box;
          user-select: none;
          border-radius: ${theme.layout.radius};
          border: 1px solid ${borderColor};
          color: ${color};
          transition: border 0.2s ease 0s, color 0.2s ease 0s;
          min-width: 12.5rem;
          max-width: 95vw;
          --textarea-font-size: ${SCALES.font(0.875)};
          --textarea-height: ${SCALES.height(1, "auto")};
          width: ${SCALES.width(1, "initial")};
          height: var(--textarea-height);
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
        .wrapper.hover {
          border-color: ${hoverBorder};
        }
        .wrapper.disabled {
          background-color: ${theme.palette.accents_1};
          border-color: ${theme.palette.accents_2};
          cursor: not-allowed;
        }
        textarea {
          background-color: transparent;
          box-shadow: none;
          display: block;
          font-family: ${theme.font.sans};
          font-size: var(--textarea-font-size);
          width: 100%;
          height: var(--textarea-height);
          border: none;
          outline: none;
          padding: ${SCALES.pt(0.5)} ${SCALES.pr(0.5)} ${SCALES.pb(0.5)}
            ${SCALES.pl(0.5)};
          resize: ${resize};
        }
        .disabled > textarea {
          cursor: not-allowed;
        }
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:active,
        textarea:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 30px ${theme.palette.background} inset !important;
        }
      `}</style>
    </>
  )
})

const Textarea = withScale(TextareaBase)

if (__DEV__) {
  Textarea.displayName = "Textarea"
}

export type { TextareaProps }
export { Textarea }
