import * as React from "react"

import { useScale, useTheme, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface AvatarGroupProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  count?: number
}

export const AvatarGroupBase: React.FC<AvatarGroupProps> = ({
  children,
  className,
  count,
  ...rest
}) => {
  const theme = useTheme()
  const { SCALES } = useScale()

  return (
    <div className={useClasses("avatar-group", className)} {...rest}>
      {children}
      {count && <span className="count">+{count}</span>}
      <style jsx>{`
        .avatar-group {
          display: flex;
          align-items: center;
          width: ${SCALES.width(1, "max-content")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .avatar-group :global(.avatar) {
          margin-left: -${SCALES.ml(0.625)};
        }

        .count {
          font-size: ${SCALES.font(0.875)};
          display: inline-flex;
          align-items: center;
          padding-left: 5.5px;
          color: ${theme.palette.accents_7};
        }
      `}</style>
    </div>
  )
}

const AvatarGroup = withScale(AvatarGroupBase)

export type { AvatarGroupProps }
export { AvatarGroup }

if (__DEV__) {
  AvatarGroup.displayName = "AvatarGroup"
}
