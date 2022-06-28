/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"

type ShapeType = {
  width: number
  height: number
}

const getRealShape = (el: HTMLElement | null): ShapeType => {
  const defaultShape: ShapeType = { width: 0, height: 0 }
  if (!el || typeof window === "undefined") return defaultShape

  const rect = el.getBoundingClientRect()
  const { width, height } = window.getComputedStyle(el)

  const getCSSStyleVal = (str: string, parentNum: number) => {
    if (!str) return 0
    const strVal = str.includes("px")
      ? +str.split("px")[0]
      : str.includes("%")
      ? +str.split("%")[0] * parentNum * 0.01
      : str

    return Number.isNaN(+strVal) ? 0 : +strVal
  }

  return {
    width: getCSSStyleVal(`${width}`, rect.width),
    height: getCSSStyleVal(`${height}`, rect.height),
  }
}

type ShapeResult = [ShapeType, () => void]

const useRealShape = <T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
): ShapeResult => {
  const [state, setState] = React.useState<ShapeType>({
    width: 0,
    height: 0,
  })
  const update = () => {
    const { width, height } = getRealShape(ref.current)
    setState({ width, height })
  }
  React.useEffect(() => update(), [ref.current])

  return [state, update]
}

export type { ShapeType, ShapeResult }

export { getRealShape, useRealShape }
