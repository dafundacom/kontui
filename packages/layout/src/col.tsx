import * as React from "react"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

interface ColProps extends DefaultProps, React.HTMLAttributes<HTMLElement> {
  span?: number
  offset?: number
  as?: React.ElementType
}

const Col: React.FunctionComponent<ColProps> = (props) => {
  const {
    as: Comp = "div",
    children,
    span = 24,
    offset = 0,
    className,
    ...rest
  } = props

  return (
    <>
      <Comp className={useClasses("content", className)} {...rest}>
        {children}
      </Comp>
      <style jsx>{`
        .col {
          float: left;
          box-sizing: border-box;
          padding-left: calc(var(--row-gap) / 2);
          padding-right: calc(var(--row-gap) / 2);
          width: ${(100 / 24) * span}%;
          margin-left: ${(100 / 24) * offset}%;
        }
      `}</style>
    </>
  )
}

if (__DEV__) {
  Col.displayName = "Col"
}

export type { ColProps }
export { Col }
