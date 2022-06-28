import { Text } from "../src"

export default {
  title: "Text",
  component: Text,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <>
    <Text p>
      Caching is very important for fast Web sites. This article describes
      different methods of caching and how to use HTTP Headers to control them.
    </Text>
    <Text p b>
      A brief description of the changes between the early versions of HTTP, to
      the modern HTTP/2, the emergent HTTP/3 and beyond.
    </Text>
  </>
)

export const small = () => (
  <>
    <Text small>
      HTTP response codes indicate whether a specific HTTP request has been
      successfully completed. Responses are grouped in five classes:
      informational responses, successful responses, redirections, client
      errors, and servers errors.
    </Text>
    <Text small i>
      HTTP response codes indicate whether a specific HTTP request has been
      successfully completed. Responses are grouped in five classes:
      informational responses, successful responses, redirections, client
      errors, and servers errors.
    </Text>
  </>
)

export const blockquote = () => (
  <Text blockquote my={0}>
    Send cookies from the server to the user-agent.
  </Text>
)

export const sizes = () => (
  <>
    <Text font="12px" mt={0}>
      Font Size: 12px;
    </Text>
    <Text font="14px">Font Size: 14px;</Text>
    <Text font="1rem">Font Size: 1rem;</Text>
    <Text scale={1.25} mb={0}>
      Font Size Scale: 1.25;
    </Text>
  </>
)

export const multiple = () => (
  <>
    <Text p mt={0}>
      Specifies origins that are allowed to see values of attributes retrieved
      via features of the Resource Timing API, which would otherwise be reported
      as zero due to cross-origin restrictions.
    </Text>

    <Text mb={0}>
      <Text small del>
        Indicates if the resource transmitted should be displayed inline
        (default behavior without the header),
      </Text>
      <Text small b>
        or if it should be handled like a download and the browser should
        present a “Save As” dialog.
      </Text>
    </Text>
  </>
)
