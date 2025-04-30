import { Props } from './ArchitectDetail'
import { Context } from './ArchitectDetail.context'
import { useArchitectView } from './ArchitectDetail.hooks'

export function ArchitectDetailProvider({
  children,
  architect,
  defaultView,
}: Props & { children: React.ReactNode }) {
  return (
    <Context.Provider
      value={{ ...useArchitectView(defaultView), architect, defaultView }}
    >
      {children}
    </Context.Provider>
  )
}
