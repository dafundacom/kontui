import * as React from "react"

import { Modal as InternalModal } from "./modal"
import { ModalAction } from "./modal-action"
import { ModalTitle } from "./modal-title"
import { ModalSubtitle } from "./modal-subtitle"
import { ModalContent } from "./modal-content"

import type { ModalProps } from "./modal"
import type { ModalActionProps } from "./modal-action"
import type { ModalTitleProps } from "./modal-title"
import type { ModalSubtitleProps } from "./modal-subtitle"
import type { ModalContentProps } from "./modal-content"

interface Modal
  extends React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<HTMLDivElement>
  > {
  Action: typeof ModalAction
  Title: typeof ModalTitle
  Subtitle: typeof ModalSubtitle
  Content: typeof ModalContent
}

const Modal = InternalModal as Modal
Modal.Action = ModalAction
Modal.Title = ModalTitle
Modal.Subtitle = ModalSubtitle
Modal.Content = ModalContent

export type {
  ModalProps,
  ModalActionProps,
  ModalTitleProps,
  ModalSubtitleProps,
  ModalContentProps,
}
export { Modal, ModalAction, ModalTitle, ModalSubtitle, ModalContent }
