import { Bullet } from "../src"

export default {
  title: "Bullet",
  component: Bullet,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const Indicator = () => (
  <>
    <Bullet style={{ marginRight: "15px" }} />
    <Bullet style={{ marginRight: "15px" }} colorScheme="success" />
    <Bullet style={{ marginRight: "15px" }} colorScheme="warning" />
    <Bullet colorScheme="error" />
  </>
)
