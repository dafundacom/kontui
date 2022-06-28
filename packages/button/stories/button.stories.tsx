import { Button } from "../src"
import { Grid } from "../../layout"
import { Spacer } from "../../layout"

export default {
  title: "Button",
  component: Button,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [(Story: any) => <Story />],
}

export const basic = () => <Button>Action</Button>

export const buttonLoading = () => (
  <>
    <Button loading>Action</Button>
    <Spacer h={0.5} />
    <Button loading scale={0.75}>
      Action
    </Button>
    <Spacer h={0.5} />
    <Button loading auto colorScheme="success" scale={2 / 3}>
      Action
    </Button>
  </>
)

export const buttonDisabled = () => <Button disabled>Action</Button>

export const buttonShadow = () => (
  <Button shadow colorScheme="secondary">
    Shadow
  </Button>
)

export const withState = () => {
  ;<Grid.Container gap={1.5}>
    <Grid>
      <Button auto colorScheme="secondary">
        Secondary
      </Button>
    </Grid>
    <Grid>
      <Button auto colorScheme="success">
        Success
      </Button>
    </Grid>
    <Grid>
      <Button auto colorScheme="warning">
        Warning
      </Button>
    </Grid>
    <Grid>
      <Button auto colorScheme="error">
        Error
      </Button>
    </Grid>
    <Grid>
      <Button auto colorScheme="abort">
        Abort
      </Button>
    </Grid>
    <Grid>
      <Button auto colorScheme="secondary-light">
        Secondary Light
      </Button>
    </Grid>
    <Grid>
      <Button auto colorScheme="success-light">
        Success Light
      </Button>
    </Grid>
    <Grid>
      <Button auto colorScheme="warning-light">
        Warning Light
      </Button>
    </Grid>
    <Grid>
      <Button auto colorScheme="error-light">
        Error Light
      </Button>
    </Grid>
  </Grid.Container>
}
