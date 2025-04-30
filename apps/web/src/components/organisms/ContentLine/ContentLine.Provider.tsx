import { Props } from './ContentLine'
import { Context } from './ContentLine.context'
import { useContentLine } from './ContentLine.hooks'

export function ContentLineProvider({
  isMobile,
  content,
  children,
}: Props & { children: React.ReactNode }) {
  return (
    <Context.Provider value={{ ...useContentLine(content), content, isMobile }}>
      {children}
    </Context.Provider>
  )
}
