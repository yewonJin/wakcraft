'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { LineEventNoobProHacker, NoobProHacker } from '@repo/types'
import { cn, renamePngTo1080Webp } from '@repo/utils'

type Props = {
  content: NoobProHacker | LineEventNoobProHacker
}

export default function ContentLine({ content }: Props) {
  const [page, setPage] = useState(new Array(content.workInfo.length).fill(0))

  const handleButtonClick = (lineIndex: number, entryIndex: number) => {
    setPage((prev) => {
      const newPage = [...prev]
      newPage[lineIndex] = entryIndex
      return newPage
    })
  }

  const moveToNextPage = (lineIndex: number, length: number) => {
    setPage((prev) => {
      const newPage = [...prev]

      if (prev[lineIndex] === length - 1) {
        return prev
      }

      newPage[lineIndex]++
      return newPage
    })
  }

  const moveToPrevPage = (lineIndex: number) => {
    setPage((prev) => {
      const newPage = [...prev]

      if (prev[lineIndex] === 0) {
        return prev
      }

      newPage[lineIndex]--
      return newPage
    })
  }

  const getSubTitle = () => {
    if ('type' in content) {
      return `예능 눕프핵 ${content.contentInfo.episode}회 `
    } else {
      return `제 ${content.contentInfo.episode}회`
    }
  }

  const getTitle = () => {
    if ('type' in content) {
      return content.contentInfo.title
    } else {
      return `눕프로해커 : ${content.contentInfo.title}편`
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-[1300px] pt-12">
        <h2 className="text-text-subtler mb-2 text-xl">{getSubTitle()}</h2>
        <h1 className="mb-14 text-4xl font-semibold">{getTitle()}</h1>
        <div className="flex flex-col gap-32">
          {content.workInfo.map((line, lineIndex) => (
            <div key={line.title}>
              <div className="flex items-center gap-2">
                <span className="text-text-subtle">{`${lineIndex + 1}라인`}</span>
                <h3
                  className="scroll-mt-[15vh] text-2xl font-medium"
                  id={line.title}
                >
                  {line.title}
                </h3>
                {line.ranking !== null && line.ranking !== 0 && (
                  <div className="bg-fill-subtle mx-2 h-6 w-[2px]"></div>
                )}
                {line.ranking !== null && line.ranking !== 0 && (
                  <span className="text-lg">{`${line.ranking}위`}</span>
                )}
              </div>
              <div
                className="relative mx-auto mt-8 flex h-[50vh] w-full gap-12 duration-500 ease-in-out md:max-w-[1300px]"
                style={{
                  transform: `translateX(calc(${-page[lineIndex] * 50 * (16 / 9)}vh - ${page[lineIndex] * 3}rem))`,
                }}
              >
                {line.entries.map((entry) => (
                  <div
                    key={entry.imageUrl}
                    className="group relative aspect-video h-full hover:cursor-pointer [&>img]:rounded-xl"
                  >
                    <Image
                      fill
                      alt="작품 이미지"
                      src={renamePngTo1080Webp(entry.imageUrl)}
                    />
                    <div className="absolute top-8 left-8 rounded-md px-4 py-2">
                      <div className="mb-2 flex items-center gap-3">
                        <p className="text-2xl font-semibold text-white [text-shadow:_1px_1px_0_#000]">
                          {entry.tier || entry.title}
                        </p>
                        <div className="mt-1 flex gap-2">
                          {entry.ranking !== null && entry.ranking !== 0 && (
                            <p className="rounded-md bg-neutral-800/80 px-3 py-1 text-neutral-300">
                              {entry.ranking}위
                            </p>
                          )}
                        </div>
                      </div>
                      {entry.architectId.length === 1 ? (
                        <Link
                          href={`/architect/${entry.architectId}`}
                          className="text-lg text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
                        >
                          {entry.architectId[0].replaceAll('-', ' ')}
                        </Link>
                      ) : (
                        <div className="mt-3 flex flex-col gap-1.5">
                          {entry.architectId.map((id) => (
                            <Link
                              key={id}
                              href={`/architect/${id}`}
                              className="text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
                            >
                              {id}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-fill-default relative mx-auto mt-12 flex w-fit gap-4 rounded-full px-10 py-6">
                <ChevronLeft
                  onClick={() => moveToPrevPage(lineIndex)}
                  width={52}
                  height={52}
                  className={cn(
                    'hover:bg-fill-default absolute top-1 -left-16 rounded-full p-1.5 hover:cursor-pointer',
                    page[lineIndex] === 0 && 'invisible',
                  )}
                />
                {new Array(content.workInfo[lineIndex].entries.length)
                  .fill(0)
                  .map((item, entryIndex) => (
                    <button
                      key={entryIndex}
                      onClick={() => handleButtonClick(lineIndex, entryIndex)}
                      className={cn(
                        'bg-text-subtler h-3 w-3 rounded-full duration-300 hover:cursor-pointer',
                        page[lineIndex] === entryIndex && 'w-12',
                      )}
                    ></button>
                  ))}
                <ChevronLeft
                  onClick={() => moveToNextPage(lineIndex, line.entries.length)}
                  width={52}
                  height={52}
                  className={cn(
                    'hover:bg-fill-default absolute top-1 -right-16 rotate-180 rounded-full p-1.5 hover:cursor-pointer',
                    page[lineIndex] === line.entries.length - 1 && 'invisible',
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
