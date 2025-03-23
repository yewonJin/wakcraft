import { create } from 'zustand'

export type ArchitectInfo = {
  _id: string
  minecraftId: string
  wakzooId: string
}

interface ArchitectsState {
  architects: ArchitectInfo[]
  setArchitects: (data: ArchitectInfo[]) => void
}

export const useArchitectsStore = create<ArchitectsState>((set) => ({
  architects: [],
  setArchitects: (data) => set({ architects: data }),
}))
