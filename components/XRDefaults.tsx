import { useFrame } from "@react-three/fiber"
import { useXR } from "@react-three/xr"
import { useRef } from "react"
import * as THREE from "three"
import { useXRStore } from "library/store"

//sets default position when an XR session starts
//takes into account initial headset/phone position
export const XRDefaults = (props: {
  position?: number[]
  rotation?: number[]
}) => {
  const { position = [0, 1.6, 2], rotation = [0, 0, 0] } = props
  const wasPresenting = useRef(false)
  const xrMode = useXRStore((state) => state.xrMode)
  const setXRMode = useXRStore((state) => state.setXRMode)
  const { player, isPresenting, session } = useXR()
  useFrame(({ gl }, _, frame) => {
    if (isPresenting) {
      if (!wasPresenting.current) {
        const pose = frame?.getViewerPose(
          gl.xr.getReferenceSpace() as XRReferenceSpace
        )
        //an AR session might not have a pose
        const posePosition = new THREE.Vector3(
          ...["x", "y", "z"].map(
            (a) =>
              (pose?.transform.position[
                a as keyof DOMPointReadOnly
              ] as number) ?? 0
          )
        )
        const poseRotation = new THREE.Euler().setFromQuaternion(
          new THREE.Quaternion(
            ...["x", "y", "z", "w"].map(
              (a) =>
                (pose?.transform.orientation[
                  a as keyof DOMPointReadOnly
                ] as number) ?? 0
            )
          )
        )

        player.position.set(
          position[0] - posePosition.x,
          position[1] - posePosition.y, //this might override player height
          position[2] - posePosition.z
        )
        player.rotation.set(
          //absolute rotation ends up messing with head tilt.  Limiting to pan only
          rotation[0], // - poseRotation.x,
          rotation[1] - poseRotation.y,
          rotation[2] // - poseRotation.z
        )
        wasPresenting.current = true
      }
    } else {
      if (wasPresenting.current) {
        wasPresenting.current = false
        if (xrMode !== "OFF") {
          setXRMode("OFF") //a hack since on some phones onSessionEnd doesn't get triggered
        }
      }
    }
  })
  return null
}
