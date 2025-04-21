'use client'

import { createContext, use } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { cn, renamePngTo1080Webp, renamePngToWebp } from '@repo/utils'

import { Button, Tooltip } from '@/components/atoms'
import ErrorFallback from '../ErrorFallback'

import { useCarousel } from '@/hooks'
import { getHackerWinLine, getWinnerLineIndex } from '@/services/content'
import { getLatestNoobProHacker } from '@/libs/actions/noobprohacker'
import { PopulatedNoobProHacker } from '@/types/content'

type HomeCarouselContext = {
  noobprohacker: PopulatedNoobProHacker
  carouselIndex: number
  resetAutoScroll: () => void
  startAutoScroll: () => void
  onCategoryClick: (index: number) => void
}

const Context = createContext<HomeCarouselContext | null>(null)

const useHomeCarouselContext = () => {
  const context = use(Context)
  if (!context) {
    throw new Error('HomeCarouselContext.Provider is missing')
  }
  return context
}

function HomeCarousel() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <HomeCarousel.Provider>
        <HomeCarousel.Background />
        <HomeCarousel.Wrapper>
          <HomeCarousel.Title />
          <HomeCarousel.Navigator />
          <HomeCarousel.Content />
        </HomeCarousel.Wrapper>
      </HomeCarousel.Provider>
    </ErrorBoundary>
  )
}

HomeCarousel.Provider = function Provider({
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
      <div className="mt-8 md:mt-0 md:h-[100vh]">{children}</div>
    </Context.Provider>
  )
}

HomeCarousel.Background = function Background() {
  const { noobprohacker } = useHomeCarouselContext()

  return (
    <div
      className="absolute top-0 left-0 z-[-1] hidden h-full w-full bg-[rgba(0,0,0,0.5)] bg-cover bg-center bg-no-repeat bg-blend-darken md:block"
      style={{
        backgroundImage: `url("${renamePngTo1080Webp(getHackerWinLine(noobprohacker)?.entries[2]?.imageUrl as string)}")`,
      }}
    ></div>
  )
}

HomeCarousel.Wrapper = function Wrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-5 overflow-x-hidden md:h-[90vh] md:gap-10">
      {children}
    </div>
  )
}

HomeCarousel.Title = function Title() {
  const { noobprohacker } = useHomeCarouselContext()

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-text-strong text-3xl font-bold md:text-5xl md:text-neutral-100">
        {`눕프로해커 : ${noobprohacker.contentInfo.title} 편`}
      </h1>
      <h2 className="text-text-subtle text-2xl font-semibold md:text-4xl md:text-neutral-400">
        {noobprohacker.contentInfo.episode + '회'}
      </h2>
    </div>
  )
}

HomeCarousel.Navigator = function Navigator() {
  const {
    noobprohacker,
    carouselIndex,
    onCategoryClick,
    resetAutoScroll,
    startAutoScroll,
  } = useHomeCarouselContext()

  return (
    <div className="w-full overflow-x-scroll px-4 pb-4 md:w-auto md:overflow-auto md:pb-0 xl:px-0">
      <div className="flex w-max gap-3 md:w-auto md:flex-wrap md:justify-center md:gap-4">
        {noobprohacker.workInfo.map((line, lineIndex) => (
          <Button
            onMouseOver={resetAutoScroll}
            onMouseOut={startAutoScroll}
            onClick={() => onCategoryClick(lineIndex)}
            key={line.title}
            className={cn(
              'border-border-default border-2 md:border-none md:bg-neutral-900/80 md:text-lg md:text-neutral-200',
              carouselIndex === lineIndex
                ? 'text-text-default md:text-white'
                : 'opacity-50 hover:opacity-80',
            )}
          >
            {line.title}
          </Button>
        ))}
      </div>
    </div>
  )
}

HomeCarousel.Content = function Content() {
  const { noobprohacker, carouselIndex, resetAutoScroll, startAutoScroll } =
    useHomeCarouselContext()

  return (
    <div className="w-full overflow-hidden px-4 xl:px-0">
      <div
        className="flex gap-8 duration-500"
        style={{
          transform: `translateX(calc(${-carouselIndex} * (100% + 32px)))`,
        }}
      >
        {noobprohacker.workInfo.map((line) => (
          <div
            key={line.title}
            className="flex w-full flex-col justify-center gap-6 md:flex-row md:gap-8"
          >
            {line.entries.map((entry) => (
              <div
                key={entry.imageUrl}
                onMouseOver={resetAutoScroll}
                onMouseOut={startAutoScroll}
                className="group relative h-[60vw] max-h-[480px] w-[calc(100vw-32px)] overflow-hidden hover:cursor-pointer md:h-[45vh] md:w-[30vw] [&>img]:duration-[500ms] [&>img]:hover:scale-105"
              >
                <Image
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                  src={renamePngToWebp(entry.imageUrl)}
                  alt="작품 이미지"
                />
                <Tooltip
                  onClick={(e) => e.preventDefault()}
                  position="bottom"
                  className="md:group-hover:animate-fadeIn visible flex w-max gap-4 rounded-2xl px-6 py-2 hover:cursor-auto md:invisible md:group-hover:visible"
                >
                  <Link href={`/architect/${entry.architectId[0].wakzooId}`}>
                    <p className="text-[#aaa] hover:cursor-pointer hover:text-[white]">
                      {entry.architectId[0].wakzooId}
                    </p>
                  </Link>
                  <p>{entry.tier}</p>
                </Tooltip>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeCarousel
