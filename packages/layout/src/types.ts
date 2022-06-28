import { tuple } from "@kontui/utils"

const justify = tuple(
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
)

const alignItems = tuple(
  "flex-start",
  "center",
  "flex-end",
  "stretch",
  "baseline",
)
const alignContent = tuple(
  "stretch",
  "center",
  "flex-start",
  "flex-end",
  "space-between",
  "space-around",
)
const direction = tuple("row", "row-reverse", "column", "column-reverse")
const wrap = tuple("nowrap", "wrap", "wrap-reverse")

type GridJustify = typeof justify[number]
type GridAlignItems = typeof alignItems[number]
type GridAlignContent = typeof alignContent[number]
type GridDirection = typeof direction[number]
type GridWrap = typeof wrap[number]

export type {
  GridJustify,
  GridAlignItems,
  GridAlignContent,
  GridDirection,
  GridWrap,
}
