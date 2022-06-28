/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"

import { Link } from "@kontui/link"
import { pickChild, useClasses, __DEV__ } from "@kontui/utils"

import { BreadcrumbSeparator } from "./breadcrumb-separator"

import type { LinkProps } from "@kontui/link"
import type { DefaultProps } from "@kontui/theme"

interface BreadcrumbItemProps
  extends DefaultProps,
    LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  href?: string
  nextLink?: boolean
  onClick?: (event: React.MouseEvent) => void
  className?: string
}

const BreadcrumbItem = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  (props, ref) => {
    const {
      href,
      nextLink = false,
      onClick,
      children,
      className,
      ...rest
    } = props

    const isLink = React.useMemo(
      () => href !== undefined && nextLink,
      [href, nextLink],
    )
    const [withoutSepChildren] = pickChild(children, BreadcrumbSeparator)
    const classes = useClasses("breadcrumb-item", className)

    const clickHandler = (event: React.MouseEvent) => {
      onClick && onClick(event)
    }

    if (!isLink) {
      return (
        <span className={classes} onClick={clickHandler}>
          {withoutSepChildren}
        </span>
      )
    }

    return (
      <Link
        className={classes}
        href={href}
        onClick={clickHandler}
        ref={ref}
        {...rest}
      >
        {withoutSepChildren}
      </Link>
    )
  },
)

if (__DEV__) {
  BreadcrumbItem.displayName = "BreadcrumbItem"
}

export type { BreadcrumbItemProps }
export { BreadcrumbItem }
