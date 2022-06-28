import * as React from "react"

import { Grid as InternalGrid } from "./grid"
import { GridContainer } from "./grid-container"
import { Center } from "./center"
import { Col } from "./col"
import { Container } from "./container"
import { Divider } from "./divider"
import { Expand } from "./expand"
import { Spacer } from "./spacer"

import type { GridProps } from "./grid"
import type { GridContainerProps } from "./grid-container"
import type { CenterProps } from "./center"
import type { ColProps } from "./col"
import type { ContainerProps } from "./container"
import type { ExpandProps } from "./expand"
import type { DividerProps } from "./divider"
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
  ExpandProps,
  SpacerProps,
}
export { Grid, GridContainer, Center, Col, Container, Divider, Expand, Spacer }
