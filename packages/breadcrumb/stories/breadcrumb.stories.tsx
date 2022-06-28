import { Breadcrumb } from "../src"

export default {
  title: "Breadcrumb",
  component: Breadcrumb,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item href="">Catalog</Breadcrumb.Item>
    <Breadcrumb.Item>Page</Breadcrumb.Item>
  </Breadcrumb>
)

export const separator = () => (
  <>
    <Breadcrumb separator="-">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item href="">Catalog</Breadcrumb.Item>
      <Breadcrumb.Item>Page</Breadcrumb.Item>
    </Breadcrumb>
    {/* <Spacer h={0.5} /> */}
    <Breadcrumb separator=">">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Separator>:</Breadcrumb.Separator>
      <Breadcrumb.Item href="">Components</Breadcrumb.Item>
      <Breadcrumb.Item href="">Basic</Breadcrumb.Item>
      <Breadcrumb.Item>Button</Breadcrumb.Item>
    </Breadcrumb>
  </>
)

export const withIcon = () => (
  <Breadcrumb>
    <Breadcrumb.Item>{/* <Home /> */}</Breadcrumb.Item>
    <Breadcrumb.Item href="">{/* <Inbox /> Inbox */}</Breadcrumb.Item>
    <Breadcrumb.Item>Page</Breadcrumb.Item>
  </Breadcrumb>
)
