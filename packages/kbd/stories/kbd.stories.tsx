import { Kbd } from "../src"

export default {
  title: "Kbd",
  component: Kbd,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <>
    <Kbd command mr="10px" />
    <Kbd shift mr="10px" />
    <Kbd option mr="10px" />
    <Kbd ctrl mr="10px" />
  </>
)

export const withText = () => (
  <>
    <Kbd command mr="10px">
      f
    </Kbd>
    <Kbd shift mr="10px">
      e
    </Kbd>
    <Kbd option ctrl mr="10px">
      b
    </Kbd>
  </>
)
