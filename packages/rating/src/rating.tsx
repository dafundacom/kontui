/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, tupleNumber, __DEV__ } from "@kontui/utils"
import { RatingIcon } from "./rating-icon"

import type { BaseThemePalette, DefaultProps, ScaleProps } from "@kontui/theme"
import type { BaseColorScheme } from "@kontui/utils"

const ratingCountTuple = tupleNumber(2, 3, 4, 5, 6, 7, 8, 9, 10)
const ratingValueTuple = tupleNumber(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
export type RatingValue = typeof ratingValueTuple[number]
export type RatingCount = typeof ratingCountTuple[number]

interface RatingProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  colorScheme?: BaseColorScheme
  icon?: JSX.Element
  count?: RatingCount | number
  value?: RatingValue | number
  initialValue?: RatingValue
  onValueChange?: (value: number) => void
  locked?: boolean
  onLockedChange?: (locked: boolean) => void
}

const getRatingColor = (
  colorScheme: BaseColorScheme,
  palette: BaseThemePalette,
): string => {
  const colors: { [key in BaseColorScheme]?: string } = {
    default: palette.foreground,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }
  return colors[colorScheme] || (colors.default as string)
}

const RatingBase: React.FunctionComponent<RatingProps> = (props) => {
  const {
    colorScheme = "default",
    className,
    icon = <RatingIcon />,
    count = 5,
    value: customValue,
    initialValue = 1,
    onValueChange,
    locked = false,
    onLockedChange,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const color = React.useMemo(
    () => getRatingColor(colorScheme, theme.palette),
    [colorScheme, theme.palette],
  )
  const [value, setValue] = React.useState<number>(initialValue)
  const [isLocked, setIsLocked] = React.useState<boolean>(locked)

  const lockedChangeHandler = (next: boolean) => {
    setIsLocked(next)
    onLockedChange && onLockedChange(next)
  }
  const valueChangeHandler = (next: number) => {
    setValue(next)
    const emitValue = next > count ? count : next
    onValueChange && onValueChange(emitValue)
  }
  const clickHandler = (index: number) => {
    if (isLocked) return lockedChangeHandler(false)
    valueChangeHandler(index)
    lockedChangeHandler(true)
  }
  const mouseEnterHandler = (index: number) => {
    if (isLocked) return
    valueChangeHandler(index)
  }

  React.useEffect(() => {
    if (typeof customValue === "undefined") return
    setValue(customValue < 0 ? 0 : customValue)
  }, [customValue])

  return (
    <>
      <div className={useClasses("rating", className)} {...rest}>
        {[...Array(count)].map((_, index) => (
          <div
            className={useClasses("icon-box", {
              hovered: index + 1 <= value,
            })}
            key={index}
            onMouseEnter={() => mouseEnterHandler(index + 1)}
            onClick={() => clickHandler(index + 1)}
          >
            {icon}
          </div>
        ))}
      </div>
      <style jsx>{`
        .rating {
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          --rating-font-size: ${SCALES.font(1)};
          font-size: var(--rating-font-size);
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
        .icon-box {
          box-sizing: border-box;
          color: ${color};
          width: calc(var(--rating-font-size) * 1.5);
          height: calc(var(--rating-font-size) * 1.5);
          margin-right: calc(var(--rating-font-size) * 1 / 5);
          cursor: ${isLocked ? "default" : "pointer"};
        }
        .icon-box :global(svg) {
          width: 100%;
          height: 100%;
          fill: transparent;
          transform: scale(1);
          transition: transform, color, fill 30ms linear;
        }
        .hovered :global(svg) {
          fill: ${color};
          transform: scale(0.9);
        }
      `}</style>
    </>
  )
}

const Rating = withScale(RatingBase)

if (__DEV__) {
  Rating.displayName = "Rating"
}

export type { RatingProps }
export { Rating }
