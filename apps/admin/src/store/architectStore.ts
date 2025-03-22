import { create } from 'zustand'

export type ArchitectInfo = {
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
