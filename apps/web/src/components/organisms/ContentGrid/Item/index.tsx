import Image from 'next/image'
import Link from 'next/link'
import { renamePngToWebp } from '@repo/utils'

import { InfoBox, Tooltip } from '@/components/atoms'

import { PopulatedGridInfo } from '@/types/content'

export function ContentGridItem({ entry }: { entry: PopulatedGridInfo }) {
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
            href={`/architect/${entry.architectId[0].wakzooId}`}
            className="text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
          >
            {entry.architectId[0].wakzooId.replaceAll('-', ' ')}
          </Link>
        ) : (
          <div className="mt-3 flex flex-col gap-1.5">
            {entry.architectId.map((id) => (
              <Link
                onClick={(e) => e.stopPropagation()}
                key={id.wakzooId}
                href={`/architect/${id.wakzooId}`}
                className="text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
              >
                {id.wakzooId}
              </Link>
            ))}
          </div>
        )}
      </InfoBox>
    </div>
  )
}
