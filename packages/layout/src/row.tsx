import * as React from "react"
import { useTheme } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

type Justify = "start" | "end" | "center" | "space-around" | "space-between"
type Align = "top" | "middle" | "bottom"

interface RowProps extends DefaultProps, React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  gap?: number
  justify?: Justify
  align?: Align
}

const getFlexAlignment = (justify: Justify, align: Align) => {
  const flexJustifyMap: { [key in Justify]?: string } = {
    end: "flex-end",
    center: "center",
    "space-around": "space-around",
    "space-between": "space-between",
  }
  const flexAlignMap: { [key in Align]?: string } = {
    middle: "center",
    bottom: "flex-end",
  }
  return {
    justifyValue: flexJustifyMap[justify] || "normal",
    alignValue: flexAlignMap[align] || "normal",
  }
}

const Row: React.FC<RowProps> = (props) => {
  const {
    as: Comp = "div",
    children,
    gap = 0,
    justify = "start",
    align = "top",
    className,
    ...rest
  } = props

  const theme = useTheme()
  const { justifyValue, alignValue } = React.useMemo(
    () => getFlexAlignment(justify, align),
    [justify, align],
  )

  return (
    <>
      <Comp className={`row ${className}`} {...rest}>
        {children}
      </Comp>
      <style jsx>{`
        .row {
          display: flex;
          position: relative;
          box-sizing: border-box;
          margin-left: calc(${gap} * ${theme.layout.gap} / 2);
          margin-right: calc(${gap} * ${theme.layout.gap} / 2);
          --row-gap: calc(${gap} * ${theme.layout.gap});
          justify-content: ${justifyValue};
          align-items: ${alignValue};
        }
      `}</style>
    </>
  )
}

if (__DEV__) {
  Row.displayName = "Row"
}

export type { RowProps }
export { Row }
