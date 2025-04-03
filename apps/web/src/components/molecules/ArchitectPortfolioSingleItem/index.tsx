import Link from 'next/link'
import Image from 'next/image'
import { Architect } from '@repo/types'
import { renamePngTo1080Webp } from '@repo/utils'

import ArchitectYoutubeLink from '@/components/atoms/ArchitectYoutubeLink'
import InfoBox from '@/components/atoms/InfoBox'
import Tooltip from '@/components/atoms/Tooltip'

import { getDetailCategory } from '@/services/architect'
import { getContentUrl } from '@/services/content'

type Props = {
  item: Architect['portfolio'][number]
}

export default function ArchitectPortfolioSingleItem({ item }: Props) {
  return (
    <div
      key={item.date}
      className="group/image flex flex-col gap-4 hover:cursor-pointer"
      onClick={() => window.open(renamePngTo1080Webp(item.imageUrl))}
    >
      <div className="relative aspect-video">
        <Image
          className="rounded-3xl"
          fill
          src={renamePngTo1080Webp(item.imageUrl)}
          alt="작품 이미지"
        />
        <ArchitectYoutubeLink type="single" youtubeUrl={item.youtubeUrl} />
        <Tooltip
          position="bottom-right"
          className="px-3 py-2 group-hover/image:visible peer-hover:invisible"
        >
          클릭하여 원본 이미지 보기
        </Tooltip>
        <InfoBox
          position="top-left"
          className="top-9 left-9 flex-col items-center gap-1 bg-transparent text-base"
        >
          <Link
            onClick={(e) => e.stopPropagation()}
            href={getContentUrl(item.category, item.episode)}
            className="text-neutral-400 [text-shadow:_1px_1px_0_#555] hover:text-neutral-200"
          >
            {getDetailCategory(item.category, item.episode)}
          </Link>
          <p className="text-2xl font-semibold text-white [text-shadow:_1px_1px_0_#000]">
            {item.title}
          </p>
          <div className="mt-1 flex gap-2">
            {item.description && (
              <p className="rounded-md bg-neutral-800/80 px-3 py-1 text-neutral-300">
                {item.description}
              </p>
            )}
            {item.ranking !== null && item.ranking !== 0 && (
              <p className="rounded-md bg-neutral-800/80 px-3 py-1 text-neutral-300">
                {item?.type} {item.ranking}위
              </p>
            )}
          </div>
        </InfoBox>
      </div>
    </div>
  )
}
