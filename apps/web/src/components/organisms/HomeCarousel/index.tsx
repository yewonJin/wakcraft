'use client'

import { useQuery } from '@tanstack/react-query'

import { HomeCarouselBackground } from './Background'
import { HomeCarouselTitle } from './Title'
import { HomeCarouselNavigator } from './Navigator'
import { HomeCarouselContent } from './Content'

import { useCarousel } from '@/hooks'
import { getWinnerLineIndex } from '@/services/content'
import { getLatestNoobProHacker } from '@/libs/actions/noobprohacker'

// TODO: 나중에 예능 눕프핵, 배치고사도 지원하면 좋을듯
export default function HomeCarousel() {
  const { data } = useQuery({
    queryKey: ['latestNoobProHacker'],
    queryFn: getLatestNoobProHacker,
  })

  const {
    carouselIndex,
    resetAutoScroll,
    startAutoScroll,
    handleCategoryClick,
  } = useCarousel(getWinnerLineIndex(data!), data!.workInfo.length)

  if (!data) return null

  return (
    <div className="mt-8 md:mt-0 md:h-[100vh]">
      <HomeCarouselBackground latestNoobProHacker={data} />
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-5 overflow-x-hidden md:h-[90vh] md:gap-10">
        <HomeCarouselTitle latestNoobProHacker={data} />
        <HomeCarouselNavigator
          latestNoobProHacker={data}
          carouselIndex={carouselIndex}
          onCategoryClick={handleCategoryClick}
          onMouseOver={resetAutoScroll}
          onMouseOut={startAutoScroll}
        />
        <HomeCarouselContent
          latestNoobProHacker={data}
          carouselIndex={carouselIndex}
          onMouseOver={resetAutoScroll}
          onMouseOut={startAutoScroll}
        />
      </div>
    </div>
  )
}
