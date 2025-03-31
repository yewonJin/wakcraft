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
    <div className="md:h-[100vh]">
      <div
        className="absolute top-0 left-0 z-[-1] h-full w-full bg-[rgba(0,0,0,0.5)] bg-cover bg-center bg-no-repeat bg-blend-darken"
        style={{
          backgroundImage: `url("${renamePngTo1080Webp(getHackerWinLine(latestNoobProHacker)?.entries[2]?.imageUrl as string)}")`,
        }}
      ></div>
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-10 md:h-[90vh]">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold text-neutral-100">
            {`눕프로해커 : ${latestNoobProHacker.contentInfo.title} 편`}
          </h1>
          <h2 className="text-4xl font-semibold text-neutral-400">
            {latestNoobProHacker.contentInfo.episode + '회'}
          </h2>
        </div>
        <div className="flex justify-center gap-4">
          {latestNoobProHacker.workInfo.map((line, lineIndex) => (
            <button
              onMouseOver={() => resetAutoScroll()}
              onMouseOut={() => startAutoScroll()}
              onClick={() => handleCategoryClick(lineIndex)}
              key={line.title}
              className={cn(
                'rounded-lg bg-neutral-900/80 px-4 py-2 text-lg text-neutral-200 hover:cursor-pointer',
                carouselIndex === lineIndex
                  ? 'text-white'
                  : 'opacity-50 hover:opacity-80',
              )}
            >
              {line.title}
            </button>
          ))}
        </div>
        <div className="w-full overflow-hidden">
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
                      className="invisible absolute bottom-2 z-10 flex w-full justify-center text-lg text-[white] group-hover:visible hover:cursor-default"
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
