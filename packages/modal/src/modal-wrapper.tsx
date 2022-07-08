/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"
import { useTheme, useScale, CssTransition } from "@kontui/theme"
import { useClasses, isChildElement, __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

interface ModalWrapperProps extends DefaultProps {
  visible?: boolean
}

const ModalWrapper: React.FunctionComponent<ModalWrapperProps> = (props) => {
  const { className, children, visible = false, ...rest } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const modalContent = React.useRef<HTMLDivElement>(null)
  const tabStart = React.useRef<HTMLDivElement>(null)
  const tabEnd = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!visible) return
    const activeElement = document.activeElement
    const isChild = isChildElement(modalContent.current, activeElement)
    if (isChild) return
    tabStart.current && tabStart.current.focus()
  }, [visible])

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isTabDown = event.keyCode === 9
    if (!visible || !isTabDown) return
    const activeElement = document.activeElement
    if (event.shiftKey) {
      if (activeElement === tabStart.current) {
        tabEnd.current && tabEnd.current.focus()
      }
    } else {
      if (activeElement === tabEnd.current) {
        tabStart.current && tabStart.current.focus()
      }
    }
  }

  return (
    <CssTransition name="wrapper" visible={visible} clearTime={300}>
      <div
        className={useClasses("wrapper", className)}
        role="dialog"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        ref={modalContent}
        {...rest}
      >
        <div
          tabIndex={0}
          className="hide-tab"
          aria-hidden="true"
          ref={tabStart}
        />
        {children}
        <div
          tabIndex={0}
          className="hide-tab"
          aria-hidden="true"
          ref={tabEnd}
        />
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 100%;
          vertical-align: middle;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          box-sizing: border-box;
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
          border-radius: ${theme.layout.radius};
          box-shadow: ${theme.expressiveness.shadowLarge};
          opacity: 0;
          outline: none;
          transform: translate3d(0px, -30px, 0px);
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s,
            transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s;
          width: 100%;
          font-size: ${SCALES.font(1)};
          height: ${SCALES.height(1, "auto")};
          --modal-wrapper-padding-left: ${SCALES.pl(1.3125)};
          --modal-wrapper-padding-right: ${SCALES.pr(1.3125)};
          padding: ${SCALES.pt(1.3125)} var(--modal-wrapper-padding-right)
            ${SCALES.pb(1.3125)} var(--modal-wrapper-padding-left);
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .wrapper-enter {
          opacity: 0;
          transform: translate3d(0px, -30px, 0px);
        }

        .wrapper-enter-active {
          opacity: 1;
          transform: translate3d(0px, 0px, 0px);
        }

        .wrapper-leave {
          opacity: 1;
          transform: translate3d(0px, 0px, 0px);
        }

        .wrapper-leave-active {
          opacity: 0;
          transform: translate3d(0px, -30px, 0px);
        }

        .hide-tab {
          outline: none;
          overflow: hidden;
          width: 0;
          height: 0;
          opacity: 0;
        }
      `}</style>
    </CssTransition>
  )
}

if (__DEV__) {
  ModalWrapper.displayName = "ModalWrapper"
}

export type { ModalWrapperProps }
export { ModalWrapper }
