'use client'

import { NoobProHacker } from '@repo/types'

import { HomeCarouselBackground } from './Background'
import { HomeCarouselTitle } from './Title'
import { HomeCarouselNavigator } from './Navigator'
import { HomeCarouselContent } from './Content'

import { useCarousel } from '@/hooks'

type Props = {
  latestNoobProHacker: NoobProHacker
}

// TODO: 나중에 예능 눕프핵, 배치고사도 지원하면 좋을듯
export default function HomeCarousel({ latestNoobProHacker }: Props) {
  const getWinnerLineIndex = (noobprohacker: NoobProHacker) => {
    return noobprohacker.workInfo.findIndex((line) => line.ranking === 1)
  }

  const {
    carouselIndex,
    resetAutoScroll,
    startAutoScroll,
    handleCategoryClick,
  } = useCarousel(
    getWinnerLineIndex(latestNoobProHacker),
    latestNoobProHacker.workInfo.length,
  )

  return (
    <div className="mt-8 md:mt-0 md:h-[100vh]">
      <HomeCarouselBackground latestNoobProHacker={latestNoobProHacker} />
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-5 overflow-x-hidden md:h-[90vh] md:gap-10">
        <HomeCarouselTitle latestNoobProHacker={latestNoobProHacker} />
        <HomeCarouselNavigator
          latestNoobProHacker={latestNoobProHacker}
          carouselIndex={carouselIndex}
          onCategoryClick={handleCategoryClick}
          onMouseOver={resetAutoScroll}
          onMouseOut={startAutoScroll}
        />
        <HomeCarouselContent
          latestNoobProHacker={latestNoobProHacker}
          carouselIndex={carouselIndex}
          onMouseOver={resetAutoScroll}
          onMouseOut={startAutoScroll}
        />
      </div>
    </div>
  )
}
