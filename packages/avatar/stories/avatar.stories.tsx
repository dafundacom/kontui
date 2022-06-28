import { Avatar } from "../src"

export default {
  title: "Avatar",
  component: Avatar,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

const url = "https://picsum.photos/500"

export const basic = () => (
  <>
    <Avatar src={url} />
    <Avatar src={url} />
    <Avatar src={url} />
    <Avatar scale={0.8} src={url} />
    {/* <Spacer h={.5} /> */}
    <Avatar src={url} isSquare />
    <Avatar src={url} isSquare />
    <Avatar src={url} isSquare />
    <Avatar src={url} isSquare />
  </>
)

export const name = () => (
  <>
    <Avatar as="span" text="Soeharto Kun" />
    <Avatar text="Soeharto Kun" />
    <Avatar text="S" />
  </>
)

export const group = () => (
  <>
    <Avatar.Group>
      <Avatar src={url} stacked />
      <Avatar src={url} stacked />
      <Avatar src={url} stacked />
      <Avatar src={url} stacked />
    </Avatar.Group>
    {/* <Spacer /> */}
    <Avatar.Group count={12}>
      <Avatar src={url} stacked />
      <Avatar text="W" stacked />
      <Avatar text="Ana" stacked />
    </Avatar.Group>
  </>
)
