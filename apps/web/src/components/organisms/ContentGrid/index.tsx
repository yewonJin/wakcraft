'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GridEventNoobProHacker, PlacementTest } from '@repo/types'
import { renamePngToWebp } from '@repo/utils'
import { Link2 } from 'lucide-react'

type Props = {
  content: GridEventNoobProHacker | PlacementTest
}

export default function ContentGrid({ content }: Props) {
  const getSubTitle = () => {
    if ('type' in content) {
      return `예능 눕프핵 ${content.contentInfo.episode}회 `
    } else {
      return `시즌 ${content.contentInfo.episode}`
    }
  }

  const getTitle = () => {
    if ('type' in content) {
      return content.contentInfo.title
    } else {
      return `배치고사`
    }
  }

  return (
    <div className="mx-auto max-w-[1300px] pt-6 md:pt-12">
      <h2 className="text-text-subtler mb-2 px-4 text-xl xl:px-0">
        {getSubTitle()}
      </h2>
      <h1 className="mb-6 px-4 text-4xl font-semibold xl:px-0">{getTitle()}</h1>
      {content.contentInfo.youtubeUrl && (
        <div
          onClick={() => window.open(content.contentInfo.youtubeUrl as string)}
          className="text-text-subtle bg-fill-default hover:bg-fill-subtle mb-8 ml-4 flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm hover:cursor-pointer xl:ml-0"
        >
          <Link2 width={20} height={20} />
          유튜브로 이동
        </div>
      )}
      <div className="mt-8 grid grid-cols-1 gap-6 gap-y-12 md:grid-cols-2 2xl:w-[1400px] 2xl:grid-cols-3">
        {content.workInfo
          .sort((a, b) => a.order - b.order)
          .map((entry) => (
            <div
              onClick={() => {
                if (!entry.youtubeUrl) return
                window.open(entry.youtubeUrl)
              }}
              key={entry.imageUrl}
              className="group relative aspect-video h-full hover:cursor-pointer"
            >
              <Image
                className="rounded-none xl:rounded-xl"
                fill
                alt="작품 이미지"
                src={renamePngToWebp(entry.imageUrl)}
              />
              {entry.youtubeUrl && (
                <div className="invisible absolute right-2 bottom-2 rounded-md bg-neutral-800/80 px-3 py-2 group-hover:visible">
                  클릭하여 유튜브로 이동
                </div>
              )}
              <div className="absolute top-4 left-4 rounded-md px-4 py-2">
                <div className="mb-2 flex items-center gap-3">
                  <p className="text-lg font-semibold text-white [text-shadow:_1px_1px_0_#000]">
                    {entry.title}
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
                    onClick={(e) => e.stopPropagation()}
                    href={`/architect/${entry.architectId}`}
                    className="text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
                  >
                    {entry.architectId[0].replaceAll('-', ' ')}
                  </Link>
                ) : (
                  <div className="mt-3 flex flex-col gap-1.5">
                    {entry.architectId.map((id) => (
                      <Link
                        onClick={(e) => e.stopPropagation()}
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
    </div>
  )
}
