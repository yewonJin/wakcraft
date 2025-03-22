import { create } from 'zustand'

interface ModalState {
  show: boolean
  imageUrls: string[] | null
  handleImageSelect: ((value: string | null) => void) | null
  setHandleImageSelect: (func: (value: string | null) => void) => void
  toggleModal: () => void
  setImageUrls: (imageUrls: string[]) => void
}

export const useModalStore = create<ModalState>()((set) => ({
  show: false,
  imageUrls: null,
  handleImageSelect: null,
  setHandleImageSelect: (func: (value: string | null) => void) =>
    set(() => ({ handleImageSelect: func })),
  toggleModal: () => set((state) => ({ show: !state.show })),
  setImageUrls: (imageUrls: string[]) => set(() => ({ imageUrls: imageUrls })),
}))
