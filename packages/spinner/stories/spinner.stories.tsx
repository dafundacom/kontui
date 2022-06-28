import { Spinner } from "../src"

export default {
  title: "Spinner",
  component: Spinner,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <>
    <Spinner />
  </>
)
