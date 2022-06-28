/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"

import { Input } from "../src"
import { Check } from "./check"
import { Bullet } from "../../bullet"
import { Code } from "../../code"
import { Spacer } from "../../layout"
import { Text } from "../../text"

export default {
  title: "Input",
  component: Input,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => <Input placeholder="jon@gmail.com" />

export const sizes = () => (
  <>
    <Input scale={1 / 3} placeholder="Scale 1/3" /> <Spacer h={0.5} />
    <Input scale={2 / 3} placeholder="Scale 2/3" /> <Spacer h={0.5} />
    <Input placeholder="Scale 1" /> <Spacer h={0.5} />
    <Input scale={4 / 3} placeholder="Scale 4/3" />
  </>
)

export const disabled = () => (
  <>
    <Input placeholder="Disabled" disabled />
    <Input placeholder="jon@gmail.com" disabled />
  </>
)

export const readOnly = () => (
  <>
    <Input placeholder="read-only" readOnly initialValue="readOnly" />
    <Input placeholder="jon@gmail.com" readOnly initialValue="readOnly" />
  </>
)

export const withLabel = () => (
  <>
    <Input label="username" placeholder="KontUI" />
    <Spacer h={0.5} />
    <Input labelRight=".com" placeholder="https://github" />
  </>
)

export const customLabel = () => (
  <>
    <Input placeholder="KontUI">Username</Input>
    <Spacer />
    <Input placeholder="Post title" width="50%">
      <Text h3>Title</Text>
    </Input>
    <Spacer />
    <Input placeholder="GitHub Actions" width="50%">
      <Bullet colorScheme="warning">
        <Text small>
          Problem area for <Code>deployment</Code>
        </Text>
      </Bullet>
    </Input>
  </>
)

export const State = () => (
  <>
    <Input colorScheme="secondary" initialValue="KontUI" />
    <Spacer h={0.5} />
    <Input colorScheme="success" initialValue="KontUI" />
    <Spacer h={0.5} />
    <Input colorScheme="warning" initialValue="KontUI" />
    <Spacer h={0.5} />
    <Input colorScheme="error" initialValue="KontUI" />
  </>
)

export const withIcon = () => (
  <>
    <Input icon={<Check />} placeholder="Check" />
    <Spacer h={0.5} />
    <Input iconRight={<Check />} placeholder="Check" />
  </>
)

export const clearable = () => (
  <>
    <Input clearable initialValue="KontUI" placeholder="KontUI" />
  </>
)

export const inputPassword = () => <Input.Password initialValue="123456abc" />

export const withStateChange = () => {
  const [value, setValue] = React.useState()
  const handler = (e: any) => {
    setValue(e.target.value)
    console.log(e.target.value)
  }
  return <Input value={value} onChange={handler} placeholder="KontUI" />
}
