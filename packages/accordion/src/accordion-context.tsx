import * as React from "react"

interface AccordionConfig {
  values: Array<number>
  updateValues?: (currentIndex: number, nextState: boolean) => unknown
}

const defaultContext = {
  values: [],
}

const AccordionContext = React.createContext<AccordionConfig>(defaultContext)

const useAccordionContext = (): AccordionConfig =>
  React.useContext<AccordionConfig>(AccordionContext)

export type { AccordionConfig }
export { AccordionContext, useAccordionContext }
