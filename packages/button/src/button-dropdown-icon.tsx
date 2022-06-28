import * as React from "react"
import { __DEV__ } from "@kontui/utils"

interface ButtonDropdownIconProps
  extends React.HTMLAttributes<HTMLOrSVGImageElement> {
  color?: string
  height?: string
}

const ButtonDropdownIcon: React.FunctionComponent<ButtonDropdownIconProps> = (
  props,
) => {
  const { color, height } = props
  return (
    <svg
      stroke={color}
      style={{ color }}
      viewBox="0 0 24 24"
      width={height}
      height={height}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <path d="M6 9l6 6 6-6" />

      <style jsx>{`
        svg {
          transform: scale(0.6);
        }
      `}</style>
    </svg>
  )
}

if (__DEV__) {
  ButtonDropdownIcon.displayName = "ButtonDropdownIcon"
}

export type { ButtonDropdownIconProps }
export { ButtonDropdownIcon }
