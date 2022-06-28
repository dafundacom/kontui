/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { useTheme } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"
import { getIconPosition } from "./tooltip-placement"

import type { Placement } from "@kontui/utils"

interface TooltipIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  placement: Placement
  shadow: boolean
}

const TooltipIcon: React.FC<TooltipIconProps> = (props) => {
  const { placement, shadow } = props

  const theme = useTheme()
  const { transform, top, left, right, bottom } = React.useMemo(
    () =>
      getIconPosition(
        placement,
        "var(--tooltip-icon-offset-x)",
        "var(--tooltip-icon-offset-y)",
      ),
    [placement],
  )
  const bgColorWithDark = React.useMemo(() => {
    if (!shadow || theme.type !== "dark") return "var(--tooltip-content-bg)"
    return theme.palette.accents_2
  }, [theme.type, shadow])

  return (
    <span>
      <style jsx>{`
        span {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 6px 7px 6px 0;
          border-color: transparent ${bgColorWithDark} transparent transparent;
          position: absolute;
          left: ${left};
          top: ${top};
          right: ${right};
          bottom: ${bottom};
          transform: ${transform};
        }
      `}</style>
    </span>
  )
}

if (__DEV__) {
  TooltipIcon.displayName = "TooltipIcon"
}

export type { TooltipIconProps }
export { TooltipIcon }
