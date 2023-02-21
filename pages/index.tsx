import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "@/styles/Home.module.css"
import { useDummyStore } from "library/store"
import { ARButton, VRButton, XR } from "@react-three/xr"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import { Box, OrbitControls } from "@react-three/drei"
import Interaction from "@/components/Interaction"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const dummyText = useDummyStore((state) => state.dummy)
  const [cubeColor, setCubeColor] = useState("#440066")
  const changeColor = () => {
    const colorHex = `#${new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHexString()}`
    setCubeColor(colorHex)
  }

  return (
    <>
      <Head>
        <title>XR App</title>
        <meta name="description" content="XR Boilerplate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ position: "relative", top: "15%" }}>
        <ARButton />
      </div>
      <VRButton />
      <Canvas
        className="xr"
        //camera rotation
        camera={{ position: [0, 2, 0], rotation: [0, Math.PI / 2, 0] }}
        style={{ height: "100vh" }}
      >
        <XR referenceSpace="local-floor">
          <color attach="background" args={["#111"]} />
          <ambientLight intensity={2} />
          <pointLight position={[20, 10, -10]} intensity={2} />
          <primitive object={new THREE.AxesHelper(2)} />
          <primitive object={new THREE.GridHelper(20, 20)} />
          <OrbitControls />
          <Interaction onUp={() => changeColor()}>
            <Box key="companionCube">
              <meshPhongMaterial color={cubeColor} />
            </Box>
          </Interaction>
        </XR>
      </Canvas>
    </>
  )
}
