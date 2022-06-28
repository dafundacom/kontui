import { Alert } from "../src"

export default {
  title: "Alert",
  component: Alert,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const colorScheme = () => (
  <>
    <Alert>This Alert details something important.</Alert>
    <br />
    <Alert colorScheme="secondary">
      This Alert details something important.
    </Alert>
    <br />
    <Alert colorScheme="success">This Alert details something important.</Alert>
    <br />
    <Alert colorScheme="warning">This Alert details something important.</Alert>
    <br />
    <Alert colorScheme="error">This Alert details something important.</Alert>
  </>
)

export const filled = () => (
  <>
    <Alert label="custom" filled>
      This Alert uses a custom label.
    </Alert>
    <br />
    <Alert label={false} filled>
      Just a quick Alert!
    </Alert>
    <br />
    <Alert colorScheme="success" label="success" filled>
      This Alert details a success.
    </Alert>
    <br />
    <Alert colorScheme="warning" label="warning" filled>
      This Alert details a warning.
    </Alert>
    <br />
    <Alert colorScheme="error" label="error" filled>
      This Alert details an error.
    </Alert>
    <br />
    <Alert colorScheme="secondary" filled>
      This Alert details something important.
    </Alert>
  </>
)

export const hiddenLabel = () => (
  <Alert label={false}>Just a quick Alert!</Alert>
)
