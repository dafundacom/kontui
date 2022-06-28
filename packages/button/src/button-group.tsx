/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"
import { ButtonGroupContext, ButtonGroupConfig } from "./button-group-context"

import type {
  DefaultProps,
  ScaleProps,
  KontUIThemesPalette,
} from "@kontui/theme"
import { ButtonColorScheme } from "./styles"

interface ButtonGroupProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  vertical?: boolean
  ghost?: boolean
  colorScheme?: ButtonColorScheme
  className?: string
}

const getGroupBorderColors = (
  palette: KontUIThemesPalette,
  props: ButtonGroupProps,
): string => {
  const { ghost = false, colorScheme = "default" } = props
  if (!ghost && colorScheme !== "default") return palette.background
  const colors: { [key in ButtonColorScheme]?: string } = {
    default: palette.border,
    success: palette.success,
    secondary: palette.secondary,
    error: palette.error,
    warning: palette.warning,
  }
  const withoutLightType = colorScheme.replace(
    "-light",
    "",
  ) as ButtonColorScheme
  return colors[withoutLightType] || (colors.default as string)
}

const ButtonGroupBase: React.FunctionComponent<ButtonGroupProps> = (props) => {
  const theme = useTheme()
  const { SCALES } = useScale()

  const {
    disabled,
    colorScheme,
    ghost,
    vertical,
    children,
    className,
    ...rest
  } = props

  const initialValue = React.useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      colorScheme,
      ghost,
      isButtonGroup: true,
    }),
    [disabled, colorScheme],
  )
  const border = React.useMemo(() => {
    return getGroupBorderColors(theme.palette, props)
  }, [theme, colorScheme, disabled, ghost])
  const classes = useClasses(
    "button-group",
    {
      vertical: vertical,
      horizontal: !vertical,
    },
    className,
  )

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div className={classes} {...rest}>
        {children}
        <style jsx>{`
          .button-group {
            display: inline-flex;
            border-radius: ${theme.layout.radius};
            border: 1px solid ${border};
            background-color: transparent;
            overflow: hidden;
            width: ${SCALES.width(1, "auto")};
            height: ${SCALES.height(1, "min-content")};
            margin: ${SCALES.mt(0.313)} ${SCALES.mr(0.313)} ${SCALES.mb(0.313)}
              ${SCALES.ml(0.313)};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
              ${SCALES.pl(0)};
          }
          .vertical {
            flex-direction: column;
          }
          .button-group :global(.button) {
            border: none;
          }
          .button-group :global(.button .text) {
            top: 0;
          }
          .horizontal :global(.button:not(:first-child)) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: 1px solid ${border};
          }
          .horizontal :global(.button:not(:last-child)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .vertical :global(.button:not(:first-child)) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 1px solid ${border};
          }
          .vertical :global(.button:not(:last-child)) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        `}</style>
      </div>
    </ButtonGroupContext.Provider>
  )
}

const ButtonGroup = withScale(ButtonGroupBase)

if (__DEV__) {
  ButtonGroup.displayName = "ButtonGroup"
}

export type { ButtonGroupProps }
export { ButtonGroup }
