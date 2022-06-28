type ClassNameObject = Record<
  string,
  boolean | string | number | null | undefined
>
type ClassName = string | ClassNameObject | null | undefined | boolean | number

const classObjectToString = (className: ClassNameObject) => {
  const keys = Object.keys(className)
  const len = keys.length
  let str = ""
  for (let index = 0; index < len; index++) {
    const key = keys[index]
    const val = className[keys[index]]
    if (!val) continue
    str = str ? `${str} ${String(key)}` : String(key)
  }
  return str
}

const isObjectClassName = (value: ClassName): value is ClassNameObject =>
  typeof value === "object" && !Array.isArray(value)

const cx = (...classNames: Array<ClassName>): string => {
  const len = classNames.length
  let classes = ""
  if (len === 0) return classes
  for (let index = 0; index < len; index++) {
    const val = classNames[index]
    if (!val) continue
    if (isObjectClassName(val)) {
      classes += ` ${classObjectToString(val)}`
    } else {
      classes += ` ${String(val).trim()}`
    }
  }
  return classes.trim()
}

export { cx }
export type { ClassNameObject, ClassName }
