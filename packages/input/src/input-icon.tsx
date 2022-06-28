import * as React from "react"
import { __DEV__ } from "@kontui/utils"

interface InputIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: React.ReactNode
  clickable?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const InputIconBase: React.FunctionComponent<InputIconProps> = (props) => {
  const { icon, clickable, onClick } = props
  return (
    <>
      <span className="input-icon" onClick={onClick}>
        {icon}
      </span>
      <style jsx>{`
        .input-icon {
          box-sizing: border-box;
          display: inline-flex;
          width: calc(var(--input-height) - 2px);
          flex-shrink: 0;
          height: 100%;
          align-items: center;
          justify-content: center;
          margin: 0;
          padding: 0;
          line-height: 1;
          position: relative;
          cursor: ${clickable ? "pointer" : "default"};
          pointer-events: ${clickable ? "auto" : "none"};
        }
        .input-icon :global(svg) {
          width: calc(var(--input-height) - 2px);
          height: calc(var(--input-height) - 2px);
          transform: scale(0.44);
        }
      `}</style>
    </>
  )
}

const InputIcon = React.memo(InputIconBase)

if (__DEV__) {
  InputIcon.displayName = "InputIcon"
}

export type { InputIconProps }
export { InputIcon }
