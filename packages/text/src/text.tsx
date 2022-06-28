import * as React from "react"

import { withScale } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import { TextChild } from "./text-child"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type { BaseColorScheme } from "@kontui/utils"

interface TextProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLElement> {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  p?: boolean
  b?: boolean
  small?: boolean
  i?: boolean
  span?: boolean
  del?: boolean
  em?: boolean
  blockquote?: boolean
  className?: string
  colorScheme?: BaseColorScheme
}

type ElementMap = { [key in keyof JSX.IntrinsicElements]?: boolean }

type TextRenderableElements = Array<keyof JSX.IntrinsicElements>

const getModifierChild = (
  tags: TextRenderableElements,
  children: React.ReactNode,
) => {
  if (!tags.length) return children
  const nextTag = tags.slice(1, tags.length)
  return (
    <TextChild as={tags[0]}>{getModifierChild(nextTag, children)}</TextChild>
  )
}

const TextBase: React.FunctionComponent<TextProps> = (props) => {
  const {
    h1 = false,
    h2 = false,
    h3 = false,
    h4 = false,
    h5 = false,
    h6 = false,
    p = false,
    b = false,
    small = false,
    i = false,
    span = false,
    del = false,
    em = false,
    blockquote = false,
    className,
    children,
    ...rest
  } = props

  const elements: ElementMap = { h1, h2, h3, h4, h5, h6, p, blockquote }
  const inlineElements: ElementMap = { span, small, b, em, i, del }
  const names = Object.keys(elements).filter(
    (name: keyof any) => elements[name],
  ) as TextRenderableElements
  const inlineNames = Object.keys(inlineElements).filter(
    (name: keyof any) => inlineElements[name],
  ) as TextRenderableElements

  /**
   *  Render element "p" only if no element is found.
   *  If there is only one modifier, just rendered one modifier element
   *  e.g.
   *    <Text /> => <p />
   *    <Text em /> => <em />
   *    <Text p em /> => <p><em>children</em></p>
   *
   */

  const as = React.useMemo(() => {
    if (names[0]) return names[0]
    if (inlineNames[0]) return inlineNames[0]
    return "p" as keyof JSX.IntrinsicElements
  }, [names, inlineNames])

  const renderableChildElements = inlineNames.filter(
    (name: keyof JSX.IntrinsicElements) => name !== as,
  ) as TextRenderableElements

  const modifers = React.useMemo(() => {
    if (!renderableChildElements.length) return children
    return getModifierChild(renderableChildElements, children)
  }, [renderableChildElements, children])

  return (
    <TextChild className={className} as={as} {...rest}>
      {modifers}
    </TextChild>
  )
}

const Text = withScale(TextBase)

if (__DEV__) {
  Text.displayName = "Code"
}

export type { TextProps }
export { Text }
