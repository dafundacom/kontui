/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { useClasses, useRealShape, __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

type ExpandProps = DefaultProps & {
  isExpanded?: boolean
  delay?: number
}

const Expand: React.FunctionComponent<ExpandProps> = (props) => {
  const { isExpanded = false, delay = 200, children } = props
  const [height, setHeight] = React.useState<string>(isExpanded ? "auto" : "0")
  const [selfExpanded, setSelfExpanded] = React.useState<boolean>(isExpanded)
  const [visible, setVisible] = React.useState<boolean>(isExpanded)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const entryTimer = React.useRef<number>()
  const leaveTimer = React.useRef<number>()
  const resetTimer = React.useRef<number>()
  const [state, updateShape] = useRealShape<HTMLDivElement>(contentRef)
  const classes = useClasses("container", { expanded: selfExpanded })

  React.useEffect(() => setHeight(`${state.height}px`), [state.height])
  React.useEffect(() => {
    if (isExpanded) {
      setVisible(isExpanded)
    } else {
      updateShape()
      setHeight(`${state.height}px`)
    }

    entryTimer.current = window.setTimeout(() => {
      setSelfExpanded(isExpanded)
      clearTimeout(entryTimer.current)
    }, 30)

    if (isExpanded) {
      resetTimer.current = window.setTimeout(() => {
        setHeight("auto")
        clearTimeout(resetTimer.current)
      }, delay)
    } else {
      leaveTimer.current = window.setTimeout(() => {
        setVisible(isExpanded)
        clearTimeout(leaveTimer.current)
      }, delay / 2)
    }

    return () => {
      clearTimeout(entryTimer.current)
      clearTimeout(leaveTimer.current)
      clearTimeout(resetTimer.current)
    }
  }, [isExpanded])

  return (
    <div className={classes}>
      <div ref={contentRef} className="content">
        {children}
      </div>
      <style jsx>{`
        .container {
          padding: 0;
          margin: 0;
          height: 0;
          overflow: hidden;
          visibility: ${visible ? "visible" : "hidden"};
          transition: height ${delay}ms ease;
        }

        .expanded {
          height: ${height};
          visibility: visible;
        }
      `}</style>
    </div>
  )
}

if (__DEV__) {
  Expand.displayName = "Expand"
}

export type { ExpandProps }
export { Expand }
