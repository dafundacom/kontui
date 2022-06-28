const tuple = <T extends string[]>(...args: T) => args

const tupleNumber = <T extends number[]>(...args: T) => args

const buttonTypes = tuple(
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

const normalTypes = tuple("default", "secondary", "success", "warning", "error")

const snippetTypes = tuple(
  "default",
  "secondary",
  "success",
  "warning",
  "error",
  "dark",
  "lite",
)

const cardTypes = tuple(
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

const copyTypes = tuple("default", "silent", "prevent")

const triggerTypes = tuple("hover", "click")

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

type ButtonTypes = typeof buttonTypes[number]

type NormalTypes = typeof normalTypes[number]

type SnippetTypes = typeof snippetTypes[number]

type CardTypes = typeof cardTypes[number]

type CopyTypes = typeof copyTypes[number]

type TriggerTypes = typeof triggerTypes[number]

type Placement = typeof placement[number]

type DividerAlign = typeof dividerAlign[number]

export { tuple, tupleNumber }

export type {
  ButtonTypes,
  NormalTypes,
  SnippetTypes,
  CardTypes,
  CopyTypes,
  TriggerTypes,
  Placement,
  DividerAlign,
}
