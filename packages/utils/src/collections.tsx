import * as React from "react"

const getId = () => {
  return Math.random().toString(32).slice(2, 10)
}

const capitalize = (str: string | symbol | number | undefined | null) => {
  const safeStr = String(str).trim()
  return safeStr.charAt(0).toUpperCase() + safeStr.slice(1)
}

const hasChild = (
  children: React.ReactNode | undefined,
  child: React.ElementType,
): boolean => {
  const types = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return null
    return item.type
  })

  return (types || []).includes(child)
}

const pickChild = (
  children: React.ReactNode | undefined,
  targetChild: React.ElementType,
): [React.ReactNode | undefined, React.ReactNode | undefined] => {
  let target: React.ReactNode[] = []
  const withoutTargetChildren = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return item
    if (item.type === targetChild) {
      target.push(item)
      return null
    }
    return item
  })

  const targetChildren = target.length >= 0 ? target : undefined

  return [withoutTargetChildren, targetChildren]
}

const pickChildByProps = (
  children: React.ReactNode | undefined,
  key: string,
  value: any,
): [React.ReactNode | undefined, React.ReactNode | undefined] => {
  let target: React.ReactNode[] = []
  const isArray = Array.isArray(value)
  const withoutPropChildren = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return null
    if (!item.props) return item
    if (isArray) {
      if (value.includes(item.props[key])) {
        target.push(item)
        return null
      }
      return item
    }
    if (item.props[key] === value) {
      target.push(item)
      return null
    }
    return item
  })

  const targetChildren = target.length >= 0 ? target : undefined

  return [withoutPropChildren, targetChildren]
}

const pickChildrenFirst = (
  children: React.ReactNode | undefined,
): React.ReactNode | undefined => {
  return React.Children.toArray(children)[0]
}

const setChildrenProps = (
  children: React.ReactNode | undefined,
  props: Record<string, unknown>,
  targetComponents: Array<React.ElementType> = [],
): React.ReactNode | undefined => {
  if (React.Children.count(children) === 0) return []
  const allowAll = targetComponents.length === 0
  const clone = (child: React.ReactElement, props = {}) =>
    React.cloneElement(child, props)

  return React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return item
    if (allowAll) return clone(item, props)

    const isAllowed = targetComponents.find((child) => child === item.type)
    if (isAllowed) return clone(item, props)
    return item
  })
}

const setChildrenIndex = (
  children: React.ReactNode | undefined,
  targetComponents: Array<React.ElementType> = [],
): React.ReactNode | undefined => {
  if (React.Children.count(children) === 0) return []
  const allowAll = targetComponents.length === 0
  const clone = (child: React.ReactElement, props = {}) =>
    React.cloneElement(child, props)
  let index = 0

  return React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return item
    index = index + 1
    if (allowAll) return clone(item, { index })

    const isAllowed = targetComponents.find((child) => child === item.type)
    if (isAllowed) return clone(item, { index })
    index = index - 1
    return item
  })
}

const getReactNode = (
  node?: React.ReactNode | (() => React.ReactNode),
): React.ReactNode => {
  if (!node) return null

  if (typeof node !== "function") return node
  return (node as () => React.ReactNode)()
}

const isChildElement = (
  parent: Element | null | undefined,
  child: Element | null | undefined,
): boolean => {
  if (!parent || !child) return false
  let node: (Node & ParentNode) | null = child
  while (node) {
    if (node === parent) return true
    node = node.parentNode
  }
  return false
}

const isKontElement = (el?: HTMLElement): boolean => {
  if (!el) return false
  if (el?.dataset && el?.dataset["geist"]) return true
  el.attributes.getNamedItem("data-geist")
  return !!el.attributes.getNamedItem("data-geist")
}

const isBrowser = (): boolean => {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement,
  )
}

const isMac = (): boolean => {
  if (!isBrowser()) return false
  return navigator.platform.toUpperCase().indexOf("MAC") >= 0
}

const isCSSNumberValue = (value?: string | number) =>
  value !== undefined && !Number.isNaN(+value)

export {
  getId,
  capitalize,
  hasChild,
  pickChild,
  pickChildByProps,
  pickChildrenFirst,
  setChildrenProps,
  setChildrenIndex,
  getReactNode,
  isChildElement,
  isKontElement,
  isBrowser,
  isMac,
  isCSSNumberValue,
}
