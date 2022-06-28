import { Grid, Spacer } from "../src"

export default {
  title: "Spacer",
  component: Spacer,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <>
    <Grid.Container>
      <Grid xs={24} style={{ background: "#737373", borderRadius: "15px" }}>
        <Spacer h={2} />
      </Grid>
      <Spacer h={2} />
      <Grid xs={24} style={{ background: "#A3A3A3", borderRadius: "15px" }}>
        <Spacer h={3} />
      </Grid>
      <Spacer h={3} />
      <Grid xs={24} style={{ background: "#E5E5E5", borderRadius: "15px" }}>
        <Spacer h={4} />
      </Grid>
    </Grid.Container>
  </>
)
