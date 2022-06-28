import * as React from "react"
import css from "styled-jsx/css"
import { useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"
import { GridItem } from "./grid-item"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type { GridItemProps } from "./grid-item"

interface GridProps
  extends DefaultProps,
    ScaleProps,
    GridItemProps,
    React.HTMLAttributes<HTMLDivElement> {}

const GridBase: React.FunctionComponent<GridProps> = (props) => {
  const { children, className, ...rest } = props

  const { SCALES } = useScale()
  const { className: resolveClassName, styles } = css.resolve`
    div {
      margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
      box-sizing: border-box;
      padding: ${SCALES.pt(0, "var(--grid-gap-unit)")}
        ${SCALES.pr(0, "var(--grid-gap-unit)")}
        ${SCALES.pb(0, "var(--grid-gap-unit)")}
        ${SCALES.pl(0, "var(--grid-gap-unit)")};
    }
  `
  const classes = useClasses(resolveClassName, className)

  return (
    <>
      <GridItem className={classes} {...rest}>
        {children}
      </GridItem>
      {styles}
    </>
  )
}

const Grid = withScale(GridBase)

if (__DEV__) {
  Grid.displayName = "Grid"
}

export type { GridProps }
export { Grid }
