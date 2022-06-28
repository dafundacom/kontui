module.exports = {
  stories: ["../packages/**/stories/*.stories.tsx"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-storysource",
    "@storybook/addon-toolbars",
    "storybook-addon-performance/register",
  ],
  framework: "@storybook/react",
}
