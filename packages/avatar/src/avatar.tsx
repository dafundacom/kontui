import * as React from "react"

import { useScale, useTheme, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface AvatarProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  alt?: string
  text?: string
  src?: string
  stacked?: boolean
  isSquare?: boolean
}

const safeText = (text: any) => {
  if (text.length <= 4) return text
  return text.slice(0, 3)
}

const AvatarBase: React.FunctionComponent<AvatarProps> = (props) => {
  const {
    src,
    stacked = false,
    text,
    isSquare = false,
    className,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const showText = !src
  const radius = isSquare ? theme.layout.radius : "50%"
  const marginLeft = stacked ? SCALES.ml(-0.625) : SCALES.ml(0)
  const classes = useClasses("avatar", className)

  return (
    <span className={classes}>
      {!showText && (
        <img
          alt="avatar"
          className="avatar-img"
          src={src}
          draggable={false}
          {...rest}
        />
      )}
      {showText && (
        <span className="avatar-text" {...rest}>
          {safeText(text)}
        </span>
      )}

      <style jsx>{`
        .avatar {
          display: inline-block;
          position: relative;
          overflow: hidden;
          border: 1px solid ${theme.palette.accents_2};
          border-radius: ${radius};
          vertical-align: top;
          background-color: ${theme.palette.background};
          box-sizing: border-box;
          width: ${SCALES.width(1.75) || SCALES.height(1.75)};
          height: ${SCALES.height(1.75) || SCALES.width(1.75)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${marginLeft};
        }

        .avatar-img {
          display: inline-block;
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: ${radius};
          user-select: none;
        }

        .avatar-text {
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: ${SCALES.font(1)};
          text-align: center;
          transform: translate(-50%, -50%) scale(0.65);
          white-space: nowrap;
          user-select: none;
        }
      `}</style>
    </span>
  )
}

const Avatar = withScale(AvatarBase)

export type { AvatarProps }
export { Avatar }

if (__DEV__) {
  Avatar.displayName = "Avatar"
}
