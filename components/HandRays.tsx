import { Line } from "@react-three/drei"
import { Line2 } from "three-stdlib"
import { useXR } from "@react-three/xr"
import { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

export const HandRays = () => {
  const rayDistance = 3
  const { isHandTracking, controllers } = useXR()
  const rays = useRef([] as RayType[])
  const xyz = (vec: THREE.Vector3) =>
    Object.values(vec) as [number, number, number]

  interface RayType {
    uuid: string
    ref: Line2 | null
  }
  useFrame(() => {
    controllers.forEach((controller) => {
      let ray = rays.current.find((r) => r.uuid === controller.uuid)

      if (!ray) {
        ray = new Object({
          uuid: controller.uuid,
          ref: null,
        }) as RayType
        rays.current = [...rays.current, ray]
      }

      if (ray.ref) {
        ray.ref.position.set(
          ...xyz(controller.controller.getWorldPosition(new THREE.Vector3()))
        )
        ray.ref.rotation.setFromQuaternion(
          controller.controller
            .getWorldQuaternion(new THREE.Quaternion())
            .multiply(new THREE.Quaternion(0, 1, 0, 0)) //  .getWorldDirection(new THREE.Vector3())
        )
      }
    })
  })

  return (
    <group key="handRays">
      {isHandTracking
        ? rays.current.map((ray) => (
            <Line
              ref={(el: Line2) => {
                ray.ref = el
              }}
              color="yellow"
              dashed={false}
              lineWidth={0.5}
              key={ray.uuid}
              points={[
                [0, 0, 0],
                [0, 0, rayDistance],
              ]}
            />
          ))
        : null}
    </group>
  )
}
