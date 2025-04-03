'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GridEventNoobProHacker, GridInfo, PlacementTest } from '@repo/types'
import { renamePngToWebp } from '@repo/utils'

import InfoBox from '@/components/atoms/InfoBox'
import Tooltip from '@/components/atoms/Tooltip'

import ContentDetailTitle from '@/components/molecules/ContentDetailTitle'
import ContentYoutubeLink from '@/components/atoms/ContentYoutubeLink'

type Props = {
  content: GridEventNoobProHacker | PlacementTest
}

export default function ContentGrid({ content }: Props) {
  return (
    <div className="mx-auto max-w-[1300px] pt-6 md:pt-12">
      <ContentDetailTitle
        category={'type' in content ? '예능 눕프핵' : '배치고사'}
        episode={content.contentInfo.episode}
        title={content.contentInfo.title}
      />
      <div className="px-4 xl:px-0">
        <ContentYoutubeLink youtubeUrl={content.contentInfo.youtubeUrl} />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 gap-y-12 md:grid-cols-2 2xl:w-[1400px] 2xl:grid-cols-3">
        {content.workInfo
          .sort((a, b) => a.order - b.order)
          .map((entry) => (
            <ContentGridItem key={entry.imageUrl} entry={entry} />
          ))}
      </div>
    </div>
  )
}

function ContentGridItem({ entry }: { entry: GridInfo }) {
  return (
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
        <Tooltip position="bottom-right" className="group-hover:visible">
          클릭하여 유튜브로 이동
        </Tooltip>
      )}
      <InfoBox
        position="top-left"
        className="top-[6%] left-[4%] flex-col bg-transparent text-base"
      >
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
      </InfoBox>
    </div>
  )
}
