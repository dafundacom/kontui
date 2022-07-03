import * as React from "react"
import { Highlight } from "@kontui/layout"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { isKontElement, useRect, useClasses, __DEV__ } from "@kontui/utils"
import { TabsContext } from "./tabs-context"

import type { DefaultProps, ScaleProps } from "@kontui/theme"
import type { TabsHeaderItem, TabsConfig } from "./tabs-context"

interface TabsProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLDivElement> {
  initialValue?: string
  value?: string
  hideDivider?: boolean
  hideBorder?: boolean
  highlight?: boolean
  onChange?: any
  leftSpace?: React.CSSProperties["marginLeft"]
  hoverHeightRatio?: number
  hoverWidthRatio?: number
  align?: React.CSSProperties["justifyContent"]
  activeClassName?: string
  activeStyles?: React.CSSProperties
}

const TabsBase: React.FC<TabsProps> = (props) => {
  const {
    initialValue: userCustomInitialValue,
    value,
    hideDivider = false,
    hideBorder,
    children,
    onChange,
    className,
    leftSpace = "12px",
    highlight = true,
    hoverHeightRatio = 0.7,
    hoverWidthRatio = 1.15,
    activeClassName,
    activeStyles = {},
    align = "left",
    ...rest
  } = props

  const theme = useTheme()
  const { SCALES } = useScale()
  const [tabs, setTabs] = React.useState<Array<TabsHeaderItem>>([])
  const [selfValue, setSelfValue] = React.useState<string | undefined>(
    userCustomInitialValue,
  )
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [displayHighlight, setDisplayHighlight] = React.useState<boolean>(false)
  const { rect, setRect } = useRect()

  const register = (next: TabsHeaderItem) => {
    setTabs((last) => {
      const hasItem = last.find((item) => item.value === next.value)
      if (!hasItem) return [...last, next]
      return last.map((item) => {
        if (item.value !== next.value) return item
        return {
          ...item,
          ...next,
        }
      })
    })
  }

  const initialValue = React.useMemo<TabsConfig>(
    () => ({
      register,
      currentValue: selfValue,
      inGroup: true,
      leftSpace,
    }),
    [selfValue, leftSpace],
  )

  React.useEffect(() => {
    if (typeof value === "undefined") return
    setSelfValue(value)
  }, [value])

  const clickHandler = (value: string) => {
    setSelfValue(value)
    onChange && onChange(value)
  }
  const tabItemMouseOverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isKontElement(event.target as HTMLDivElement)) return
    setRect(event, () => ref.current)
    if (highlight) {
      setDisplayHighlight(true)
    }
  }

  return (
    <>
      <TabsContext.Provider value={initialValue}>
        <div className={useClasses("tabs", className)} {...rest}>
          <header ref={ref} onMouseLeave={() => setDisplayHighlight(false)}>
            <Highlight
              rect={rect}
              visible={displayHighlight}
              hoverHeightRatio={hoverHeightRatio}
              hoverWidthRatio={hoverWidthRatio}
            />
            <div
              className={useClasses("scroll-container", {
                "hide-divider": hideDivider,
              })}
            >
              {tabs.map(({ cell: Cell, value }) => (
                <Cell
                  key={value}
                  onClick={clickHandler}
                  onMouseOver={tabItemMouseOverHandler}
                  activeClassName={activeClassName}
                  activeStyle={activeStyles}
                  hideBorder={hideBorder}
                />
              ))}
            </div>
          </header>
        </div>
      </TabsContext.Provider>
      <div className="content">{children}</div>
      <style jsx>{`
        .tabs {
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, "initial")};
          height: ${SCALES.height(1, "auto")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
        header {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          overflow-y: hidden;
          overflow-x: scroll;
          scrollbar-width: none;
          position: relative;
        }
        .scroll-container {
          width: 100%;
          height: 100%;
          flex: 1;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: ${align};
          border-bottom: 1px solid ${theme.palette.border};
          padding-left: ${leftSpace};
        }
        header::-webkit-scrollbar {
          display: none;
        }
        .hide-divider {
          border-color: transparent;
        }
        .content {
          padding-top: 0.625rem;
        }
      `}</style>
    </>
  )
}

const Tabs = withScale(TabsBase)

if (__DEV__) {
  Tabs.displayName = "Tabs"
}

export type { TabsProps }
export { Tabs }
