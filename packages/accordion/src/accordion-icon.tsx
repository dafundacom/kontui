import * as React from "react"
import { __DEV__ } from "@kontui/utils"

interface AccordionIconProps
  extends React.HTMLAttributes<HTMLOrSVGImageElement> {
  active?: boolean
}

const AccordionIconBase: React.FunctionComponent<AccordionIconProps> = (
  props,
) => {
  const { active } = props
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        style={{ color: "currentColor" }}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
      <style jsx>{`
        svg {
          transition: transform 200ms ease;
          transform: rotateZ(${active ? "-180deg" : "0"});
          width: 1.5em;
          height: 1.5em;
        }
      `}</style>
    </>
  )
}

const AccordionIcon = React.memo(AccordionIconBase)

if (__DEV__) {
  AccordionIcon.displayName = "AccordionIcon"
}

export type { AccordionIconProps }
export { AccordionIcon }
