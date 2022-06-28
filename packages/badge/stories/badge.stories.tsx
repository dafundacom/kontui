import { Badge } from "../src"
import { useTheme } from "../../theme"

import { Avatar } from "../../avatar"
import { Button } from "../../button"
import { Link } from "../../link"

export default {
  title: "Badge",
  component: Badge,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const colorScheme = () => (
  <div>
    <Badge>Default</Badge>
    <Badge colorScheme="success">Success</Badge>
    <Badge colorScheme="warning">Warning</Badge>
    <Badge colorScheme="error">Error</Badge>
    <Badge colorScheme="secondary">Secondary</Badge>
  </div>
)

export const customColor = () => {
  const theme = useTheme()
  return (
    <div>
      <Badge style={{ backgroundColor: theme.palette.successLight }}>
        Success Light
      </Badge>
      <Badge style={{ backgroundColor: theme.palette.successDark }}>
        Success Dark
      </Badge>
      <Badge style={{ backgroundColor: theme.palette.alert }}>Alert</Badge>
      <Badge style={{ backgroundColor: theme.palette.purple }}>Purple</Badge>
      <Badge style={{ backgroundColor: theme.palette.violet }}>Violet</Badge>
      <Badge
        style={{
          backgroundColor: theme.palette.cyanLighter,
          color: theme.palette.foreground,
        }}
      >
        Cyan Ligher
      </Badge>
    </div>
  )
}

export const badgeAnchor = () => (
  <>
    <Badge.Anchor>
      <Badge scale={0.5}>10</Badge>
      <Avatar src="/images/avatar.png" />
    </Badge.Anchor>
    {/* <Spacer inline w={2.5} /> */}
    <Badge.Anchor placement="bottomRight">
      <Badge scale={0.5} colorScheme="success">
        10
      </Badge>
      <Avatar scale={0.8} isSquare src="/images/avatar.png" />
    </Badge.Anchor>
    {/* <Spacer inline w={2.5} /> */}
    <Badge.Anchor>
      <Badge scale={0.5} colorScheme="warning">
        99+
      </Badge>
      <Button>Action</Button>
    </Badge.Anchor>
    {/* <Spacer inline w={2.5} /> */}
    <Badge.Anchor>
      <Badge scale={0.5} colorScheme="error" dot />
      <Link href="https://github.com/dafundacom/kontui" target="_blank">
        KontUI
      </Link>
    </Badge.Anchor>
    {/* <Spacer inline w={2.5} /> */}
    <Badge.Anchor>
      <Badge colorScheme="error" dot padding="5px" />
      <Link href="https://github.com/dafundacom/kontui">Share Link</Link>
    </Badge.Anchor>
  </>
)
