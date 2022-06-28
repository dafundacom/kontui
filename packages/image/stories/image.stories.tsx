import { Image } from "../src"

export default {
  title: "Image",
  component: Image,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const basic = () => (
  <Image
    width="280px"
    height="160px"
    src="https://mmc.tirto.id/image/2016/08/04/TIRTO-soeharto.JPG"
  />
)

export const asSVG = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 15 15" fill="none">
      <path d="M12.5 8V7.82626263C12.5 7.09695 11.903 6.5 11.1667 6.5H10C9.17157 6.5 8.5 7.17157 8.5 8C8.5 8.82843 9.17157 9.5 10 9.5H11C11.8284 9.5 12.5 10.1716 12.5 11C12.5 11.8284 11.8284 12.5 11 12.5H10C9.17157 12.5 8.5 11.8284 8.5 11M8 6.5H3M5.5 6.5V13M0.5 0.5H14.5V14.5H0.5V0.5Z" stroke="black"/></svg>`

  return <Image width="100px" height="50px" src={svg} />
}
