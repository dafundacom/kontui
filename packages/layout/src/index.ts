import * as React from "react"

import { Grid as InternalGrid } from "./grid"
import { GridContainer } from "./grid-container"
import { Center } from "./center"
import { Col } from "./col"
import { Container } from "./container"
import { Divider } from "./divider"
import { Ellipsis } from "./ellipsis"
import { Expand } from "./expand"
import { Highlight } from "./highlight"
import { Row } from "./row"
import { Spacer } from "./spacer"

import type { GridProps } from "./grid"
import type { GridContainerProps } from "./grid-container"
import type { CenterProps } from "./center"
import type { ColProps } from "./col"
import type { ContainerProps } from "./container"
import type { EllipsisProps } from "./ellipsis"
import type { ExpandProps } from "./expand"
import type { DividerProps } from "./divider"
import type { HighlightProps } from "./highlight"
import type { RowProps } from "./row"
import type { SpacerProps } from "./spacer"

interface Grid
  extends React.ForwardRefExoticComponent<
    GridProps & React.RefAttributes<HTMLInputElement>
  > {
  Container: typeof GridContainer
}

const Grid = InternalGrid as Grid
Grid.Container = GridContainer

export * from "./types"
export type {
  GridProps,
  GridContainerProps,
  CenterProps,
  ColProps,
  ContainerProps,
  DividerProps,
  EllipsisProps,
  ExpandProps,
  HighlightProps,
  RowProps,
  SpacerProps,
}
export {
  Grid,
  GridContainer,
  Center,
  Col,
  Container,
  Divider,
  Ellipsis,
  Expand,
  Highlight,
  Row,
  Spacer,
}

export * from "./backdrop"
