import * as React from "react"
import PropTypes from "prop-types"

import { __DEV__ } from "@kontui/utils"

/**
 * VisuallyHidden
 *
 * Provides text for screen readers that is visually hidden.
 * It is the logical opposite of the `aria-hidden` attribute.
 */
const VisuallyHidden = React.forwardRef<any, any>(function VisuallyHidden(
  { as: Comp = "span", style = {}, ...props },
  ref,
) {
  return (
    <Comp
      ref={ref}
      style={{
        border: 0,
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: "1px",

        // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
        whiteSpace: "nowrap",
        wordWrap: "normal",
        ...style,
      }}
      {...props}
    />
  )
})

interface VisuallyHiddenProps {
  children?: React.ReactNode
}

if (__DEV__) {
  VisuallyHidden.displayName = "VisuallyHidden"
  VisuallyHidden.propTypes = {
    as: PropTypes.any,
    children: PropTypes.node,
  }
}

export type { VisuallyHiddenProps }
export { VisuallyHidden }
