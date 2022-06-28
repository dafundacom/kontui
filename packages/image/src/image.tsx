/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import { useTheme, useScale, withScale } from "@kontui/theme"
import { useClasses, __DEV__ } from "@kontui/utils"

import { ImageSkeleton } from "./image-skeleton"
import { transformDataSource } from "./utils"

import type { DefaultProps, ScaleProps } from "@kontui/theme"

interface ImageProps
  extends DefaultProps,
    ScaleProps,
    React.HTMLAttributes<HTMLImageElement> {
  src: string
  disableSkeleton?: boolean
  className?: string
  maxDelay?: number
}

const ImageBase: React.FunctionComponent<ImageProps> = (props) => {
  const {
    src,
    disableSkeleton = false,
    className,
    maxDelay = 3000,
    ...rest
  } = props

  const { SCALES, getScaleProps } = useScale()
  const width = getScaleProps(["width", "w"])
  const height = getScaleProps(["height", "h"])
  const showAnimation = !disableSkeleton && width && height

  const theme = useTheme()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [showSkeleton, setShowSkeleton] = React.useState<boolean>(true)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const url = React.useMemo(() => transformDataSource(src), [src])

  const imageLoaded = () => {
    if (!showAnimation) return
    setLoading(false)
  }

  React.useEffect(() => {
    if (!showAnimation) return
    if (!imageRef.current) return
    if (imageRef.current.complete) {
      setLoading(false)
      setShowSkeleton(false)
    }
  })

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (showAnimation) {
        setShowSkeleton(false)
      }
      clearTimeout(timer)
    }, maxDelay)
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <>
      <div className={useClasses("image", className)}>
        {showSkeleton && showAnimation && (
          <ImageSkeleton opacity={loading ? 0.5 : 0} />
        )}
        <img ref={imageRef} onLoad={imageLoaded} src={url} {...rest} />
      </div>
      <style jsx>{`
        .image {
          position: relative;
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          max-width: 100%;
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0, "auto")} ${SCALES.mb(0)}
            ${SCALES.ml(0, "auto")};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
        }

        img {
          width: ${SCALES.width(1, "auto")};
          height: ${SCALES.height(1, "auto")};
          object-fit: scale-down;
          display: inline-block;
        }
      `}</style>
    </>
  )
}

const Image = withScale(ImageBase)

if (__DEV__) {
  Image.displayName = "Image"
}

export type { ImageProps }
export { Image }
