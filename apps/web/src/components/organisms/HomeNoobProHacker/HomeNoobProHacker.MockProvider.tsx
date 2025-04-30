import { Context } from './HomeNoobProHacker.context'
import {
  mockRecentNoobProHackers,
  mockSweepLines,
} from '@/__mock__/noobprohacker'

export function HomeNoobProHackerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Context.Provider
      value={{
        recentNoobProHackers: mockRecentNoobProHackers,
        sweepLines: mockSweepLines,
      }}
    >
      {children}
    </Context.Provider>
  )
}
