import * as React from "react"
import { __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

interface SpinnerProps
  extends DefaultProps,
    React.HTMLAttributes<SVGSVGElement> {}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 66 66"
      className={className}
      {...rest}
    >
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeWidth="10"
        className="opacity-30"
      />
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeDasharray="40, 134"
        strokeDashoffset="325"
        strokeLinecap="round"
        strokeWidth="10"
        className="opacity-70"
      />
    </svg>
  )
})

if (__DEV__) {
  Spinner.displayName = "Spinner"
}

export type { SpinnerProps }
export { Spinner }
