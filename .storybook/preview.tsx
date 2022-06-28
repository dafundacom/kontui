import { withPerformance } from "storybook-addon-performance"

import { ThemeProvider, CssBaseline } from "../packages/theme"

const withKontui = (StoryFn: Function) => {
  return (
    <>
      <ThemeProvider>
        <CssBaseline />
        <div
          id="story-wrapper"
          style={{
            minHeight: "100vh",
            marginTop: "10px",
            marginBottom: "10px;",
          }}
        >
          <StoryFn />
        </div>
      </ThemeProvider>
    </>
  )
}

export const decorators = [withKontui, withPerformance]
