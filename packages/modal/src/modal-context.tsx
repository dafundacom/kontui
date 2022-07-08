import * as React from "react"

interface ModalConfig {
  close?: () => void
}

const ModalContext = React.createContext<ModalConfig>({})

const useModalContext = (): ModalConfig =>
  React.useContext<ModalConfig>(ModalContext)

export type { ModalConfig }
export { ModalContext, useModalContext }
