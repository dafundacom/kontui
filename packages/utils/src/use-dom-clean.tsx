import * as React from "react"

const useDomClean = (): void => {
  React.useEffect(() => {
    document.documentElement.removeAttribute("style")
    document.body.removeAttribute("style")
  }, [])
}

export { useDomClean }
