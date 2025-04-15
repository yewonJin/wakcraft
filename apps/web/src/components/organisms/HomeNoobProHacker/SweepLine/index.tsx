import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { LineInfo } from '@repo/types'
import { cn, renamePngToWebp } from '@repo/utils'

import { Tooltip } from '@/components/atoms'

type HomeSweepLineProps = {
  sweepLines: LineInfo[]
}

export function HomeSweepLine({ sweepLines }: HomeSweepLineProps) {
  const [page, setPage] = useState(0)

  const moveToNextPage = () => {
    setPage((prev) => (prev === sweepLines.length ? prev : prev + 1))
  }

  const moveToPrevPage = () => {
    setPage((prev) => (prev === 0 ? prev : prev - 1))
  }

  return (
    <div className="relative mt-32">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end">
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
              <Tooltip
                position="bottom"
                className="md:group-hover:animate-fadeIn visible flex w-max gap-4 rounded-2xl bg-[#121212] px-6 py-2 md:invisible md:group-hover:visible"
              >
                <Link
                  href={`/architect/${entry.architectId[0].wakzooId}`}
                  className="text-text-subtle hover:text-text-default"
                >
                  {entry.architectId[0].wakzooId}
                </Link>
                <p>{entry.tier}</p>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-[90px] right-0 flex sm:top-0 md:gap-8">
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
