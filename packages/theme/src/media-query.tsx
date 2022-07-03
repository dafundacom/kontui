/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { tuple } from "@kontui/utils"
import { useTheme } from "./theme-context"

import type { BreakpointsItem, BaseThemeBreakpoints } from "./presets/types"

const breakpoints = tuple("xs", "sm", "md", "lg", "xl", "mobile")
type ResponsiveBreakpoint = typeof breakpoints[number]

const matchType = tuple("up", "down", "default")
type ResponsiveMatchType = typeof matchType[number]
type ResponsiveOptions = {
  match?: ResponsiveMatchType
  ssrMatchMedia?: (query: string) => { matches: boolean }
}

const defaultResponsiveOptions = {
  match: "default" as ResponsiveMatchType,
}

const makeQueries = (
  bp: BaseThemeBreakpoints,
  up: boolean,
  down: boolean,
): {
  [key in ResponsiveBreakpoint]: string
} => {
  const queryString = (item: BreakpointsItem) => {
    const upQuery = `(min-width: ${item.min})`
    const downQuery = `(max-width: ${item.max})`
    return up ? upQuery : down ? downQuery : `${upQuery} and ${downQuery}`
  }
  const xs = queryString(bp.xs)
  return {
    xs: xs,
    mobile: xs,
    sm: queryString(bp.sm),
    md: queryString(bp.md),
    lg: queryString(bp.lg),
    xl: queryString(bp.xl),
  }
}

const useMediaQuery = (
  breakpoint: ResponsiveBreakpoint,
  options: ResponsiveOptions = defaultResponsiveOptions,
) => {
  const { match: matchType = "default", ssrMatchMedia = null } = options
  const supportMedia =
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined"

  const theme = useTheme()
  const mediaQueries: {
    [key in ResponsiveBreakpoint]: string
  } = React.useMemo(() => {
    const up = matchType === "up"
    const down = matchType === "down"
    return makeQueries(theme.breakpoints, up, down)
  }, [theme.breakpoints, options])
  const query = React.useMemo(
    () => mediaQueries[breakpoint],
    [mediaQueries, breakpoint],
  )
  const matchQuery = (q: string) => window.matchMedia(q)

  /**
   * Do nothing in the server-side rendering.
   * If server match query fucntion is simulated, return user-defined value first.
   */
  const [state, setState] = React.useState<boolean>(() => {
    if (supportMedia) return matchQuery(query).matches
    if (ssrMatchMedia && typeof ssrMatchMedia === "function") {
      return ssrMatchMedia(query).matches
    }
    return false
  })

  React.useEffect(() => {
    if (!supportMedia) return
    const queryList = matchQuery(query)
    const update = () => setState(matchQuery(query).matches)
    update()

    /**
     * addListener is deprecated. EventTarget.addEventListener is recommended.
     * But in some old browsers, MediaQueryList does not inherit from EventTarget.
     */
    queryList.addListener(update)
    return () => {
      queryList.removeListener(update)
    }
  }, [supportMedia])

  return state
}

export type { ResponsiveBreakpoint, ResponsiveMatchType, ResponsiveOptions }
export { useMediaQuery }
