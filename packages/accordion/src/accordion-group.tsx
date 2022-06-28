/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { useScale, withScale } from "@kontui/theme"
import {
  setChildrenIndex,
  useClasses,
  useCurrentState,
  __DEV__,
} from "@kontui/utils"

import { Accordion } from "./accordion"
import { AccordionContext } from "./accordion-context"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type { AccordionConfig } from "./accordion-context"

interface AccordionGroupProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  accordion?: boolean
}

const AccordionGroupBase: React.FC<AccordionGroupProps> = (props) => {
  const { children, accordion = true, className, ...rest } = props
  const { SCALES } = useScale()
  const [state, setState, stateRef] = useCurrentState<Array<number>>([])
  const classes = useClasses("accordion-group", className)

  const updateValues = (currentIndex: number, nextState: boolean) => {
    const hasChild = stateRef?.current?.find((val) => val === currentIndex)
    if (accordion) {
      if (nextState) return setState([currentIndex])
      return setState([])
    }

    if (nextState) {
      if (hasChild) return
      return setState([...stateRef.current, currentIndex])
    }
    setState(stateRef.current.filter((item) => item !== currentIndex))
  }

  const initialValue = React.useMemo<AccordionConfig>(
    () => ({
      values: state,
      updateValues,
    }),
    [state.join(",")],
  )
  const hasIndexChildren = React.useMemo(
    () => setChildrenIndex(children, [Accordion]),
    [children],
  )

  return (
    <>
      <AccordionContext.Provider value={initialValue}>
        <div className={classes} {...rest}>
          {hasIndexChildren}
        </div>
      </AccordionContext.Provider>
      <style jsx>{`
        .accordion-group {
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0.6)} ${SCALES.pb(0)}
            ${SCALES.pl(0.6)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .accordion-group > :global(div + div) {
          border-top: none;
        }
      `}</style>
    </>
  )
}

const AccordionGroup = withScale(AccordionGroupBase)

if (__DEV__) {
  AccordionGroup.displayName = "AccordionGroup"
}

export type { AccordionGroupProps }
export { AccordionGroup }
