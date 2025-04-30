import { createContext, use } from 'react'

import { useArchitectMain, useSearchArchitect } from './ArchitectMain.hooks'

type ArchitectMainContext =
  | (ReturnType<typeof useArchitectMain> &
      ReturnType<typeof useSearchArchitect>)
  | null

export const Context = createContext<ArchitectMainContext>(null)

export const useArchitectMainContext = () => {
  const context = use(Context)
  if (!context) {
    throw new Error('ArchitectMainContext.Provider is missing')
  }
  return context
}
