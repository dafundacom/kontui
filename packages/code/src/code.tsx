import * as React from "react"

import { useTheme, useScale, withScale } from "@kontui/theme"
import { addColorAlpha, __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface CodeProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLElement> {
  /* element as */
  as?: React.ElementType
  /* The color of code blocks */
  block?: boolean
  className?: string
  name?: string
  classic?: boolean
}

const CodeBase: React.FunctionComponent<CodeProps> = (props) => {
  const {
    as: Comp = "code",
    children,
    block = "false",
    className,
    name,
    classic = "false",
    ...rest
  } = props
  const { SCALES } = useScale()
  const theme = useTheme()
  const { background, border } = React.useMemo(() => {
    if (!classic)
      return {
        border: theme.palette.accents_1,
        background: addColorAlpha(theme.palette.accents_1, 0.75),
      }
    return {
      border: theme.palette.accents_2,
      background: theme.palette.background,
    }
  }, [classic, theme.palette])

  if (!block) return <Comp {...rest}>{children}</Comp>

  return (
    <>
      <div className="code" {...rest}>
        {name && (
          <header>
            <div className="name">{name}</div>
          </header>
        )}
        <Comp className={className} {...rest}>
          {children}
        </Comp>
      </div>
      <style jsx>{`
        .code {
          max-width: 100%;
          border: 1px solid ${border};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, "initial")};
          height: ${SCALES.height(1, "auto")};
          margin: ${SCALES.mt(1.3)} ${SCALES.mr(0)} ${SCALES.mb(1.3)}
            ${SCALES.ml(0)};
          border-radius: ${theme.layout.radius};
          background-color: ${background};
        }
        pre {
          max-width: 100%;
          font-size: inherit;
          border: none;
          margin: 0;
          line-height: 1.5em;
          padding: ${SCALES.pt(1.1)} ${SCALES.pr(1)} ${SCALES.pb(1.1)}
            ${SCALES.pl(1)};
        }
        .dark {
          color: white;
          background: black;
        }
        .dark code {
          color: white;
        }
        header {
          height: auto;
          width: 100%;
          display: flex;
          justify-content: space-between;
          border-radius: ${theme.layout.radius};
          background-color: transparent;
        }
        .name {
          border: 1px solid ${theme.palette.accents_2};
          background-color: ${theme.palette.accents_2};
          color: ${theme.palette.accents_5};
          height: auto;
          line-height: 1.35em;
          display: inline-flex;
          align-items: center;
          font-size: ${SCALES.font(0.8125)};
          padding: ${SCALES.font(0.32)} ${SCALES.font(0.5)} ${SCALES.font(0.32)}
            ${SCALES.font(0.5)};
          width: auto;
          border-top-left-radius: calc(${theme.layout.radius} - 1px);
          border-bottom-right-radius: ${theme.layout.radius};
        }
      `}</style>
    </>
  )
}

const Code = withScale(CodeBase)

if (__DEV__) {
  Code.displayName = "Code"
}

export type { CodeProps }
export { Code }
