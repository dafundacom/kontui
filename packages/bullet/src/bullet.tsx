import * as React from "react"

import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps, KontUIThemes } from "@kontui/theme"
import type { NormalTypes } from "@kontui/utils"

interface BulletProps
  extends DefaultProps,
    React.HTMLAttributes<HTMLSpanElement> {
  /* as element */
  as?: React.ElementType
  /* Controls bullet appearance */
  colorScheme?: NormalTypes
}

const getColor = (colorScheme: NormalTypes, theme: KontUIThemes): string => {
  const colors: { [key in NormalTypes]?: string } = {
    default: theme.palette.accents_2,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  }
  return colors[colorScheme] || (colors.default as string)
}

const BulletBase: React.FunctionComponent<BulletProps> = (props) => {
  const {
    as: Comp = "span",
    colorScheme = "default",
    className,
    children,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const color = React.useMemo(
    () => getColor(colorScheme, theme),
    [colorScheme, theme],
  )
  return (
    <>
      <Comp className={useClasses("bullet", className)} {...rest}>
        <span className="bullet-icon" />
        <span className="bullet-label">{children}</span>
      </Comp>
      <style jsx>{`
        .bullet {
          display: inline-flex;
          align-items: center;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
        .bullet-icon {
          width: 0.625em;
          height: 0.625em;
          min-width: calc(0.625 * 12px);
          min-height: calc(0.625 * 12px);
          line-height: 0.625em;
          border-radius: 50%;
          background-color: ${color};
          user-select: none;
        }
        .bullet-label {
          margin-left: 0.5em;
          font-size: 1em;
          line-height: 1em;
          text-transform: capitalize;
        }
      `}</style>
    </>
  )
}

const Bullet = withScale(BulletBase)

if (__DEV__) {
  Bullet.displayName = "Bullet"
}

export type { BulletProps }
export { Bullet }
