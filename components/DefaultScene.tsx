import { useXRStore } from "@/library/store"
import * as THREE from "three"
import Interaction from "@/components/Interaction"
import { useState } from "react"
import { Box, Environment, OrbitControls, Text } from "@react-three/drei"
import { RayGrab } from "@react-three/xr"

export const DefaultScene = () => {
  const xrMode = useXRStore((state) => state.xrMode)
  const [cubeColor, setCubeColor] = useState("#440066")
  const changeColor = () => {
    const colorHex = `#${new THREE.Color(
      Math.random() / 2,
      Math.random() / 2,
      Math.random() / 2
    ).getHexString()}`
    setCubeColor(colorHex)
  }
  return (
    <>
      {xrMode != "AR" ? (
        <Environment
          preset="forest"
          ground={{ height: 5, radius: 40, scale: 20 }}
        />
      ) : null}
      <ambientLight intensity={0.1} />
      <pointLight position={[20, 10, -15]} intensity={2} color="#FAA" />
      <pointLight position={[-20, 10, 5]} intensity={2} color="#AAF" />
      <primitive object={new THREE.AxesHelper(2)} />
      <primitive object={new THREE.GridHelper(20, 20)} />
      <OrbitControls maxPolarAngle={Math.PI / 2 - 0.01} minPolarAngle={0} />
      <Text position={[0, 1.1, 0.51]} scale={0.2} color={cubeColor}>
        XR Mode: {xrMode}
      </Text>

      <RayGrab>
        <Interaction onUp={() => changeColor()}>
          <Box key="companionCube" position={[0, 0.5, 0]}>
            <meshPhongMaterial color={cubeColor} />
          </Box>
          <Text position={[0, 0.9, 0.51]} scale={0.1} color={cubeColor}>
            Click Me, Grab Me
          </Text>
          <Text position={[0, 0.65, 0.51]} scale={0.1} color={cubeColor}>
            Color:
          </Text>
          <Text position={[0, 0.5, 0.51]} scale={0.2} color={cubeColor}>
            {cubeColor}
          </Text>
          <group position={[0, 0.3, 0.51]} scale={0.05}>
            <Text color={cubeColor}>Eventually delete me</Text>
            <Text position={[0, -1, 0]} color={cubeColor}>
              like all the other default cubes
            </Text>
          </group>
        </Interaction>
      </RayGrab>
    </>
  )
}
