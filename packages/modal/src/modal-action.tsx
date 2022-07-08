/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"
import css from "styled-jsx/css"
import { Button } from "@kontui/button"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"
import { useModalContext } from "./modal-context"

import type { ButtonProps } from "@kontui/button"

type ModalActionEvent = React.MouseEvent<HTMLButtonElement> & {
  close: () => void
}

interface IModalActionProps {
  className?: string
  passive?: boolean
  disabled?: boolean
  onClick?: (event: ModalActionEvent) => void
}

type ModalActionProps = IModalActionProps &
  Omit<ButtonProps, keyof IModalActionProps>

const ModalActionBase = React.forwardRef<HTMLButtonElement, ModalActionProps>(
  (props, ref) => {
    const {
      className,
      children,
      onClick,
      passive = false,
      disabled = false,
      ...rest
    } = props

    const theme = useTheme()
    const { SCALES } = useScale()
    const btnRef = React.useRef<HTMLButtonElement>(null)
    const { close } = useModalContext()
    React.useImperativeHandle(ref, () => btnRef.current as HTMLButtonElement)

    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      const actionEvent = Object.assign({}, event, {
        close: () => close && close(),
      })
      onClick && onClick(actionEvent)
    }

    const color = React.useMemo(() => {
      return passive ? theme.palette.accents_5 : theme.palette.foreground
    }, [theme.palette, passive, disabled])

    const bgColor = React.useMemo(() => {
      return disabled ? theme.palette.accents_1 : theme.palette.background
    }, [theme.palette, disabled])

    const { className: resolveClassName, styles } = css.resolve`
      button.button {
        font-size: ${SCALES.font(0.75)};
        border: none;
        color: ${color};
        background-color: ${theme.palette.background};
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        flex: 1;
        height: ${SCALES.height(3.5625)};
        border-radius: 0;
        min-width: 0;
      }
      button.button:hover,
      button.button:focus {
        color: ${disabled ? color : theme.palette.foreground};
        background-color: ${disabled ? bgColor : theme.palette.accents_1};
      }
    `
    const classes = useClasses(resolveClassName, className)

    const overrideProps = {
      ...rest,
      effect: false,
      ref: btnRef,
    }

    return (
      <Button
        className={classes}
        onClick={clickHandler}
        disabled={disabled}
        {...overrideProps}
      >
        {children}
        {styles}
      </Button>
    )
  },
)

const ModalAction = withScale(ModalActionBase)

if (__DEV__) {
  ModalAction.displayName = "ModalAction"
}

export type { ModalActionProps }
export { ModalAction }
