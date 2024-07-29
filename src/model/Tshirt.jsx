import React, { useEffect, useState } from 'react'
import { useGLTF, Decal, PivotControls } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three'

import modelGltf from '../assets/3d/tshirt.glb'

const Tshirt = ({ props, setIsPivoting, showPivotControls }) => {
  const { nodes, materials } = useGLTF(modelGltf)
  const [logoTex, setLogoTex] = useState(null)
  const [fullTex, setFullTex] = useState(null)
  const [pos, setPos] = useState([0, 0.08, 0])  // Adjust initial position as needed
  const [rot, setRot] = useState([0, 0, 0])
  const [scl, setScl] = useState([0.12, 0.12, 0.12])
  
  // Fixed z-position on the front surface of the T-shirt
  const fixedZPosition = 0.14  // Adjust this value based on your model's geometry

  useEffect(() => {
    const loadTexture = async () => {
      if (props.logo) {
        const texture = await new Promise((resolve) => {
          new TextureLoader().load(props.logo, resolve)
        })
        texture.colorSpace = THREE.SRGBColorSpace
        setLogoTex(texture)
      } else {
        setLogoTex(null)
      }
    }

    loadTexture()
  }, [props.logo])

  useEffect(() => {
    const loadTexture = async () => {
      if (props.full) {
        const texture = await new Promise((resolve) => {
          new TextureLoader().load(props.full, resolve)
        })
        texture.colorSpace = THREE.SRGBColorSpace
        setFullTex(texture)
      } else {
        setFullTex(null)
      }
    }

    loadTexture()
  }, [props.full])

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
  }, [props.color, materials.color.color])

  return (
    <group scale={props.size || (props.isMobile ? 9 : 9)}>
      <mesh
        castShadow
        receiveShadow
        name="tshirt"
        geometry={nodes.tshirt.geometry}
        material={materials.color}
        position={[0, props.isMobile ? 0.1 : 0.1, 0]}
        dispose={null}
      >
        {props.isFull && fullTex && (
          <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
            <meshBasicMaterial map={fullTex} />
          </Decal>
        )}
        {props.isLogo && logoTex && (
          <>
            {props.showPivotControls && (
              <group position={[0, 0, fixedZPosition + 0.01]}>
              <PivotControls
                scale={2}  // Increase scale for better visibility
                depthTest={false}  // Ensure it's not affected by depth
                activeAxes={[true, true, false]}  // Restrict movement to x and y axes
                position={[pos[0], pos[1], fixedZPosition]}  // Position on the surface
                onDragStart={() => setIsPivoting(true)}
                onDragEnd={() => setIsPivoting(false)}
                onDrag={(local) => {
                  const position = new THREE.Vector3()
                  const scale = new THREE.Vector3()
                  const quaternion = new THREE.Quaternion()
                  local.decompose(position, quaternion, scale)
                  const rotation = new THREE.Euler().setFromQuaternion(quaternion)
                  setPos([position.x, position.y, fixedZPosition])  // Ensure z position remains fixed
                  setRot([rotation.x, rotation.y, rotation.z])
                  setScl([0.12 * scale.x, 0.12 * scale.y, 0.12 * scale.z])
                }}
              />
                      </group>

            )}
            <Decal
              position={[pos[0], pos[1], fixedZPosition]}
              rotation={rot}
              scale={scl}
              map={logoTex}
              depthTest={true}
              depthWrite={true}
            />
          </>
        )}
      </mesh>
    </group>
  )
}

export default Tshirt
