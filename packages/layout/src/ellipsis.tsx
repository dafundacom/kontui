import * as React from "react"
import { __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

type EllipsisProps = DefaultProps &
  React.HTMLAttributes<HTMLSpanElement> & {
    height: string
  }

const EllipsisBase: React.FunctionComponent<EllipsisProps> = (props) => {
  const { children, height } = props
  return (
    <>
      <span>{children}</span>
      <style jsx>{`
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: ${height};
          min-width: 0;
        }
      `}</style>
    </>
  )
}

const Ellipsis = React.memo(EllipsisBase)

if (__DEV__) {
  Ellipsis.displayName = "Ellipsis"
}

export type { EllipsisProps }
export { Ellipsis }
