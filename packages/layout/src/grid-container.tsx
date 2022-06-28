import * as React from "react"
import css from "styled-jsx/css"
import { useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import { GridItem } from "./grid-item"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type { GridItemProps } from "./grid-item"
import type { GridWrap } from "./types"

interface GridContainerProps
  extends DefaultProps,
    ScaleProps,
    GridItemProps,
    React.HTMLAttributes<HTMLDivElement> {
  gap?: number
  wrap?: GridWrap
}

const GridContainerBase: React.FunctionComponent<GridContainerProps> = (
  props,
) => {
  const { gap = 0, wrap = "wrap", children, className, ...rest } = props

  const { unit, SCALES } = useScale()
  const gapUnit = React.useMemo(
    () => `calc(${gap} * ${unit} * 1/3)`,
    [gap, unit],
  )
  const { className: resolveClassName, styles } = css.resolve`
    div {
      --grid-gap-unit: ${gapUnit};
      --grid-container-margin: calc(-1 * var(--grid-gap-unit));
      --grid-container-width: calc(100% + var(--grid-gap-unit) * 2);
      display: flex;
      flex-wrap: ${wrap};
      box-sizing: border-box;
      width: ${SCALES.width(1, "var(--grid-container-width)")};
      margin: ${SCALES.mt(0, "var(--grid-container-margin)")}
        ${SCALES.mr(0, "var(--grid-container-margin)")}
        ${SCALES.mb(0, "var(--grid-container-margin)")}
        ${SCALES.ml(0, "var(--grid-container-margin)")};
    }
  `
  const classes = useClasses(resolveClassName, className)

  return (
    <GridItem className={classes} {...rest}>
      {children}
      {styles}
    </GridItem>
  )
}

const GridContainer = withScale(GridContainerBase)

if (__DEV__) {
  GridContainer.displayName = "GridContainer"
}

export type { GridContainerProps }
export { GridContainer }
