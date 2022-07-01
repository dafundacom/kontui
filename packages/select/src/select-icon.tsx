import * as React from "react"
import { __DEV__ } from "@kontui/utils"

interface SelectIconProps extends React.HTMLAttributes<HTMLOrSVGImageElement> {}

const SelectIconBase: React.FC<SelectIconProps> = () => {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
      <style jsx>{`
        svg {
          color: inherit;
          stroke: currentColor;
          transition: all 200ms ease;
          width: 1.214em;
          height: 1.214em;
        }
      `}</style>
    </>
  )
}

const SelectIcon = React.memo(SelectIconBase)

if (__DEV__) {
  SelectIcon.displayName = "SelectIcon"
}

export type { SelectIconProps }
export { SelectIcon }
