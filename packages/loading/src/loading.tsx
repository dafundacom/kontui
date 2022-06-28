import * as React from "react"

import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import type { DefaultProps, BaseThemePalette, ScaleProps } from "@kontui/theme"

import type { BaseColorScheme } from "@kontui/utils"

interface LoadingProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  colorScheme?: BaseColorScheme
  color?: string
  spaceRatio?: number
}

const getLoadingIconBgColor = (
  colorScheme: BaseColorScheme,
  palette: BaseThemePalette,
  color?: string,
) => {
  const colors: { [key in BaseColorScheme]: string } = {
    default: palette.accents_6,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }

  return color ? color : colors[colorScheme]
}

const LoadingBase: React.FunctionComponent<LoadingProps> = (props) => {
  const {
    colorScheme = "default",
    color,
    children,
    spaceRatio = 1,
    className,
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const classes = useClasses("loading-container", className)
  const bgColor = React.useMemo(
    () => getLoadingIconBgColor(colorScheme, theme.palette, color),
    [colorScheme, theme.palette, color],
  )

  return (
    <>
      <div className={classes} {...rest}>
        <span className="loading">
          {children && <label>{children}</label>}
          <i />
          <i />
          <i />
        </span>
      </div>
      <style jsx>{`
        .loading-container {
          display: inline-flex;
          align-items: center;
          position: relative;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, "100%")};
          height: ${SCALES.height(1, "100%")};
          min-height: 1em;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        label {
          margin-right: 0.5em;
          color: ${theme.palette.accents_5};
          line-height: 1;
        }

        label :global(*) {
          margin: 0;
        }

        .loading {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          user-select: none;
        }

        i {
          width: 0.25em;
          height: 0.25em;
          border-radius: 50%;
          background-color: ${bgColor};
          margin: 0 calc(0.25em / 2 * ${spaceRatio});
          display: inline-block;
          animation: loading-blink 1.4s infinite both;
        }

        i:nth-child(2) {
          animation-delay: 0.2s;
        }

        i:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes loading-blink {
          0% {
            opacity: 0.2;
          }

          20% {
            opacity: 1;
          }

          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </>
  )
}

const Loading = withScale(LoadingBase)

if (__DEV__) {
  Loading.displayName = "Loading"
}

export type { LoadingProps }
export { Loading }
