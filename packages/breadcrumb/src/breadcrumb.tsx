import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { addColorAlpha, __DEV__ } from "@kontui/utils"

import { BreadcrumbSeparator } from "./breadcrumb-separator"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface BreadcrumbProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLElement> {
  separator?: string | React.ReactNode
}

const BreadcrumbBase: React.FunctionComponent<BreadcrumbProps> = (props) => {
  const { separator = "/", children, className } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const hoverColor = React.useMemo(() => {
    return addColorAlpha(theme.palette.link, 0.85)
  }, [theme.palette.link])

  const childrenArray = React.Children.toArray(children)
  const withSeparatorChildren = childrenArray.map((item, index) => {
    if (!React.isValidElement(item)) return item
    const last = childrenArray[index - 1]
    const lastIsSeparator =
      React.isValidElement(last) && last.type === BreadcrumbSeparator
    const currentIsSeparator = item.type === BreadcrumbSeparator
    if (!lastIsSeparator && !currentIsSeparator && index > 0) {
      return (
        <React.Fragment key={index}>
          <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
          {item}
        </React.Fragment>
      )
    }
    return item
  })

  return (
    <nav className={className}>
      {withSeparatorChildren}
      <style jsx>{`
        nav {
          line-height: inherit;
          color: ${theme.palette.accents_4};
          box-sizing: border-box;
          display: flex;
          align-items: center;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        nav :global(.link:hover) {
          color: ${hoverColor};
        }

        nav > :global(span:last-of-type) {
          color: ${theme.palette.accents_6};
        }

        nav > :global(.separator:last-child) {
          display: none;
        }

        nav :global(svg) {
          width: 1em;
          height: 1em;
          margin: 0 4px;
        }

        nav :global(.Breadcrumb-item) {
          display: inline-flex;
          align-items: center;
        }
      `}</style>
    </nav>
  )
}

const Breadcrumb = withScale(BreadcrumbBase)

if (__DEV__) {
  Breadcrumb.displayName = "Breadcrumb"
}

export type { BreadcrumbProps }
export { Breadcrumb }
