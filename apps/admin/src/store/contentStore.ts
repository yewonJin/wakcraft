import { create } from 'zustand'

import { AWSDirectory } from '@/lib/aws'

interface ContentState {
  imageUrls: string[] | null
  category: AWSDirectory | null
  episode: number | null
  setImageUrls: (imageUrls: string[]) => void
  setCategory: (category: AWSDirectory) => void
  setEpisode: (episode: number) => void
}

export const useContentStore = create<ContentState>()((set) => ({
  imageUrls: null,
  category: null,
  episode: null,
  setImageUrls: (imageUrls: string[]) => set(() => ({ imageUrls })),
  setCategory: (category: AWSDirectory) => set(() => ({ category })),
  setEpisode: (episode: number) => set(() => ({ episode })),
}))
