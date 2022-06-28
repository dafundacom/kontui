import { Tag } from "../src"
import { Spacer } from "../../layout"

export default {
  title: "Tag",
  component: Tag,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => {
  return <Tag>Tag</Tag>
}

export const color = () => (
  <>
    <Tag colorScheme="success">Success</Tag>
    <Spacer h={0.5} />
    <Tag colorScheme="warning">Warning</Tag>
    <Spacer h={0.5} />
    <Tag colorScheme="error">Error</Tag>
    <Spacer h={0.5} />
    <Tag colorScheme="secondary">Secondary</Tag>
    <Spacer h={0.5} />
    <Tag colorScheme="lite">Lite</Tag>
  </>
)
