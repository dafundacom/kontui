import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { addColorAlpha, useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

const LinkIcon: React.FunctionComponent<
  React.HTMLAttributes<HTMLOrSVGImageElement>
> = () => {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        width="0.9375em"
        height="0.9375em"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        className="icon"
      >
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <path d="M15 3h6v6" />
        <path d="M10 14L21 3" />
      </svg>
      <style jsx>{`
        .icon {
          margin: 0 0 -1px 0.1875em;
          display: inline-flex;
          align-self: center;
          color: currentColor;
        }
      `}</style>
    </>
  )
}

interface LinkProps
  extends DefaultProps,
    ScaleProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
  colored?: boolean
  icon?: boolean
  underline?: boolean
  block?: boolean
  className?: string
}

const LinkBase = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const {
      href,
      colored = false,
      underline = false,
      block = false,
      icon = false,
      className,
      children,
      ...rest
    } = props
    const theme = useTheme()
    const { SCALES } = useScale()
    const linkColor = colored || block ? theme.palette.link : "inherit"
    const hoverColor = colored || block ? theme.palette.successLight : "inherit"
    const decoration = underline ? "underline" : "none"
    const classes = useClasses("link", { block }, className)

    return (
      <>
        <a className={classes} href={href} ref={ref} {...rest}>
          {children}
          {icon && <LinkIcon />}
        </a>
        <style jsx>{`
          .link {
            display: inline-flex;
            align-items: baseline;
            line-height: inherit;
            color: ${linkColor};
            text-decoration: none;
            border-radius: ${block ? theme.layout.radius : 0};
            transition: color 200ms ease 0ms;
            font-size: ${SCALES.font(1, "inherit")};
            width: ${SCALES.width(1, "fit-content")};
            height: ${SCALES.height(1, "auto")};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
              ${SCALES.ml(0)};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
              ${SCALES.pl(0)};
          }
          .block {
            padding: ${SCALES.pt(0.125)} ${SCALES.pr(0.25)} ${SCALES.pb(0.125)}
              ${SCALES.pl(0.25)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(-0.125)} ${SCALES.mb(0)}
              ${SCALES.ml(-0.125)};
          }

          .link:hover,
          .link:active,
          .link:focus {
            text-decoration: ${decoration};
          }

          .link:hover {
            background-color: ${block
              ? addColorAlpha(theme.palette.link, 0.1)
              : "unset"};
            color: ${hoverColor};
          }
        `}</style>
      </>
    )
  },
)

const Link = withScale(LinkBase)

if (__DEV__) {
  Link.displayName = "Link"
}

export type { LinkProps }
export { Link }
