import { getWinnerLineIndex } from '@/services/content'
import { Context } from './HomeCarousel.context'
import { useCarousel } from './HomeCarousel.hooks'
import { mockNoobprohacker } from '@/__mock__/noobprohacker'

export function HomeCarouselProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const carousel = useCarousel(
    getWinnerLineIndex(mockNoobprohacker),
    mockNoobprohacker.workInfo.length,
  )

  return (
    <Context.Provider value={{ noobprohacker: mockNoobprohacker, ...carousel }}>
      {children}
    </Context.Provider>
  )
}
