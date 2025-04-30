import { createContext, use } from 'react'

import { Props } from './ContentLine'
import { useContentLine } from './ContentLine.hooks'

type ContentLineContext = (ReturnType<typeof useContentLine> & Props) | null

export const Context = createContext<ContentLineContext>(null)

export const useContentLineContext = () => {
  const context = use(Context)
  if (!context) {
    throw new Error('ContentLineContext.Provider is missing')
  }
  return context
}
