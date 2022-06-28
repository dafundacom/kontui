import { Box } from "../src"

import { Image } from "../../image"
import { Link } from "../../link"

export default {
  title: "Box",
  component: Box,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <>
    <Box>
      <p>A basic basic.</p>
    </Box>
  </>
)

export const hoverable = () => (
  <>
    <Box hoverable>hoverable box</Box>
  </>
)

export const shadow = () => (
  <>
    <Box shadow>shadow box</Box>
  </>
)

export const colorScheme = () => (
  <div>
    <Box>Default</Box>
    <Box colorScheme="success">Success</Box>
    <Box colorScheme="warning">Warning</Box>
    <Box colorScheme="error">Error</Box>
    <Box colorScheme="secondary">Secondary</Box>
  </div>
)

export const withImage = () => (
  <Box width="500px">
    <Image
      src="https://mmc.tirto.id/image/2016/08/04/TIRTO-soeharto.JPG"
      width="400px"
      draggable={false}
    />
    <h4>KontUI React</h4>
    <Box.Footer>
      <Link block target="_blank" href="https:/github.com/daundacom/kontui">
        Visit source code on GitHub.
      </Link>
    </Box.Footer>
  </Box>
)
