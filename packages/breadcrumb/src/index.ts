import * as React from "react"

import { Breadcrumb as InternalBreadcrumb, BreadcrumbProps } from "./breadcrumb"

import { BreadcrumbItem, BreadcrumbItemProps } from "./breadcrumb-item"

import {
  BreadcrumbSeparator,
  BreadcrumbSeparatorProps,
} from "./breadcrumb-separator"

interface Breadcrumb
  extends React.ForwardRefExoticComponent<
    BreadcrumbProps & React.RefAttributes<HTMLElement>
  > {
  Item: typeof BreadcrumbItem
  Separator: typeof BreadcrumbSeparator
}

const Breadcrumb = InternalBreadcrumb as Breadcrumb

Breadcrumb.Item = BreadcrumbItem
Breadcrumb.Separator = BreadcrumbSeparator

export type { BreadcrumbProps, BreadcrumbItemProps, BreadcrumbSeparatorProps }

export { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator }
