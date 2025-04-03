import { useEffect } from 'react'
import { Category } from '@repo/types'

import { useArchitectStore } from '@/store/architectStore'

export const useArchitectDetail = (defaultView: 'single' | 'grid') => {
  const { view, category, toggleView, setView, setCategory } =
    useArchitectStore()

  const currentView = view || defaultView

  const handleCategoryClick = (category: '전체보기' | Category) => {
    setCategory(category)
  }

  useEffect(() => {
    if (!view) {
      setView(defaultView)
    }
  }, [])

  return { currentView, category, toggleView, handleCategoryClick }
}
