import * as React from "react"
import { __DEV__ } from "@kontui/utils"

interface RatingIconProps extends React.HTMLAttributes<HTMLOrSVGImageElement> {}

const RatingIcon: React.FC<RatingIconProps> = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

if (__DEV__) {
  RatingIcon.displayName = "RatingIcon"
}

export { RatingIconProps }
export { RatingIcon }
