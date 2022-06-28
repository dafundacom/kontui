import { Loading } from "../src"
import { Grid } from "../../layout"

export default {
  title: "Loading",
  component: Loading,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => <Loading>Loading</Loading>

export const colorSchemes = () => (
  <Grid.Container gap={2.5}>
    <Grid xs={24}>
      <Loading colorScheme="success" />
    </Grid>
    <Grid xs={24}>
      <Loading colorScheme="secondary" />
    </Grid>
    <Grid xs={24}>
      <Loading colorScheme="warning" />
    </Grid>
    <Grid xs={24}>
      <Loading colorScheme="error" />
    </Grid>
  </Grid.Container>
)

export const spaces = () => (
  <Grid.Container gap={2.5}>
    <Grid xs={24}>
      <Loading spaceRatio={2.5} />
    </Grid>
    <Grid xs={24}>
      <Loading spaceRatio={0.5} />
    </Grid>
  </Grid.Container>
)
