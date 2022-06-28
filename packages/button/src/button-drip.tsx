/* eslint-disable react-hooks/exhaustive-deps */
import { DefaultProps } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"
import * as React from "react"

interface ButtonDripProps
  extends DefaultProps,
    React.HTMLAttributes<HTMLDivElement> {
  x: number
  y: number
  onCompleted: () => void
  color: string
}

const ButtonDrip: React.FunctionComponent<ButtonDripProps> = (props) => {
  const { x = 0, y = 0, color, onCompleted } = props

  const dripRef = React.useRef<HTMLDivElement>(null)
  /* istanbul ignore next */
  const top = Number.isNaN(+y) ? 0 : y - 10
  /* istanbul ignore next */
  const left = Number.isNaN(+x) ? 0 : x - 10

  React.useEffect(() => {
    /* istanbul ignore next */
    if (!dripRef.current) return
    dripRef.current.addEventListener("animationend", onCompleted)
    return () => {
      /* istanbul ignore next */
      if (!dripRef.current) return
      dripRef.current.removeEventListener("animationend", onCompleted)
    }
  })

  return (
    <>
      <div ref={dripRef} className="button-drip">
        <svg width="20" height="20" viewBox="0 0 20 20" style={{ top, left }}>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g fill={color}>
              <rect width="100%" height="100%" rx="10" />
            </g>
          </g>
        </svg>
      </div>
      <style jsx>{`
        .button-drip {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }

        svg {
          position: absolute;
          animation: 350ms ease-in expand;
          animation-fill-mode: forwards;
          width: 1rem;
          height: 1rem;
        }

        @keyframes expand {
          0% {
            opacity: 0;
            transform: scale(1);
          }
          30% {
            opacity: 1;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: scale(28);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

if (__DEV__) {
  ButtonDrip.displayName = "ButtonDrip"
}

export type { ButtonDripProps }
export { ButtonDrip }
