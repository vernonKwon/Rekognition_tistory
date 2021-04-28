/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect, useCallback } from "react"
import "./App.css"
import Styled from "styled-components"
import { callFaceInfo } from "./lib/axiosInstance"

import { Data } from "./types/face"

interface ServerData {
  status: String
  data: Data
}

interface returnType {
  status: number
  data: ServerData
}

const Parents = Styled.div`
  position : relative;
`
const Child = Styled.div`
  position : absolute;
  background-color :rgba( 255, 255, 255, 0 );
`
interface ImgSize {
  width: number | undefined
  height: number | undefined
}
const success = "success"
const fail = "fail"
const FaceDiv = (locateInfo: any): JSX.Element => {
  return <div style={{ border: "3px solid blue", ...locateInfo }} />
}
const App = () => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [imgAssets, setImgAssets] = useState<any>()
  const [childViewStyle, setChildViewStyle] = useState({})
  const [isLoading, setLoad] = useState<boolean>(false)
  const [faceDivList, setFaceDivList] = useState<Array<JSX.Element>>()

  const imgSizeCheck = useCallback((): ImgSize => {
    const preview = imgRef.current
    const width = preview?.clientWidth
    const height = preview?.clientHeight

    return { width, height }
  }, [imgRef])

  const setImage = useCallback((image: any) => {
    const reader = new FileReader()

    reader.readAsDataURL(image)
    reader.onloadend = () => {
      const base64 = reader.result
      if (base64) setImgAssets(base64.toString())
    }
  }, [])

  const getFaceInfo = useCallback(async (file: any) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoad(() => true)
      const { status, data }: returnType = await callFaceInfo(formData)

      if (status === 200 && data.status === success) {
        const serverData: Data = data.data
        const facesInfo = serverData.faceDetails.map(
          (object: any, index: number) => {
            const { left, height, top, width } = object.boundingBox
            return (
              <FaceDiv
                key={index}
                position="absolute"
                left={`${left * 100}%`}
                top={`${top * 100}%`}
                width={`${width * 100}%`}
                height={`${height * 100}%`}
              />
            )
          }
        )
        setFaceDivList(facesInfo)
      }
    } catch (e) {
      alert(e)
    }
  }, [])

  const fileChange = useCallback(
    async (e: any) => {
      setImage(e.target.files[0])
      getFaceInfo(e.target.files[0])
    },
    [setImage, getFaceInfo]
  )

  useEffect(() => {
    if (isLoading) {
      setFaceDivList(undefined)
    } else {
      const { width, height } = imgSizeCheck()
      setChildViewStyle({ width, height })
    }
  }, [isLoading, imgSizeCheck])

  return (
    <div>
      <Parents>
        <Child style={{ ...childViewStyle }}>{faceDivList}</Child>
        <img ref={imgRef} src={imgAssets} onLoad={() => setLoad(() => false)} />
      </Parents>
      <input
        type="file"
        accept="image/png, image/jpeg , image/jpg"
        onChange={fileChange}
      />
    </div>
  )
}

export default App
