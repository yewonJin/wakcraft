import { useQuery } from '@tanstack/react-query'

import { getLatestNoobProHacker } from '@/libs/actions/noobprohacker'
import { getWinnerLineIndex } from '@/services/content'
import { Context } from './HomeCarousel.context'
import { useCarousel } from './HomeCarousel.hooks'

export function HomeCarouselProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data } = useQuery({
    queryKey: ['latestNoobProHacker'],
    queryFn: getLatestNoobProHacker,
  })
  if (!data) throw new Error('최근 눕프로해커 데이터를 가져오지 못했습니다.')
  const carousel = useCarousel(getWinnerLineIndex(data), data.workInfo.length)

  return (
    <Context.Provider value={{ noobprohacker: data, ...carousel }}>
      {children}
    </Context.Provider>
  )
}
