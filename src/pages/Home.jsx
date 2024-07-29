import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'

import { Model } from '../model'
import { Tab1, Tab2, Tab3, Header } from '../containers'
import { reader, doGsap } from '../helper'

const Home = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [color, setColor] = useState({ r: 19, g: 97, b: 189 })
  const [isLogo, setIsLogo] = useState(true)
  const [isFull, setIsFull] = useState(false)
  const [logoS, setLogoS] = useState(0)
  const [logoP, setLogoP] = useState(2)
  const [logo, setLogo] = useState("./printerpix.png")
  const [full, setFull] = useState()
  const [file, setFile] = useState(null)
  const [img, setImg] = useState(null)
  const [showPivotControls, setShowPivotControls] = useState(false) // State to toggle PivotControls visibility

  // const imageOptions = [
  //   "./Dad Filter 1.svg",
  //   "./Dad Filter 2.svg",
  //   "./Dad Filter 3.svg",
  //   "./Dad Filter 4.svg"
  // ]

  const imageOptions = [
    {
      name: "Dad joke",
      src: "./Dad Filter 1.svg"
    },
    {
      name: "Super Dad",
      src: "./Dad Filter 2.svg"
    },
    {
      name: "Awesome Dad",
      src: "./Dad Filter 3.svg"
    },
    {
      name: "Best Dad",
      src: "./Dad Filter 4.svg"
    }
  ]

  const handleTogglePivotControls = () => {
    setShowPivotControls(prev => !prev)
  }

  const tref = useRef()

  useEffect(() => {
    if (file) {
      reader(file).then((result) => {
          setImg(result)
        }
      )
      
    }
  }, [file])

  const handleLogo = () => {
    setIsLogo(!isLogo)
  }
  const handleFull = () => {
    setIsFull(!isFull)
  }

  const handleLogoP = (ind) => {
    setLogoP(ind)
  }
  const handleLogoS = (ind) => {
    setLogoS(ind)
  }

  const changeColor = (rgb) => {
    setColor({ r: rgb.r, g: rgb.g, b: rgb.b })
  }

  useEffect(() => {
    if (window.innerWidth < 768) setIsMobile(true)
  }, [])

  // useGSAP(() => {
  //   doGsap(tref)
  // })

  const checkScreen = () => {
    if (window.innerWidth < 768) setIsMobile(true)
    else setIsMobile(false)
  }

  const handleImageSelect = (image) => {
    setLogo(image)
  }

  window.addEventListener('resize', checkScreen)

  return (
    <>
      <main className="h-screen overflow-hidden bg-center bg-[#d2d2d2]">
        <section ref={tref} className="h-[65%] relative">
          <Model
            props={{ isMobile, color, logo, isLogo, full, isFull, logoP, logoS, showPivotControls }}
          />
        {/* <Header props={{ color }} /> */}
        {/* <Tab1 props={{ color, handleLogo, handleFull, isLogo, isFull }} /> */}
        <Tab2
          props={{ changeColor, color, setFile, file, img, setLogo, setFull, handleTogglePivotControls, showPivotControls, color, handleLogo, handleFull, isLogo, isFull }}
        />
        {/* <Tab3 props={{ color, logoS, logoP, handleLogoP, handleLogoS }} /> */}
          <div className='absolute -bottom-[35px] bg-[#d2d2d2] blur-[26px] h-[75px] w-full z-[1]'></div>
        </section>
        <section className='z-[2] relative h-[35%] bg-white flex flex-col w-full' >
          <div className='h-1/2  flex overflow-x-scroll p-4 gap-4'>
            {imageOptions.map((image) => {
              return(
                <div className='flex min-w-[100px] max-w-[100px] flex-col items-center justify-center' onClick={() => handleImageSelect(image.src)}>
                  <img src={image.src} className='w-full min-h-[100px] max-h-[100px] bg-[#d2d2d2] rounded'></img>
                  <p className='text-sm'>{image.name}</p>
                </div>
              )
            })}
          </div>
          <div className='flex flex-col px-4 py-2 h-1/2 justify-evenly'>
            <h1 className='font-bold text-lg'>Custom T-Shirt</h1>
            <div className='flex gap-4'>
              <p className='line-through text-sm'>$31.99</p>
              <p className='font-bold'>$21.99</p>
            </div>
            <button className='w-full p-4 bg-[#f02480] text-white rounded'>Continue to Checkout</button>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
