import { useXRStore } from "@/library/store"
import { XRButton } from "@react-three/xr"
import { useState } from "react"

export const VRARButton = (props: { arFeatures?: string[] }) => {
  const {
    arFeatures = ["local-floor", "bounded-floor", "hand-tracking", "layers"],
  } = props
  const [sessionType, setSessionType] = useState("VR" as "VR" | "AR")
  const setXRMode = useXRStore((state) => state.setXRMode)
  const xrMode = useXRStore((state) => state.xrMode)

  return (
    <>
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "space-evenly",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0, 0, 0, 0.1)",
          color: "white",
          font: "normal 0.8125rem sans-serif",
          outline: "none",
          zIndex: 99999,
          cursor: "pointer",
          minWidth: "100px",
        }}
      >
        <div
          onClick={() => setSessionType("VR")}
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            key="vr"
            type="radio"
            checked={sessionType === "VR"}
            onChange={() => setSessionType("VR")}
          />
          VR
        </div>
        <div
          onClick={() => setSessionType("AR")}
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            key="ar"
            type="radio"
            checked={sessionType === "AR"}
            onChange={() => setSessionType("AR")}
          />
          AR
        </div>
      </div>
      <XRButton
        style={{
          position: "absolute",
          bottom: "54px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 24px",
          border: "1px solid white",
          borderRadius: "4px",
          background: "rgba(0, 0, 0, 0.1)",
          color: "white",
          font: "normal 0.8125rem sans-serif",
          outline: "none",
          zIndex: 99999,
          cursor: "pointer",
          minWidth: "100px",
        }}
        mode={sessionType}
        sessionInit={
          sessionType === "AR"
            ? {
                optionalFeatures: arFeatures,
              }
            : {}
        }
        onClick={async () => {
          if (xrMode !== "OFF") {
            setXRMode("OFF")
          } else {
            if (
              navigator.xr &&
              (await navigator.xr.isSessionSupported(
                sessionType === "VR" ? "immersive-vr" : "immersive-ar"
              ))
            ) {
              setXRMode(sessionType)
            }
          }
        }}
        onError={() => setXRMode("OFF")}
      />
    </>
  )
}
