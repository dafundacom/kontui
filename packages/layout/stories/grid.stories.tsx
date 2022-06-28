import { Grid } from "../src"
import { Box } from "../../box"

export default {
  title: "Grid",
  component: Grid,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const withBox = () => (
  <Grid.Container gap={2} justify="center" height="100px">
    <Grid xs={6}>
      <Box shadow width="100%" />
    </Grid>
    <Grid xs={6}>
      <Box shadow width="100%" />
    </Grid>
    <Grid xs={6}>
      <Box shadow width="100%" />
    </Grid>
  </Grid.Container>
)

export const Fluid = () => (
  <Grid.Container gap={2} justify="center">
    <Grid xs={24}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={12}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={12}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={6}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={6}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={6}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={6}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={6}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={12}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={6}>
      <Box shadow width="100%" height="50px" />
    </Grid>
  </Grid.Container>
)

export const responsive = () => (
  <Grid.Container gap={2} justify="center">
    <Grid xs={24} md={12}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={12} md={12}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={12} md={6}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={12} md={6}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={12} md={6}>
      <Box shadow width="100%" height="50px" />
    </Grid>
  </Grid.Container>
)

export const hideElement = () => (
  <Grid.Container gap={2} justify="center">
    <Grid xs={12} sm={0}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={12} sm={0}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={24}>
      <Box shadow width="100%" height="50px" />
    </Grid>
    <Grid xs={24}>
      <Box shadow width="100%" height="50px" />
    </Grid>
  </Grid.Container>
)

export const autoWidth = () => (
  <>
    <Grid.Container gap={2} justify="center">
      <Grid xs>
        <Box colorScheme="success" shadow width="100%" height="50px" />
      </Grid>
      <Grid xs>
        <Box shadow width="100%" height="50px" />
      </Grid>
      <Grid xs>
        <Box shadow width="100%" height="50px" />
      </Grid>
    </Grid.Container>
    <Grid.Container gap={2} justify="center">
      <Grid xs>
        <Box shadow width="100%" height="50px" />
      </Grid>
      <Grid xs={12}>
        <Box shadow width="100%" height="50px" />
      </Grid>
      <Grid xs>
        <Box shadow width="100%" height="50px" />
      </Grid>
    </Grid.Container>
  </>
)
