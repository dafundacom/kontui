import { Center } from "../src"
import { Text } from "../../text"

export default {
  title: "Center",
  component: Center,
  parameters: {
    hideNoControlsWarning: true,
  },
}

export const withText = () => (
  <Center>
    <Text>
      In server-driven content negotiation, or proactive content negotiation,
      the browser (or any other kind of user-agent) sends several HTTP headers
      along with the URL. These headers describe the preferred choice of the
      user.
    </Text>
  </Center>
)
