import { useQuery } from '@tanstack/react-query'

import {
  getRecentNoobProHackers,
  getSweepLines,
} from '@/libs/actions/noobprohacker'
import { Context } from './HomeNoobProHacker.context'

export function HomeNoobProHackerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: recentNoobProHackers } = useQuery({
    queryKey: ['recentNoobProHackers'],
    queryFn: () => getRecentNoobProHackers(3),
  })

  const { data: sweepLines } = useQuery({
    queryKey: ['sweepLines'],
    queryFn: getSweepLines,
  })

  if (!recentNoobProHackers || !sweepLines) {
    throw new Error('데이터를 불러오지 못했습니다.')
  }

  return (
    <Context.Provider value={{ recentNoobProHackers, sweepLines }}>
      {children}
    </Context.Provider>
  )
}
