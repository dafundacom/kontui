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
      <Grid xs={24} style={{ background: "#444", borderRadius: "15px" }}>
        <Spacer h={2} />
      </Grid>
      <Spacer h={2} />
      <Grid xs={24} style={{ background: "#666", borderRadius: "15px" }}>
        <Spacer h={3} />
      </Grid>
      <Spacer h={3} />
      <Grid xs={24} style={{ background: "#999", borderRadius: "15px" }}>
        <Spacer h={4} />
      </Grid>
    </Grid.Container>
  </>
)
