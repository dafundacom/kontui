import { Checkbox } from "../src"
import { Spacer } from "../../layout"

export default {
  title: "Checkbox",
  component: Checkbox,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const DifferentSize = () => (
  <>
    <Checkbox mr="15px" checked={true} scale={0.25}>
      scale-0.25
    </Checkbox>
    <Checkbox mr="15px" checked={true} scale={0.5}>
      scale-0.5
    </Checkbox>
    <Checkbox mr="15px" checked={true} scale={0.75}>
      scale-0.75
    </Checkbox>
  </>
)

export const ColorScheme = () => (
  <>
    <Checkbox checked={true} colorScheme="default">
      Default
    </Checkbox>
    <Spacer h={0.5} />
    <Checkbox checked={true} colorScheme="success">
      Success
    </Checkbox>
    <Spacer h={0.5} />
    <Checkbox checked={true} colorScheme="warning">
      Warning
    </Checkbox>
    <Spacer h={0.5} />
    <Checkbox checked={true} colorScheme="error">
      Error
    </Checkbox>
  </>
)

export const group = () => {
  const handler = (value: any) => {
    console.log(value)
  }
  return (
    <Checkbox.Group value={["sydney"]} onChange={handler}>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="beijing">Bei Jing</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </Checkbox.Group>
  )
}
