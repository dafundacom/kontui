import { __DEV__ } from "@kontui/utils"
import * as React from "react"

type SelectInputProps = {
  visible: boolean
  onBlur: () => void
  onFocus: () => void
}

const SelectInput = React.forwardRef<HTMLInputElement | null, SelectInputProps>(
  (props, inputRef) => {
    const { visible, onBlur, onFocus } = props

    const ref = React.useRef<HTMLInputElement | null>(null)
    React.useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      inputRef,
      () => ref.current,
    )

    React.useEffect(() => {
      if (visible) {
        ref.current?.focus()
      }
    }, [visible])

    return (
      <>
        <input
          ref={ref}
          type="search"
          role="combobox"
          aria-haspopup="listbox"
          readOnly
          unselectable="on"
          aria-expanded={visible}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <style jsx>{`
          input {
            position: fixed;
            top: -10000px;
            left: -10000px;
            opacity: 0;
            z-index: -1;
            width: 0;
            height: 0;
            padding: 0;
            font-size: 0;
            border: none;
          }
        `}</style>
      </>
    )
  },
)

if (__DEV__) {
  SelectInput.displayName = "SelectInput"
}

export type { SelectInputProps }
export { SelectInput }
