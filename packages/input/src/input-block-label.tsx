import * as React from "react"
import { useTheme } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

interface InputBlockLabelProps extends React.HTMLAttributes<HTMLLabelElement> {}

const InputBlockLabelBase: React.FunctionComponent<InputBlockLabelProps> = ({
  children,
}) => {
  const theme = useTheme()

  return (
    <>
      <label>{children}</label>
      <style jsx>{`
        label {
          display: block;
          font-weight: normal;
          color: ${theme.palette.accents_6};
          padding: 0 0 0 1px;
          margin-bottom: 0.5em;
          font-size: 1em;
          line-height: 1.5;
        }

        label > :global(*:first-child) {
          margin-top: 0;
        }

        label > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  )
}

const InputBlockLabel = React.memo(InputBlockLabelBase)

if (__DEV__) {
  InputBlockLabel.displayName = "InputBlockLabel"
}

export type { InputBlockLabelProps }
export { InputBlockLabel }
