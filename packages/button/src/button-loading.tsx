import * as React from "react"
import { Loading } from "@kontui/loading"

import type { DefaultProps } from "@kontui/theme"
import { __DEV__ } from "@kontui/utils"

interface ButtonLoadingProps
  extends DefaultProps,
    React.HTMLAttributes<HTMLDivElement> {
  color: string
}

const ButtonLoading: React.FunctionComponent<ButtonLoadingProps> = (props) => {
  const { color } = props

  return (
    <>
      <div className="button-loading">
        <Loading color={color} />
      </div>
      <style jsx>{`
        .button-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          background-color: var(--kontui-button-bg);
        }
      `}</style>
    </>
  )
}

if (__DEV__) {
  ButtonLoading.displayName = "ButtonLoading"
}

export type { ButtonLoadingProps }
export { ButtonLoading }
