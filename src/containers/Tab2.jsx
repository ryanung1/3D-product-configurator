import React, { useState } from 'react'
import { logo, full, save, move } from '../assets/icons'


import { colors, file, bot } from '../assets/icons'
import { Button, ColorPicker, FilePicker, AiPicker, Button2 } from '../components'
import { close } from '../assets/icons'
import { canvasDownloader } from '../helper'

const Tab2 = ({ props }) => {
  const [tab, setTab] = useState(0)

  const handleClick = (ind) => {
    switch (ind) {
      case 1:
        props.handleLogo()
        break
      case 2:
        props.handleFull()
        break
      case 3:
        canvasDownloader()
        break
    }
  }

  const changeTab = (ind) => {
    if (tab === ind) setTab(0)
    else setTab(ind)
  }

  return (
    <>
      <section
        style={{
          // borderColor: `rgb(${props.color.r}, ${props.color.g}, ${props.color.b})`,
        }}
        className="absolute select-none bg-[#000]/20 rounded-full flex flex-col items-center justify-around z-1 md:top-[50%] top-[50%] left-[15px] translate-y-[-50%] md:w-[70px] md:h-[220px] w-[45px] h-[230px]"
      >
        <Button
          props={{
            img: colors,
            active: tab === 1 ? true : false,
            color: props.color,
            ind: 1,
          }}
          funcs={{ changeTab }}
        />
        <Button
          props={{
            img: file,
            active: tab === 2 ? true : false,
            color: props.color,
            ind: 2,
          }}
          funcs={{ changeTab }}
        />
        {/* <Button
          props={{
            img: bot,
            active: tab === 3 ? true : false,
            color: props.color,
            ind: 3,
          }}
          funcs={{ changeTab }}
        /> */}
              <Button2
        props={{ img: logo, active: props.isLogo, color: props.color, ind: 1 }}
        funcs={{ handleClick }}
      />
                    <Button2
        props={{ img: full, active: props.isFull, color: props.color, ind: 2 }}
        funcs={{ handleClick }}
      />
            <Button2
        props={{ img: save, active: false, color: props.color, ind: 3 }}
        funcs={{ handleClick }}
      />
      <button
      className='w-[30px] h-[30px] rounded-full flex items-center justify-center'
        onClick={props.handleTogglePivotControls} 
        style={{
          backgroundColor: props.showPivotControls
          ? `rgb(${props.color.r}, ${props.color.g}, ${props.color.b})`
          : '',
        }}
      >
              <img
        className="md:w-[35px] w-[25px]"
        draggable={false}
        src={move}
        alt="icon"
      />
        
        {/* {props.showPivotControls ? 'Hide Pivot Controls' : 'Show Pivot Controls'} */}
      </button>
      </section>
      {tab != 0 && (
        <section className="w-[220px] h-[330px] absolute bg-[#111] rounded md:top-[50%] top-[40%] left-[90px] translate-y-[-50%] ">
          <div className="flex justify-end">
            <button
              type="button"
              className="w-[30px] h-[30px] p-[6px]"
              onClick={() => changeTab(0)}
            >
              <img src={close} alt="close" className="select-none" />
            </button>
          </div>
          {tab === 1 && <ColorPicker props={props} />}
          {tab === 2 && <FilePicker props={props} />}
          {tab === 3 && <AiPicker />}
        </section>
      )}
    </>
  )
}

export default Tab2
