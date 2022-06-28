import {
  Icon,
  InfoIcon,
  XCricleIcon,
  CheckCircleIcon,
  ExclamationIcon,
} from "../src"

export default {
  title: "Icon",
  component: Icon,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <div className="flex space-x-6">
    <Icon as={InfoIcon} label="info" className="h-6 w-6 text-blue-500" />
    <Icon
      as={XCricleIcon}
      label="x-circle"
      className="h-6 w-6 text-green-500"
    />
    <Icon
      as={CheckCircleIcon}
      label="check-circle"
      className="h-6 w-6 text-red-500"
    />
    <Icon
      as={ExclamationIcon}
      label="exclamationI"
      className="h-6 w-6 text-yellow-500"
    />
  </div>
)
