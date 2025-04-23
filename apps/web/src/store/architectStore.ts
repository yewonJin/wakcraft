'use client'

import { create } from 'zustand'
import Cookies from 'js-cookie'
import { Category } from '@repo/types'

interface ArchitectState {
  view: 'grid' | 'single' | null
  category: '전체보기' | Category
  setView: (view: 'grid' | 'single') => void
  setCategory: (category: '전체보기' | Category) => void
  toggleView: () => void
}

export const useArchitectStore = create<ArchitectState>((set) => ({
  view: null,
  category: '전체보기',
  setView: (view: 'grid' | 'single') => set({ view }),
  setCategory: (category: '전체보기' | Category) => set({ category }),
  toggleView: () => {
    set((state) => {
      const newView = state.view === 'single' ? 'grid' : 'single'
      Cookies.set('architect-view', newView, {
        path: '/architect',
        expires: 365,
      })
      return { view: newView }
    })
  },
}))
