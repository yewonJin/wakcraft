import { create } from 'zustand'

interface ModalState {
  show: boolean
  toggleModal: () => void
  handleImageSelect: ((value: string | null) => void) | null
  setHandleImageSelect: (func: (value: string | null) => void) => void
}

export const useModalStore = create<ModalState>()((set) => ({
  show: false,
  toggleModal: () => set((state) => ({ show: !state.show })),
  handleImageSelect: null,
  setHandleImageSelect: (func: (value: string | null) => void) =>
    set(() => ({ handleImageSelect: func })),
}))
