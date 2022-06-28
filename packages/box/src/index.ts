import * as React from "react"

import { Box as InternalBox, BoxProps } from "./box"
import { BoxContent, BoxContentProps } from "./box-content"
import { BoxFooter, BoxFooterProps } from "./box-footer"

interface Box
  extends React.ForwardRefExoticComponent<
    BoxProps & React.RefAttributes<HTMLElement>
  > {
  Content: typeof BoxContent
  Footer: typeof BoxFooter
}

const Box = InternalBox as Box

Box.Content = BoxContent
Box.Footer = BoxFooter

export type { BoxProps, BoxContentProps, BoxFooterProps }
export { Box, BoxContent, BoxFooter }
