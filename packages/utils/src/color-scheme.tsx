const tuple = <T extends string[]>(...args: T) => args
const tupleNumber = <T extends number[]>(...args: T) => args

const buttonColorScheme = tuple(
  "default",
  "secondary",
  "success",
  "warning",
  "error",
  "abort",
  "secondary-light",
  "success-light",
  "warning-light",
  "error-light",
)

const baseColorScheme = tuple(
  "default",
  "secondary",
  "success",
  "warning",
  "error",
)

const snippetColorScheme = tuple(
  "default",
  "secondary",
  "success",
  "warning",
  "error",
  "dark",
  "lite",
)

const boxColorScheme = tuple(
  "default",
  "secondary",
  "success",
  "warning",
  "error",
  "dark",
  "lite",
  "alert",
  "purple",
  "violet",
  "cyan",
)

const copyColorScheme = tuple("default", "silent", "prevent")

const triggerColorScheme = tuple("hover", "click")

const placement = tuple(
  "top",
  "topStart",
  "topEnd",
  "left",
  "leftStart",
  "leftEnd",
  "bottom",
  "bottomStart",
  "bottomEnd",
  "right",
  "rightStart",
  "rightEnd",
)

const dividerAlign = tuple("start", "center", "end", "left", "right")
type ButtonColorScheme = typeof buttonColorScheme[number]
type BaseColorScheme = typeof baseColorScheme[number]
type SnippetColorScheme = typeof snippetColorScheme[number]
type BoxColorScheme = typeof boxColorScheme[number]
type CopyColorScheme = typeof copyColorScheme[number]
type TriggerColorScheme = typeof triggerColorScheme[number]
type Placement = typeof placement[number]
type DividerAlign = typeof dividerAlign[number]

export { tuple, tupleNumber }

export type {
  ButtonColorScheme,
  BaseColorScheme,
  SnippetColorScheme,
  BoxColorScheme,
  CopyColorScheme,
  TriggerColorScheme,
  Placement,
  DividerAlign,
}
