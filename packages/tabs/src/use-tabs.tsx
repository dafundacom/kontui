import * as React from "react"
import { useCurrentState } from "@kontui/utils"

const useTabs = (
  initialValue: string,
): {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  currentRef: React.MutableRefObject<string>
  bindings: {
    value: string
    onChange: (val: string) => void
  }
} => {
  const [state, setState, currentRef] = useCurrentState<string>(initialValue)

  return {
    state,
    setState,
    currentRef,
    bindings: {
      value: state,
      onChange: (val: string) => {
        setState(val)
      },
    },
  }
}

export { useTabs }
