import Link from 'next/link'
import Image from 'next/image'
import { Architect } from '@repo/types'
import { renamePngTo1080Webp, renamePngToWebp } from '@repo/utils'

import { ArchitectYoutubeLink, Tooltip, InfoBox } from '@/components/atoms'

import { getDetailCategory } from '@/services/architect'
import { getContentUrl } from '@/services/content'

type Props = {
  item: Architect['portfolio'][number]
}

export default function ArchitectPortfolioGridItem({ item }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="group/image dark:shadow-neutral-850/90 relative aspect-video rounded-xl shadow-md shadow-neutral-700/80 hover:cursor-pointer"
        onClick={() => window.open(renamePngTo1080Webp(item.imageUrl))}
      >
        <Image
          className="rounded-xl"
          fill
          src={renamePngToWebp(item.imageUrl)}
          alt="작품 이미지"
        />
        <ArchitectYoutubeLink type="grid" youtubeUrl={item.youtubeUrl} />
        <Tooltip
          position="bottom-right"
          className="text-sm group-hover/image:visible peer-hover:invisible"
        >
          클릭하여 원본 이미지 보기
        </Tooltip>
        {item.description && (
          <InfoBox position="top-left">{item.description}</InfoBox>
        )}
        {item.type && (
          <InfoBox position="bottom-left">{item.type} 라인</InfoBox>
        )}
      </div>
      <div className="relative flex justify-center">
        <div className="flex flex-col items-center gap-1">
          <Link
            href={getContentUrl(item.category, item.episode)}
            className="text-text-subtler hover:text-text-subtle"
          >
            {getDetailCategory(item.category, item.episode)}
          </Link>
          <p className="font-medium">{item.title}</p>
        </div>
        {item.ranking !== null && item.ranking !== 0 && (
          <div className="absolute right-5 flex flex-col items-center gap-1">
            <p className="text-text-subtler">순위</p>
            <p>{item.ranking}위</p>
          </div>
        )}
      </div>
    </div>
  )
}
