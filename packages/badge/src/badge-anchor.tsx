import * as React from "react"
import { pickChild, tuple, __DEV__ } from "@kontui/utils"

import { Badge } from "./badge"

type BadgeAnchorPlacement = typeof placement[number]
type TransformStyles = {
  top?: string
  bottom?: string
  left?: string
  right?: string
  value: string
  origin: string
}

interface BadgeAnchorProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: BadgeAnchorPlacement
}

const placement = tuple("topLeft", "topRight", "bottomLeft", "bottomRight")

const getTransform = (placement: BadgeAnchorPlacement): TransformStyles => {
  const styles: { [key in BadgeAnchorPlacement]: TransformStyles } = {
    topLeft: {
      top: "0",
      left: "0",
      value: "translate(-50%, -50%)",
      origin: "0% 0%",
    },
    topRight: {
      top: "0",
      right: "0",
      value: "translate(50%, -50%)",
      origin: "100% 0%",
    },
    bottomLeft: {
      left: "0",
      bottom: "0",
      value: "translate(-50%, 50%)",
      origin: "0% 100%",
    },
    bottomRight: {
      right: "0",
      bottom: "0",
      value: "translate(50%, 50%)",
      origin: "100% 100%",
    },
  }
  return styles[placement]
}

const BadgeAnchor = React.forwardRef<HTMLDivElement, BadgeAnchorProps>(
  (props, ref) => {
    const { children, placement = "topRight" } = props

    const [withoutBadgeChildren, badgeChldren] = pickChild(children, Badge)
    const { top, bottom, left, right, value, origin } = React.useMemo(
      () => getTransform(placement),
      [placement],
    )

    return (
      <div ref={ref} className="badge-anchor">
        {withoutBadgeChildren}
        <sup>{badgeChldren}</sup>

        <style jsx>{`
          .badge-anchor {
            position: relative;
            display: inline-flex;
            vertical-align: middle;
            flex-shrink: 0;
            box-sizing: border-box;
          }

          sup {
            position: absolute;
            top: ${top || "auto"};
            left: ${left || "auto"};
            right: ${right || "auto"};
            bottom: ${bottom || "auto"};
            transform: ${value};
            transform-origin: ${origin};
            z-index: 1;
          }
        `}</style>
      </div>
    )
  },
)

if (__DEV__) {
  BadgeAnchor.displayName = "BadgeAnchor"
}

export type { BadgeAnchorPlacement, BadgeAnchorProps }
export { BadgeAnchor }
