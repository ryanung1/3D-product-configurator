import React, { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Tshirt from './Tshirt'
import Loader from '../containers/Loader'

const Model = ({ props }) => {
  const orbitRef = useRef()
  const [isPivoting, setIsPivoting] = useState(false)
  // const [showPivotControls, setShowPivotControls] = useState(true) // State to toggle PivotControls visibility

  // const handleTogglePivotControls = () => {
  //   setShowPivotControls(prev => !prev)
  // }

  return (
    <>
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 25,
          position: [0, 5, 20],
        }}
      >
        <Suspense fallback={<Loader />}>
          <hemisphereLight groundColor={'#111'} intensity={0.01} />
          <Tshirt props={props} setIsPivoting={setIsPivoting} />
          <OrbitControls
            ref={orbitRef}
            enabled={!props.showPivotControls}
            target={[0, props.isMobile ? 0.8 : 0.4, 0]}
            maxDistance={30}
            minDistance={8}
            maxPolarAngle={Math.PI / 1.94}
            minPolarAngle={Math.PI / 4}
            enablePan={false}
          />
        </Suspense>
      </Canvas>

    </>
  )
}

export default Model
