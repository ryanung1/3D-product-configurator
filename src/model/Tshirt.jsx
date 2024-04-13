import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

import modelGltf from '../assets/3d/tshirt.glb'
// import modelGltf from '../assets/3d/shirt_baked.glb'

const Tshirt = ({ props }) => {
  const { nodes, materials } = useGLTF(modelGltf)

  useEffect(() => {
    if (props.color.r < 5 && props.color.g < 5 && props.color.b < 5) {
      materials.color.color.r = 5
      materials.color.color.g = 5
      materials.color.color.b = 5
    } else {
      materials.color.color.r = props.color.r
      materials.color.color.g = props.color.g
      materials.color.color.b = props.color.b
    }
  }, [props.color])

  return (
    <group scale={props.isMobile ? 6 : 9} dispose={null}>
      {/* <mesh
        castShadow
        receiveShadow
        name='tshirt'
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      /> */}
      <mesh
        castShadow
        receiveShadow
        name="tshirt"
        geometry={nodes.tshirt.geometry}
        material={materials.color}
        position={[0, props.isMobile ? 0.3 : 0.1, 0]}
      />
    </group>
  )
}

export default Tshirt
