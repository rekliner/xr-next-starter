import { create } from "zustand"

export interface storeState {
  xrMode: "OFF" | "VR" | "AR"
  setXRMode: (mode: "OFF" | "VR" | "AR") => void
}

export const useXRStore = create<storeState>((set) => ({
  xrMode: "OFF",
  setXRMode: (mode) => set({ xrMode: mode }),
}))
