'use client'

import Image from 'next/image'
import { ChevronLeft, Link2 } from 'lucide-react'
import Link from 'next/link'
import { LineInfo, NoobProHacker } from '@repo/types'
import { cn, renamePngToWebp } from '@repo/utils'

import { getHackerWinLine, getProWinLine } from '@/services/content'
import { useState } from 'react'

type Props = {
  recentNoobProHackers: NoobProHacker[]
  sweepLines: LineInfo[]
}

export default function HomeNoobProHacker({
  recentNoobProHackers,
  sweepLines,
}: Props) {
  return (
    <div className="px-4 pt-12 md:pt-24 xl:px-0">
      <h2 className="text-text-strong mb-8 text-3xl font-bold md:text-4xl">
        눕프로해커
      </h2>
      <p className="text-text-subtle mb-2 md:text-lg">
        유튜버 우왁굳의 마인크래프트 치즐 모드 컨텐츠이다.
      </p>
      <p className="text-text-subtle md:text-lg">
        눕, 프로, 해커가 한 라인이 되어 주제를 선정해 작품을 건축하면 우왁굳이
        감상하고 평가한다.
      </p>
      <HomeRecentWinEntries recentNoobProHackers={recentNoobProHackers} />
      <HomeSweepLine sweepLines={sweepLines} />
    </div>
  )
}

type HomeRecentWinEntriesProps = {
  recentNoobProHackers: NoobProHacker[]
}

function HomeRecentWinEntries({
  recentNoobProHackers,
}: HomeRecentWinEntriesProps) {
  return (
    <div className="mt-16">
      <h3 className="text-xl font-semibold md:text-3xl">최근 우승 작품</h3>
      <div className="relative mt-6 flex flex-wrap gap-5 gap-y-8 md:[&>div:nth-child(2)]:flex-row-reverse">
        {recentNoobProHackers.map((noobprohacker) => {
          const hackerWinTitle = getHackerWinLine(noobprohacker)?.title
          const proWinTitle = getHackerWinLine(noobprohacker)?.title
          const hackerEntry = getHackerWinLine(noobprohacker)?.entries[2]
          const proEntry = getProWinLine(noobprohacker)?.entries[1]

          return (
            <div
              key={noobprohacker.contentInfo.episode}
              className="flex w-full flex-col gap-5 md:flex-row"
            >
              <div className="relative aspect-video w-full rounded-3xl hover:cursor-pointer md:w-3/5 [&>img]:rounded-3xl">
                <Image
                  alt="해커 우승 작품"
                  fill
                  src={renamePngToWebp(hackerEntry?.imageUrl || '')}
                />
                <div className="absolute bottom-4 left-[50%] z-10 flex w-max translate-x-[-50%] items-center gap-4 rounded-lg bg-[rgba(0,0,0,0.7)] px-4 py-2 text-[white] hover:cursor-auto">
                  {hackerEntry?.youtubeUrl && (
                    <Link2
                      onClick={() =>
                        window.open(hackerEntry.youtubeUrl || '', '_blank')
                      }
                      className="text-neutral-400 hover:cursor-pointer hover:text-neutral-300"
                    />
                  )}
                  <span>
                    {noobprohacker.contentInfo.episode}회 : {hackerWinTitle}
                  </span>
                  <Link
                    href={`/architect/${hackerEntry?.architectId}`}
                    className="text-neutral-400 hover:text-neutral-300"
                  >
                    {hackerEntry?.architectId}
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video w-full rounded-3xl hover:cursor-pointer md:w-2/5 [&>img]:rounded-3xl">
                <Image
                  alt="프로 우승 작품"
                  fill
                  style={{ objectFit: 'cover' }}
                  src={renamePngToWebp(
                    getProWinLine(noobprohacker)?.entries[1].imageUrl || '',
                  )}
                />
                <div className="absolute bottom-4 left-[50%] z-10 flex w-max translate-x-[-50%] items-center gap-4 rounded-lg bg-[rgba(0,0,0,0.7)] px-4 py-2 text-[white] hover:cursor-auto">
                  {proEntry?.youtubeUrl && (
                    <Link2
                      onClick={() =>
                        window.open(proEntry.youtubeUrl || '', '_blank')
                      }
                      className="text-neutral-400 hover:cursor-pointer hover:text-neutral-300"
                    />
                  )}
                  <span>
                    {noobprohacker.contentInfo.episode}회 : {proWinTitle}
                  </span>
                  <Link
                    href={`/architect/${proEntry?.architectId}`}
                    className="text-neutral-400 hover:text-neutral-300"
                  >
                    {proEntry?.architectId}
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type HomeSweepLineProps = {
  sweepLines: LineInfo[]
}

function HomeSweepLine({ sweepLines }: HomeSweepLineProps) {
  const [page, setPage] = useState(0)

  const moveToNextPage = () => {
    setPage((prev) => (prev === sweepLines.length ? prev : prev + 1))
  }

  const moveToPrevPage = () => {
    setPage((prev) => (prev === 0 ? prev : prev - 1))
  }

  return (
    <div className="relative mt-32">
      <div className="mb-8 flex items-end gap-3">
        <h3 className="text-2xl font-semibold md:text-3xl">싹쓸이 라인</h3>
        <p className="text-text-subtle text-sm md:text-base">
          (프로 1등, 해커 1등, 라인 1등)
        </p>
      </div>
      <div className="flex flex-col">
        <div className="mb-4 flex gap-2">
          <span className="text-text-subtle text-lg">
            {`${
              sweepLines[page].entries[0].imageUrl
                .split('/')
                .at(-2)
                ?.split('/')[0]
            }회`}
            :
          </span>
          <span className="text-xl font-medium">{sweepLines[page].title}</span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {sweepLines[page].entries.map((entry) => (
            <div
              key={entry.imageUrl}
              className="group relative aspect-video md:aspect-3/4"
            >
              <Image
                className="rounded-xl"
                fill
                src={renamePngToWebp(entry.imageUrl)}
                alt="작품 이미지"
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute bottom-2 z-10 flex w-full justify-center text-lg text-[white] group-hover:visible hover:cursor-default md:invisible">
                <div className="group-hover:animate-fadeIn flex w-fit gap-4 rounded-2xl bg-[#121212] px-6 py-2">
                  <a
                    href={`/architect/${entry.architectId}`}
                    className="text-text-subtle hover:text-text-default"
                  >
                    {entry.architectId}
                  </a>
                  <p>{entry.tier}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-12 right-0 flex md:top-0 md:gap-8">
        <ChevronLeft
          onClick={moveToPrevPage}
          className={cn(
            'hover:bg-fill-default h-10 w-10 rounded-full p-1.5 hover:cursor-pointer md:h-13 md:w-13',
            page === 0 && 'invisible',
          )}
        />
        <ChevronLeft
          onClick={moveToNextPage}
          className={cn(
            'hover:bg-fill-default h-10 w-10 rotate-180 rounded-full p-1.5 hover:cursor-pointer md:h-13 md:w-13',
            page === sweepLines.length - 1 && 'invisible',
          )}
        />
      </div>
    </div>
  )
}
