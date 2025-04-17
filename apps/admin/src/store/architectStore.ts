import { create } from 'zustand'

export type ArchitectIdInfo = {
  _id: string
  minecraftId: string
  wakzooId: string
}

interface ArchitectsState {
  architects: ArchitectIdInfo[]
  setArchitects: (data: ArchitectIdInfo[]) => void
}

export const useArchitectsStore = create<ArchitectsState>((set) => ({
  architects: [],
  setArchitects: (data) => set({ architects: data }),
}))
