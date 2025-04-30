import { useArchitectMain, useSearchArchitect } from './ArchitectMain.hooks'
import { Context } from './ArchitectMain.context'

export function ArchitectMainProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Context.Provider
      value={{ ...useArchitectMain(), ...useSearchArchitect() }}
    >
      {children}
    </Context.Provider>
  )
}
