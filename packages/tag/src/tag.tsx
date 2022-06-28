import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import type { SnippetColorScheme } from "@kontui/utils"
import type { DefaultProps, ScaleProps, BaseThemePalette } from "@kontui/theme"

type TagColorTypes = SnippetColorScheme

interface TagProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLSpanElement> {
  colorScheme?: TagColorTypes
  invert?: boolean
  className?: string
}

type TagColors = {
  color: string
  bgColor: string | undefined
  borderColor: string
}

const getTagColors = (
  colorScheme: TagColorTypes,
  palette: BaseThemePalette,
  invert: boolean,
) => {
  const colors: {
    [key in TagColorTypes]: Pick<TagColors, "color"> & Partial<TagColors>
  } = {
    default: {
      color: palette.foreground,
    },
    success: {
      color: palette.success,
    },
    warning: {
      color: palette.warning,
    },
    error: {
      color: palette.error,
    },
    secondary: {
      color: palette.secondary,
    },
    dark: {
      color: palette.foreground,
      bgColor: palette.background,
    },
    lite: {
      color: palette.foreground,
      bgColor: palette.accents_2,
    },
  }
  const hideBorder = invert || colorScheme === "lite"

  const cardStyle = {
    ...colors[colorScheme],
    bgColor: colors[colorScheme].bgColor || palette.background,
    borderColor: hideBorder ? "transparent" : colors[colorScheme].color,
  }

  return !invert
    ? cardStyle
    : {
        ...cardStyle,
        color: cardStyle.bgColor,
        bgColor: cardStyle.color,
      }
}

const TagBase: React.FunctionComponent<TagProps> = (props) => {
  const {
    colorScheme = "default",
    children,
    className,
    invert = false,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const { color, bgColor, borderColor } = React.useMemo(
    () => getTagColors(colorScheme, theme.palette, invert),
    [colorScheme, theme.palette, invert],
  )

  return (
    <>
      <span className={className} {...rest}>
        {children}
      </span>
      <style jsx>{`
        span {
          display: inline-block;
          border: 1px solid ${borderColor};
          background-color: ${bgColor};
          color: ${color};
          box-sizing: border-box;
          line-height: 1em;
          border-radius: ${SCALES.height(0.3125)};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1.75)};
          padding: ${SCALES.pt(0.375)} ${SCALES.pr(0.375)} ${SCALES.pb(0.375)}
            ${SCALES.pl(0.375)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
      `}</style>
    </>
  )
}

const Tag = withScale(TagBase)

if (__DEV__) {
  Tag.displayName = "Tag"
}

export type { TagProps }
export { Tag }
