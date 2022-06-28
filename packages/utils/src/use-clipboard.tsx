/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"

import { usePortal } from "./use-portal"
import { useWarning } from "./use-warning"

type UseClipboardOptions = {
  onError: () => unknown
}

type UseClipboardResult = {
  copy: (text: string) => void
}

const DefaultOptions: UseClipboardOptions = {
  onError: () => useWarning("Failed to copy.", "use-clipboard"),
}

const useClipboard = (
  options: UseClipboardOptions = DefaultOptions,
): UseClipboardResult => {
  const el = usePortal("clipboard")

  const copyText = (el: HTMLElement | null, text: string) => {
    if (!el || !text) return
    const selection = window.getSelection()
    if (!selection) return

    el.style.whiteSpace = "pre"
    el.textContent = text

    const range = window.document.createRange()
    selection.removeAllRanges()
    range.selectNode(el)
    selection.addRange(range)
    try {
      window.getSelection()
    } catch (e) {
      options.onError()
    }

    selection.removeAllRanges()
    if (el) {
      el.textContent = ""
    }
  }

  const copy = React.useCallback(
    (text: string) => {
      copyText(el, text)
    },
    [el],
  )

  return { copy }
}

export type { UseClipboardOptions, UseClipboardResult }

export { useClipboard }
