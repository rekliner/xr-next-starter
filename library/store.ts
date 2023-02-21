import { create } from "zustand"

export interface storeState {
  dummy: String
}

export const useDummyStore = create<storeState>((set) => ({
  dummy: "Hello World!",
  setDummy: (text: String) => set({ dummy: text }),
}))
