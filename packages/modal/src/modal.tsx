import * as React from "react"
import { createPortal } from "react-dom"
import { useScale, withScale } from "@kontui/theme"
import { usePortal, pickChild, useBodyScroll, __DEV__ } from "@kontui/utils"
import { useKbd, KeyCode } from "@kontui/kbd"
import { Backdrop } from "@kontui/layout"

import { ModalWrapper } from "./modal-wrapper"
import { ModalAction } from "./modal-action"
import { ModalActions } from "./modal-actions"
import { ModalContext } from "./modal-context"

import type { DefaultProps } from "@kontui/theme"
import type { ModalConfig } from "./modal-context"

interface ModalProps extends DefaultProps {
  disableBackdropClick?: boolean
  onClose?: () => void
  onContentClick?: (event: React.MouseEvent<HTMLElement>) => void
  visible?: boolean
  keyboard?: boolean
  wrapClassName?: string
  positionClassName?: string
  backdropClassName?: string
  layerClassName?: string
}

const ModalBase: React.FunctionComponent<ModalProps> = (props) => {
  const {
    visible: customVisible,
    onClose,
    children,
    keyboard = true,
    wrapClassName,
    onContentClick,
    disableBackdropClick = false,
    positionClassName,
    backdropClassName,
    layerClassName,
  } = props

  const portal = usePortal("modal")
  const { SCALES } = useScale()
  const [, setBodyHidden] = useBodyScroll(null, { delayReset: 300 })
  const [visible, setVisible] = React.useState<boolean>(false)
  const [withoutActionsChildren, ActionsChildren] = pickChild(
    children,
    ModalAction,
  )
  const hasActions =
    ActionsChildren && React.Children.count(ActionsChildren) > 0
  const closeModal = () => {
    onClose && onClose()
    setVisible(false)
    setBodyHidden(false)
  }

  React.useEffect(() => {
    if (typeof customVisible === "undefined") return
    setVisible(customVisible)
    setBodyHidden(customVisible)
  }, [customVisible])

  const { bindings } = useKbd(
    () => {
      keyboard && closeModal()
    },
    KeyCode.Escape,
    {
      disableGlobalEvent: true,
    },
  )

  const closeFromBackdrop = () => {
    if (disableBackdropClick) return
    closeModal()
  }

  const modalConfig: ModalConfig = React.useMemo(
    () => ({
      close: closeModal,
    }),
    [],
  )

  if (!portal) return null
  return createPortal(
    <ModalContext.Provider value={modalConfig}>
      <Backdrop
        onClick={closeFromBackdrop}
        onContentClick={onContentClick}
        visible={visible}
        width={SCALES.width(26)}
        positionClassName={positionClassName}
        backdropClassName={backdropClassName}
        layerClassName={layerClassName}
        {...bindings}
      >
        <ModalWrapper visible={visible} className={wrapClassName}>
          {withoutActionsChildren}
          {hasActions && <ModalActions>{ActionsChildren}</ModalActions>}
        </ModalWrapper>
      </Backdrop>
    </ModalContext.Provider>,
    portal,
  )
}

const Modal = withScale(ModalBase)

if (__DEV__) {
  Modal.displayName = "Modal"
}

export type { ModalProps }
export { Modal }
