import { Button } from "../src"
import { Spacer } from "../../layout"
import { Check } from "../../input/stories/check"

export default {
  title: "Button Dropdown",
  component: Button,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [(Story: any) => <Story />],
}

export const basic = () => (
  <Button.Dropdown>
    <Button.DropdownItem main>Default Action</Button.DropdownItem>
    <Button.DropdownItem>Secondary Action</Button.DropdownItem>
    <Button.DropdownItem>Tertiary Action</Button.DropdownItem>
  </Button.Dropdown>
)

export const disabled = () => (
  <Button.Dropdown disabled>
    <Button.DropdownItem main>Default Action</Button.DropdownItem>
    <Button.DropdownItem>Secondary Action</Button.DropdownItem>
    <Button.DropdownItem>Tertiary Action</Button.DropdownItem>
  </Button.Dropdown>
)

export const loading = () => (
  <Button.Dropdown loading>
    <Button.DropdownItem main>Default Action</Button.DropdownItem>
    <Button.DropdownItem>Secondary Action</Button.DropdownItem>
    <Button.DropdownItem>Tertiary Action</Button.DropdownItem>
  </Button.Dropdown>
)

export const withSpacer = () => (
  <>
    <Button.Dropdown colorScheme="secondary" scale={0.5}>
      <Button.DropdownItem main>Secondary Action</Button.DropdownItem>
      <Button.DropdownItem>Optional Action</Button.DropdownItem>
    </Button.Dropdown>
    <Spacer h={0.5} />
    <Button.Dropdown colorScheme="success" scale={0.5}>
      <Button.DropdownItem main>Success Action</Button.DropdownItem>
    </Button.Dropdown>
    <Spacer h={0.5} />
    <Button.Dropdown colorScheme="warning" scale={0.5}>
      <Button.DropdownItem main>Warning Action</Button.DropdownItem>
    </Button.Dropdown>
    <Spacer h={0.5} />
    <Button.Dropdown colorScheme="error" scale={0.5}>
      <Button.DropdownItem main>Error Action</Button.DropdownItem>
    </Button.Dropdown>
  </>
)

export const variant = () => (
  <Button.Dropdown scale={2 / 3} auto>
    <Button.DropdownItem main>Check Account</Button.DropdownItem>
    <Button.DropdownItem>Block Account</Button.DropdownItem>
    <Button.DropdownItem>Lock Account</Button.DropdownItem>
    <Button.DropdownItem colorScheme="error">
      Destroy Account
    </Button.DropdownItem>
  </Button.Dropdown>
)

export const customIcon = () => (
  <Button.Dropdown scale={2 / 3} auto icon={<Check />}>
    <Button.DropdownItem main>Check Account</Button.DropdownItem>
    <Button.DropdownItem>Block Account</Button.DropdownItem>
    <Button.DropdownItem>Lock Account</Button.DropdownItem>
    <Button.DropdownItem colorScheme="error">
      Destroy Account
    </Button.DropdownItem>
  </Button.Dropdown>
)
