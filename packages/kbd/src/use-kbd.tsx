/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react"

import { KeyMod } from "./shortcuts"
import { getActiveModMap, getCtrlKeysByPlatform } from "./utils"

type KbdOptions = {
  disableGlobalEvent?: boolean
  stopPropagation?: boolean
  preventDefault?: boolean
  capture?: boolean
  event?: "keydown" | "keypress" | "keyup"
}

type KbdResult = {
  bindings: {
    onKeyDown: React.KeyboardEventHandler
    onKeyDownCapture: React.KeyboardEventHandler
    onKeyPress: React.KeyboardEventHandler
    onKeyPressCapture: React.KeyboardEventHandler
    onKeyUp: React.KeyboardEventHandler
    onKeyUpCapture: React.KeyboardEventHandler
  }
}

type UseKbdHandler = (event: React.KeyboardEvent | KeyboardEvent) => void

type UseKbd = (
  handler: UseKbdHandler,
  keyBindings: Array<number> | number,
  options?: KbdOptions,
) => KbdResult

const useKbd: UseKbd = (handler, keyBindings, options = {}) => {
  const bindings = Array.isArray(keyBindings)
    ? (keyBindings as number[])
    : [keyBindings]
  const {
    disableGlobalEvent = false,
    capture = false,
    stopPropagation = false,
    preventDefault = true,
    event = "keydown",
  } = options
  const activeModMap = getActiveModMap(bindings)
  const keyCode = bindings.filter((item: number) => !KeyMod[item])
  const { CtrlCmd, WinCtrl } = getCtrlKeysByPlatform()

  const eventHandler = (event: React.KeyboardEvent | KeyboardEvent) => {
    if (activeModMap.Shift && !event.shiftKey) return
    if (activeModMap.Alt && !event.altKey) return
    if (activeModMap.CtrlCmd && !event[CtrlCmd]) return
    if (activeModMap.WinCtrl && !event[WinCtrl]) return
    const hitOne = keyCode.find((k) => k === event.keyCode)
    if (keyCode && !hitOne) return
    if (stopPropagation) {
      event.stopPropagation()
    }
    if (preventDefault) {
      event.preventDefault()
    }
    handler && handler(event)
  }

  React.useEffect(() => {
    if (!disableGlobalEvent) {
      document.addEventListener(event, eventHandler)
    }
    return () => {
      document.removeEventListener(event, eventHandler)
    }
  }, [disableGlobalEvent])

  const elementBindingHandler = (
    elementEventType: "keydown" | "keypress" | "keyup",
    isCapture: boolean = false,
  ) => {
    if (elementEventType !== event) return () => {}
    if (isCapture !== capture) return () => {}
    return (e: React.KeyboardEvent) => eventHandler(e)
  }

  return {
    bindings: {
      onKeyDown: elementBindingHandler("keydown"),
      onKeyDownCapture: elementBindingHandler("keydown", true),
      onKeyPress: elementBindingHandler("keypress"),
      onKeyPressCapture: elementBindingHandler("keypress", true),
      onKeyUp: elementBindingHandler("keyup"),
      onKeyUpCapture: elementBindingHandler("keyup", true),
    },
  }
}

export type { KbdOptions, KbdResult, UseKbdHandler, UseKbd }
export { useKbd }
