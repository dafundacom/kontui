import * as React from "react"

import { Accordion as InternalAccordion } from "./accordion"
import { AccordionGroup } from "./accordion-group"

import type { AccordionProps } from "./accordion"
import type { AccordionGroupProps } from "./accordion-group"

interface Accordion
  extends React.ForwardRefExoticComponent<
    AccordionProps & React.RefAttributes<HTMLDivElement>
  > {
  Group: typeof AccordionGroup
}

const Accordion = InternalAccordion as Accordion
Accordion.Group = AccordionGroup

export type { AccordionProps, AccordionGroupProps }
export { Accordion, AccordionGroup }
