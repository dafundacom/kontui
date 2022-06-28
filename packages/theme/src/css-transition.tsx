import { __DEV__ } from "@kontui/utils"
import * as React from "react"
import { DefaultProps } from "./utils"

interface CssTransitionProps extends DefaultProps {
  visible?: boolean
  enterTime?: number
  leaveTime?: number
  clearTime?: number
  className?: string
  name?: string
}

const CssTransition: React.FunctionComponent<CssTransitionProps> = (props) => {
  const {
    children,
    className,
    visible = false,
    enterTime = 60,
    leaveTime = 60,
    clearTime = 60,
    name = "transition",
    ...rest
  } = props

  const [classes, setClasses] = React.useState<string>("")
  const [renderable, setRenderable] = React.useState<boolean>(visible)

  React.useEffect(() => {
    const statusClassName = visible ? "enter" : "leave"
    const time = visible ? enterTime : leaveTime
    if (visible && !renderable) {
      setRenderable(true)
    }

    setClasses(`${name}-${statusClassName}`)

    // set class to active
    const timer = setTimeout(() => {
      setClasses(`${name}-${statusClassName} ${name}-${statusClassName}-active`)
      clearTimeout(timer)
    }, time)

    // remove classess when animation over
    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClasses("")
        setRenderable(false)
      }
      clearTimeout(clearClassesTimer)
    }, time + clearTime)

    return () => {
      clearTimeout(timer)
      clearTimeout(clearClassesTimer)
    }
  }, [visible, renderable, enterTime, leaveTime, name, clearTime])
  if (!React.isValidElement(children) || !renderable) return null

  return React.cloneElement(children, {
    ...rest,
    className: `${children.props.className} ${className} ${classes}`,
  })
}

if (__DEV__) {
  CssTransition.displayName = "CssTransition"
}

export type { CssTransitionProps }
export { CssTransition }
