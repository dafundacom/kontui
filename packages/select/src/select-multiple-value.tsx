import * as React from "react"
import { Grid } from "@kontui/layout"
import { useTheme } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"
import { SelectIconClear } from "./select-icon-clear"

import type { DefaultProps } from "@kontui/theme"

interface SelectMultipleValueProps
  extends DefaultProps,
    React.HTMLAttributes<HTMLDivElement> {
  disabled: boolean
  onClear: (() => void) | null
}

const SelectMultipleValue: React.FunctionComponent<SelectMultipleValueProps> = (
  props,
) => {
  const { disabled, onClear, children } = props

  const theme = useTheme()

  return (
    <>
      <Grid>
        <div className="item">
          {children}
          {!!onClear && <SelectIconClear onClick={onClear} />}
        </div>
      </Grid>
      <style jsx>{`
        .item {
          display: inline-flex;
          justify-items: center;
          align-items: center;
          line-height: 1;
          padding: 0 0.5em;
          font-size: var(--select-font-size);
          height: calc(var(--select-font-size) * 2);
          border-radius: ${theme.layout.radius};
          background-color: ${theme.palette.accents_2};
          color: ${disabled
            ? theme.palette.accents_4
            : theme.palette.accents_6};
        }

        .item > :global(div:not(.clear-icon)),
        .item > :global(div:not(.clear-icon):hover) {
          border-radius: 0;
          background-color: transparent;
          padding: 0;
          margin: 0;
          color: inherit;
        }
      `}</style>
    </>
  )
}

if (__DEV__) {
  SelectMultipleValue.displayName = "SelectMultipleValue"
}

export type { SelectMultipleValueProps }
export { SelectMultipleValue }
