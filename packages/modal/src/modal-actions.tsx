import * as React from "react"
import { useTheme } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

import type { DefaultProps } from "@kontui/theme"

interface ModalActionsProps extends DefaultProps {}

const ModalActionsBase: React.FunctionComponent<ModalActionsProps> = (
  props,
) => {
  const { children, ...rest } = props

  const theme = useTheme()
  const ref = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | string>("auto")

  React.useEffect(() => {
    if (!ref.current) return
    setHeight(`${ref.current.clientHeight}px`)
  }, [ref])

  return (
    <>
      <div />
      <footer ref={ref} {...rest}>
        {children}
      </footer>
      <style jsx>{`
        footer {
          display: flex;
          overflow: hidden;
          width: 100%;
          height: auto;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: 1px solid ${theme.palette.border};
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }

        footer > :global(button.btn + button.btn) {
          border-left: 1px solid ${theme.palette.border};
        }

        div {
          height: ${height};
          flex-shrink: 0;
        }
      `}</style>
    </>
  )
}

const ModalActions = React.memo(ModalActionsBase)

if (__DEV__) {
  ModalActions.displayName = "ModalActions"
}

export type { ModalActionsProps }
export { ModalActions }
