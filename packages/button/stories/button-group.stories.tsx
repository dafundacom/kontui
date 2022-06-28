import { Button } from "../src"

export default {
  title: "Button Group",
  component: Button,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [(Story: any) => <Story />],
}

export const basic = () => (
  <Button.Group>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </Button.Group>
)

export const variant = () => (
  <>
    <Button.Group colorScheme="success">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
    <Button.Group colorScheme="abort">
      <Button>Action1</Button>
      <Button>Action2</Button>
    </Button.Group>
    <Button.Group colorScheme="warning" ghost>
      <Button>Action1</Button>
      <Button>Action2</Button>
    </Button.Group>
    <Button.Group colorScheme="success-light">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </Button.Group>
  </>
)

export const sizes = () => (
  <>
    <Button.Group scale={2 / 3}>
      <Button scale={2 / 3}>One</Button>
      <Button scale={2 / 3}>Two</Button>
      <Button scale={2 / 3}>Three</Button>
    </Button.Group>
    <Button.Group scale={1 / 3}>
      <Button scale={1 / 3}>Action1</Button>
      <Button scale={1 / 3}>Action2</Button>
    </Button.Group>
  </>
)

export const vertical = () => (
  <>
    <Button.Group vertical>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </Button.Group>
  </>
)

export const disabled = () => (
  <>
    <Button.Group scale={0.5} disabled>
      <Button scale={0.5}>One</Button>
      <Button scale={0.5}>Two</Button>
      <Button scale={0.5}>Three</Button>
    </Button.Group>
  </>
)
