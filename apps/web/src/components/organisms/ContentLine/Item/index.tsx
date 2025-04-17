import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Users } from 'lucide-react'
import { renamePngToWebp } from '@repo/utils'
import { ArchitectId } from '@repo/types'

import { InfoBox, Tooltip } from '@/components/atoms'

import { PopulatedLineEntry } from '@/types/content'

export function ContentLineItem({ entry }: { entry: PopulatedLineEntry }) {
  return (
    <div
      onClick={() => {
        if (!entry.youtubeUrl) return
        window.open(entry.youtubeUrl)
      }}
      key={entry.imageUrl}
      className="group relative h-full min-w-[100%] hover:cursor-pointer xl:aspect-video xl:min-w-auto"
    >
      <Image
        className="rounded-none xl:rounded-xl"
        fill
        alt="작품 이미지"
        src={renamePngToWebp(entry.imageUrl)}
      />
      <InfoBox
        position="top-left"
        className="top-[5%] left-[3%] flex-col bg-transparent"
      >
        <div className="mb-2 flex items-center gap-3">
          <p className="text-xl font-semibold text-white [text-shadow:_1px_1px_0_#000] md:text-2xl">
            {entry.tier || entry.title}
          </p>
          <div className="mt-1 flex gap-2">
            {entry.ranking !== null && entry.ranking !== 0 && (
              <p className="rounded-md bg-neutral-800/80 px-3 py-1 text-sm text-neutral-300 md:text-base">
                {entry.ranking}위
              </p>
            )}
          </div>
        </div>
        {entry.architectId.length < 5 ? (
          <div className="flex flex-col gap-2">
            {entry.architectId.map((id) => (
              <Link
                key={id.minecraftId}
                onClick={(e) => e.stopPropagation()}
                href={`/architect/${id.wakzooId}`}
                className="text-lg text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
              >
                {id.wakzooId.replaceAll('-', ' ')}
              </Link>
            ))}
          </div>
        ) : (
          <ContentArchitects architectIds={entry.architectId} />
        )}
      </InfoBox>
      {entry.youtubeUrl && (
        <Tooltip
          position="bottom-right"
          className="group-hover:visible md:right-2 md:bottom-2 md:px-4 md:py-2"
        >
          클릭하여 유튜브로 이동
        </Tooltip>
      )}
    </div>
  )
}

function ContentArchitects({ architectIds }: { architectIds: ArchitectId[] }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative mt-3">
      <Users
        className="text-neutral-400 hover:text-neutral-300"
        onClick={handleUserClick}
      />
      {isOpen && (
        <div className="right-0 grid grid-cols-3 gap-1 bg-neutral-900/90">
          {architectIds.map((id) => (
            <Link
              onClick={(e) => e.stopPropagation()}
              key={id.minecraftId}
              href={`/architect/${id.wakzooId}`}
              className="px-3 py-2 text-sm text-neutral-300 [text-shadow:_1px_1px_0_#000] hover:text-neutral-200"
            >
              {id.wakzooId}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
