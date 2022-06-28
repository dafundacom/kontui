import * as React from "react"

import { Badge as InternalBadge } from "./badge"
import { BadgeAnchor } from "./badge-anchor"

import type { BadgeProps } from "./badge"
import type { BadgeAnchorProps } from "./badge-anchor"

interface Badge
  extends React.ForwardRefExoticComponent<
    BadgeProps & React.RefAttributes<HTMLDivElement>
  > {
  Anchor: typeof BadgeAnchor
}

const Badge = InternalBadge as Badge
Badge.Anchor = BadgeAnchor

export type { BadgeProps, BadgeAnchorProps }
export { Badge, BadgeAnchor }
