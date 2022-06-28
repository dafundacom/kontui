/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"
import { Expand } from "@kontui/layout"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useCurrentState, useWarning, useClasses, __DEV__ } from "@kontui/utils"

import { useAccordionContext } from "./accordion-context"
import { AccordionIcon } from "./accordion-icon"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface AccordionProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: React.ReactNode | string
  initialVisible?: boolean
  shadow?: boolean
  className?: string
  index?: number
}

const AccordionBase: React.FunctionComponent<AccordionProps> = (props) => {
  const {
    children,
    title,
    subtitle,
    initialVisible = false,
    shadow = false,
    className,
    index,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const { values, updateValues } = useAccordionContext()
  const [visible, setVisible, visibleRef] =
    useCurrentState<boolean>(initialVisible)
  const classes = useClasses(
    "accordion",
    {
      shadow,
    },
    className,
  )

  if (!title) {
    useWarning('"title" is required.', "Accordion")
  }

  React.useEffect(() => {
    if (!values.length) return
    const isActive = !!values.find((item) => item === index)
    setVisible(isActive)
  }, [values.join(",")])

  const clickHandler = () => {
    const next = !visibleRef.current
    setVisible(next)
    updateValues && updateValues(index as number, next)
  }

  return (
    <>
      <div className={classes} {...rest}>
        <div className="view" role="button" onClick={clickHandler}>
          <div className="title">
            <h3>{title}</h3> <AccordionIcon active={visible} />
          </div>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
        <Expand isExpanded={visible}>
          <div className="content">{children}</div>
        </Expand>
      </div>
      <style jsx>{`
        .accordion {
          border-top: 1px solid ${theme.palette.border};
          border-bottom: 1px solid ${theme.palette.border};
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(1.2)} ${SCALES.pr(0)} ${SCALES.pb(1.2)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .shadow {
          box-shadow: ${theme.expressiveness.shadowSmall};
          border: none;
          border-radius: ${theme.layout.radius};
          padding: ${theme.layout.gap};
        }

        .view {
          cursor: pointer;
          outline: none;
        }

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${theme.palette.foreground};
        }

        .title h3 {
          margin: 0;
          font-size: 1.5em;
        }

        .subtitle {
          color: ${theme.palette.accents_5};
          margin: 0;
        }

        .subtitle > :global(*) {
          margin: 0;
        }

        .content {
          font-size: inherit;
          line-height: 1.6em;
          padding: ${SCALES.pt(1.2)} ${SCALES.pr(0)} ${SCALES.pb(1.2)}
            ${SCALES.pl(0)};
        }

        .content > :global(*:first-child) {
          margin-top: 0;
        }

        .content > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  )
}

const Accordion = withScale(AccordionBase)

if (__DEV__) {
  Accordion.displayName = "Accordion"
}

export type { AccordionProps }
export { Accordion }
