import { Code } from "../src"

export default {
  title: "Code",
  component: Code,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <>
    <Code>console.log("yandi ganteng")</Code>
    <Code classic>console.log("yandi ganteng")</Code>
    <Code block>console.log("yandi ganteng")</Code>
  </>
)
