/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"

import { useScale, withScale } from "@kontui/theme"
import { useClasses, useWarning, __DEV__ } from "@kontui/utils"

import { CheckboxContext } from "./checkbox-context"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface CheckboxGroupProps extends DefaultProps, ScaleProps {
  value: string[]
  disabled?: boolean | undefined
  onChange?: (values: string[]) => void
  className?: string
}

const CheckboxGroupBase: React.FunctionComponent<CheckboxGroupProps> = ({
  disabled,
  onChange,
  value,
  children,
  className,
  ...rest
}) => {
  const { SCALES } = useScale()
  const [selfVal, setSelfVal] = React.useState<string[]>([])
  const classes = useClasses("checkbox-group", className)

  if (!value) {
    value = []
    useWarning('Props "value" is required.', "Checkbox Group")
  }

  const updateState = (val: string, checked: boolean) => {
    const removed = selfVal.filter((v) => v !== val)
    const next = checked ? [...removed, val] : removed
    setSelfVal(next)
    onChange && onChange(next)
  }

  const providerValue = React.useMemo(() => {
    return {
      updateState,
      disabledAll: disabled,
      inGroup: true,
      values: selfVal,
    }
  }, [disabled, selfVal])

  React.useEffect(() => {
    setSelfVal(value)
  }, [value.join(",")])

  return (
    <CheckboxContext.Provider value={providerValue}>
      <div className={classes} {...rest}>
        {children}
        <style jsx>{`
          .group {
            width: ${SCALES.width(1, "auto")};
            height: ${SCALES.height(1, "auto")};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
              ${SCALES.pl(0)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
              ${SCALES.ml(0)};
          }
          .group :global(label) {
            margin-right: calc(${SCALES.font(1)} * 2);
            --checkbox-size: ${SCALES.font(1)};
          }
          .group :global(label:last-of-type) {
            margin-right: 0;
          }
        `}</style>
      </div>
    </CheckboxContext.Provider>
  )
}

const CheckboxGroup = withScale(CheckboxGroupBase)

if (__DEV__) {
  CheckboxGroup.displayName = "CheckboxGroup"
}

export type { CheckboxGroupProps }
export { CheckboxGroup }
