import Head from "next/head"
import { useXRStore } from "library/store"
import { XR } from "@react-three/xr"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import { Box, Environment, OrbitControls, Text } from "@react-three/drei"
import Interaction from "@/components/Interaction"
import { useState } from "react"
import { XRDefaults } from "@/components/XRDefaults"
import { VRARButton } from "@/components/VRARButton"

export default function Home() {
  const xrMode = useXRStore((state) => state.xrMode)
  const setXRMode = useXRStore((state) => state.setXRMode)
  return (
    <>
      <Head>
        <title>XR App</title>
        <meta name="description" content="XR Boilerplate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VRARButton />

      <Canvas
        //default non-XR position/rotation:
        camera={{ position: [0, 1.6, 2], rotation: [0, Math.PI / 2, 0] }}
        style={{
          height: "100vh",
          background: xrMode != "AR" ? "#111" : undefined,
        }}
      >
        {xrMode != "AR" ? (
          <Environment
            preset="forest"
            ground={{ height: 5, radius: 40, scale: 20 }}
          />
        ) : null}
        <XR referenceSpace="local-floor" onSessionEnd={() => setXRMode("OFF")}>
          <XRDefaults
            position={[0, 1.6, 2]}
            rotation={[0, 0, 0]} //XR sessions are panned 180 degrees off by default
          />

          <DefaultScene />
        </XR>
      </Canvas>
    </>
  )
}

const DefaultScene = () => {
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
      <ambientLight intensity={0.1} />
      <pointLight position={[20, 10, -15]} intensity={2} color="#FAA" />
      <pointLight position={[-20, 10, 5]} intensity={2} color="#AAF" />
      <primitive object={new THREE.AxesHelper(2)} />
      <primitive object={new THREE.GridHelper(20, 20)} />
      <OrbitControls maxPolarAngle={Math.PI / 2} />
      <Interaction onUp={() => changeColor()}>
        <Box key="companionCube" position={[0, 0.5, 0]}>
          <meshPhongMaterial color={cubeColor} />
        </Box>
        <Text position={[0, 1.1, 0.51]} scale={0.3} color={cubeColor}>
          XR: {xrMode}
        </Text>
        <Text position={[0, 0.5, 0.51]} scale={0.3} color={cubeColor}>
          {cubeColor}
        </Text>
      </Interaction>
    </>
  )
}
