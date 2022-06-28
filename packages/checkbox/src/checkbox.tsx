/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useWarning, useClasses, __DEV__ } from "@kontui/utils"

import { useCheckbox } from "./checkbox-context"
import { CheckboxIcon } from "./checkbox-icon"
import { getCheckboxColors } from "./styles"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type { NormalTypes } from "@kontui/utils"

interface CheckboxEventTarget {
  checked: boolean
}

interface CheckboxEvent {
  target: CheckboxEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: React.ChangeEvent
}

interface CheckboxProps extends DefaultProps, ScaleProps {
  checked?: boolean
  disabled?: boolean
  colorScheme?: NormalTypes
  initialChecked?: boolean
  onChange?: (e: CheckboxEvent) => void
  className?: string
  value?: string
}

const CheckboxBase: React.FunctionComponent<CheckboxProps> = (props) => {
  const {
    checked,
    initialChecked = false,
    disabled = false,
    onChange,
    className,
    children,
    colorScheme = "default",
    value = "",
    ...rest
  } = props
  const theme = useTheme()
  const { SCALES } = useScale()
  const [selfChecked, setSelfChecked] = React.useState<boolean>(initialChecked)
  const { updateState, inGroup, disabledAll, values } = useCheckbox()
  const isDisabled = inGroup ? disabledAll || disabled : disabled
  const classes = useClasses("checkbox", className)

  if (inGroup && checked) {
    useWarning(
      'Remove props "checked" when [Checkbox] component is in the group.',
      "Checkbox",
    )
  }
  if (inGroup) {
    React.useEffect(() => {
      const next = values.includes(value)
      if (next === selfChecked) return
      setSelfChecked(next)
    }, [values.join(",")])
  }

  const { fill, bg } = React.useMemo(
    () => getCheckboxColors(theme.palette, colorScheme),
    [theme.palette, colorScheme],
  )

  const changeHandle = React.useCallback(
    (ev: React.ChangeEvent) => {
      if (isDisabled) return
      const selfEvent: CheckboxEvent = {
        target: {
          checked: !selfChecked,
        },
        stopPropagation: ev.stopPropagation,
        preventDefault: ev.preventDefault,
        nativeEvent: ev,
      }
      if (inGroup && updateState) {
        updateState && updateState(value, !selfChecked)
      }

      setSelfChecked(!selfChecked)
      onChange && onChange(selfEvent)
    },
    [updateState, onChange, isDisabled, selfChecked],
  )

  React.useEffect(() => {
    if (checked === undefined) return
    setSelfChecked(checked)
  }, [checked])

  return (
    <>
      <label className={classes}>
        <CheckboxIcon
          fill={fill}
          bg={bg}
          disabled={isDisabled}
          checked={selfChecked}
        />
        <input
          type="checkbox"
          disabled={isDisabled}
          checked={selfChecked}
          onChange={changeHandle}
          {...rest}
        />
        <span className="checkbox-text">{children}</span>
      </label>
      <style jsx>{`
        .checkbox {
          --checkbox-size: ${SCALES.font(0.875)};
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: ${isDisabled ? "not-allowed" : "pointer"};
          opacity: ${isDisabled ? 0.75 : 1};
          line-height: var(--checkbox-size);
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "var(--checkbox-size)")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .checkbox-text {
          font-size: var(--checkbox-size);
          line-height: var(--checkbox-size);
          padding-left: calc(var(--checkbox-size) * 0.5);
          user-select: none;
          cursor: ${isDisabled ? "not-allowed" : "pointer"};
        }

        input {
          opacity: 0;
          outline: none;
          position: absolute;
          width: 0;
          height: 0;
          margin: 0;
          padding: 0;
          z-index: -1;
          font-size: 0;
          background-color: transparent;
        }
      `}</style>
    </>
  )
}

const Checkbox = withScale(CheckboxBase)

if (__DEV__) {
  Checkbox.displayName = "Checkbox"
}

export type { CheckboxEvent, CheckboxEventTarget, CheckboxProps }
export { Checkbox }
