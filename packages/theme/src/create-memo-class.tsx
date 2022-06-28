/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"

export function createMemoClass(func: (props: any) => string) {
  return function useMemoClass(args?: any) {
    const dependencies =
      typeof args === "object" && args !== null
        ? Object.keys(args)
            .filter((key) => key !== "theme")
            .map((key) => args[key])
        : []

    return React.useMemo(() => func(args), dependencies)
  }
}
