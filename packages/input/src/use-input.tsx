import * as React from "react"
import { useCurrentState } from "@kontui/utils"

type BindingsChangeTarget =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | string

const useInput = (
  initialValue: string,
): {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  currentRef: React.MutableRefObject<string>
  reset: () => void
  bindings: {
    value: string
    onChange: (event: BindingsChangeTarget) => void
  }
} => {
  const [state, setState, currentRef] = useCurrentState<string>(initialValue)

  return {
    state,
    setState,
    currentRef,
    reset: () => setState(initialValue),
    bindings: {
      value: state,
      onChange: (event: BindingsChangeTarget) => {
        if (typeof event === "object" && event.target) {
          setState(event.target.value)
        } else {
          setState(event as string)
        }
      },
    },
  }
}

export type { BindingsChangeTarget }
export { useInput }
