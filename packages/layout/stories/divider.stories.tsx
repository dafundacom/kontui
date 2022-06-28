import { Divider, Spacer } from "../src"
import { Text } from "../../text"

export default {
  title: "Divider",
  component: Divider,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <>
    <div>
      <Divider />
    </div>
    <Spacer scale={2} />
    <Text>
      In server-driven content negotiation, or proactive content negotiation,
      the browser (or any other kind of user-agent) sends several HTTP headers
      along with the URL. These headers describe the preferred choice of the
      user.
    </Text>
    <Divider />
    <Text>
      The server uses them as hints and an internal algorithm chooses the best
      content to serve to the client. The algorithm is server-specific and not
      defined in the standard.
    </Text>
  </>
)

export const space = () => (
  <>
    <Text>
      In server-driven content negotiation, or proactive content negotiation,
      the browser (or any other kind of user-agent) sends several HTTP headers
      along with the URL. These headers describe the preferred choice of the
      user.
    </Text>
    <Divider h={5}>HTTP</Divider>
    <Text>
      The server uses them as hints and an internal algorithm chooses the best
      content to serve to the client. The algorithm is server-specific and not
      defined in the standard.
    </Text>
    <Divider my={5} h={5}>
      standard headers
    </Divider>
    <Text>
      The HTTP/1.1 standard defines list of the standard headers that start
      server-driven negotiation (Accept, Accept-Charset, Accept-Encoding,
      Accept-Language)
    </Text>
  </>
)

export const colorScheme = () => (
  <>
    <Text>
      In server-driven content negotiation, or proactive content negotiation,
      the browser (or any other kind of user-agent) sends several HTTP headers
      along with the URL. These headers describe the preferred choice of the
      user.
    </Text>
    <Divider h={3} colorScheme="success">
      HTTP
    </Divider>
    <Text>
      The server uses them as hints and an internal algorithm chooses the best
      content to serve to the client. The algorithm is server-specific and not
      defined in the standard.
    </Text>
    <Divider h={3} my={3} colorScheme="warning">
      standard headers
    </Divider>
    <Text>
      The HTTP/1.1 standard defines list of the standard headers that start
      server-driven negotiation (Accept, Accept-Charset, Accept-Encoding,
      Accept-Language)
    </Text>
  </>
)
