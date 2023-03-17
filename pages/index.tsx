import Head from "next/head"
import { useXRStore } from "library/store"
import { Controllers, Hands, XR } from "@react-three/xr"
import { Canvas } from "@react-three/fiber"
import { Box, Environment, OrbitControls, Text } from "@react-three/drei"
import { XRDefaults } from "@/components/XRDefaults"
import { VRARButton } from "@/components/VRARButton"
import { DefaultScene } from "@/components/DefaultScene"
import { HandRays } from "@/components/HandRays"
import Image from "next/image"
import Link from "next/link"

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
      <Link href="https://github.com/rekliner/xr-next-starter" target="_blank">
        <Image
          src="github-mark.svg"
          height={50}
          width={50}
          alt="github repo"
          style={{
            position: "absolute",
            top: 25,
            left: 25,
            zIndex: 2,
            background: "white",
            borderRadius: "25px",
          }}
        />
      </Link>
      <Canvas
        //default non-XR position/rotation:
        camera={{ position: [0, 1.6, 2], rotation: [0, Math.PI / 2, 0] }}
        style={{
          height: "100vh",
          background: xrMode != "AR" ? "#111" : undefined,
        }}
      >
        <XR referenceSpace="local-floor" onSessionEnd={() => setXRMode("OFF")}>
          <XRDefaults
            position={[0, 1.6, 2]}
            rotation={[0, 0, 0]} //XR sessions are panned 180 degrees off by default
          />
          <Controllers />
          <Hands />
          <HandRays />

          <DefaultScene />
        </XR>
      </Canvas>
    </>
  )
}
