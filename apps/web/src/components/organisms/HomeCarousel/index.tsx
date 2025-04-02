'use client'

import Image from 'next/image'
import Link from 'next/link'

import { NoobProHacker } from '@repo/types'
import { cn, renamePngTo1080Webp, renamePngToWebp } from '@repo/utils'
import { useCarousel } from '@/hooks/useCarousel'
import { getHackerWinLine } from '@/services/content'

type Props = {
  latestNoobProHacker: NoobProHacker
}

// TODO: services로 이동
const getWinnerLineIndex = (noobprohacker: NoobProHacker) => {
  return noobprohacker.workInfo.findIndex((line) => line.ranking === 1)
}

// TODO: 나중에 예능 눕프핵, 배치고사도 지원하면 좋을듯
export default function HomeCarousel({ latestNoobProHacker }: Props) {
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
      <div
        className="absolute top-0 left-0 z-[-1] hidden h-full w-full bg-[rgba(0,0,0,0.5)] bg-cover bg-center bg-no-repeat bg-blend-darken md:block"
        style={{
          backgroundImage: `url("${renamePngTo1080Webp(getHackerWinLine(latestNoobProHacker)?.entries[2]?.imageUrl as string)}")`,
        }}
      ></div>
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-5 overflow-x-hidden md:h-[90vh] md:gap-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-text-strong text-3xl font-bold md:text-5xl md:text-neutral-100">
            {`눕프로해커 : ${latestNoobProHacker.contentInfo.title} 편`}
          </h1>
          <h2 className="text-text-subtle text-2xl font-semibold md:text-4xl md:text-neutral-400">
            {latestNoobProHacker.contentInfo.episode + '회'}
          </h2>
        </div>
        <div className="w-full overflow-x-scroll px-4 pb-4 md:w-auto md:overflow-auto md:pb-0 xl:px-0">
          <div className="flex w-max gap-3 md:justify-center md:gap-4">
            {latestNoobProHacker.workInfo.map((line, lineIndex) => (
              <button
                onMouseOver={() => resetAutoScroll()}
                onMouseOut={() => startAutoScroll()}
                onClick={() => handleCategoryClick(lineIndex)}
                key={line.title}
                className={cn(
                  'bg-fill-default border-border-default w-max rounded-lg border-2 px-4 py-2 hover:cursor-pointer md:border-none md:bg-neutral-900/80 md:text-lg md:text-neutral-200',
                  carouselIndex === lineIndex
                    ? 'text-text-default md:text-white'
                    : 'opacity-50 hover:opacity-80',
                )}
              >
                {line.title}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full overflow-hidden px-4 xl:px-0">
          <div
            className="flex gap-8 duration-500"
            style={{
              transform: `translateX(calc(${-carouselIndex} * (100% + 32px)))`,
            }}
          >
            {latestNoobProHacker.workInfo.map((line) => (
              <div
                key={line.title}
                className="flex w-full flex-col justify-center gap-6 md:flex-row md:gap-8"
              >
                {line.entries.map((entry) => (
                  <div
                    key={entry.imageUrl}
                    onMouseOver={() => resetAutoScroll()}
                    onMouseOut={() => startAutoScroll()}
                    className="group relative h-[60vw] max-h-[480px] w-[calc(100vw-32px)] overflow-hidden hover:cursor-pointer md:h-[45vh] md:w-[30vw] [&>img]:duration-[500ms] [&>img]:hover:scale-105"
                  >
                    <Image
                      fill
                      priority
                      style={{ objectFit: 'cover' }}
                      src={renamePngToWebp(entry.imageUrl)}
                      alt="작품 이미지"
                    />
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-2 z-10 flex w-full justify-center text-lg text-[white] group-hover:visible hover:cursor-default md:invisible"
                    >
                      <div className="group-hover:animate-fadeIn flex w-fit gap-4 rounded-2xl bg-[#121212] px-6 py-2">
                        <Link href={`/architect/${entry.architectId[0]}`}>
                          <p className="text-[#aaa] hover:cursor-pointer hover:text-[white]">
                            {entry.architectId[0]}
                          </p>
                        </Link>
                        <p>{entry.tier}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
