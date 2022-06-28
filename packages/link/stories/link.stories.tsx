import { Link } from "../src"
import { Spacer } from "../../layout"
import { Text } from "../../text"

export default {
  title: "Link",
  component: Link,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <>
    <Link href="#">I'm Link</Link>
    <p>
      <Link href="#">Lorem Ipsum</Link> is simply dummy text of the printing and
      typesetting industry.
    </p>
  </>
)

export const wihtIcon = () => (
  <>
    <Link href="#" icon>
      HTTP is stateless, but not sessionless.
    </Link>
    <Spacer h={0.5} />
    <Link href="#" icon colored>
      HTTP is stateless, but not sessionless.
    </Link>
  </>
)

export const wihtText = () => (
  <>
    <Text>
      <Link target="_blank" href="#">
        HTTP is stateless, but not sessionless.
      </Link>
    </Text>
    <Text>
      <Link href="#" colored>
        HTTP is stateless, but not sessionless.
      </Link>
    </Text>
    <Text>
      <Link href="#" underline>
        HTTP is stateless, but not sessionless.
      </Link>
    </Text>
    <Text>
      <Link href="#" colored underline target="_blank">
        HTTP is stateless, but not sessionless.
      </Link>
    </Text>
  </>
)

export const block = () => (
  <Link href="#" block>
    HTTP is stateless, but not sessionless.
  </Link>
)
