import Image from 'next/image'
import { Architect } from '@repo/types'
import { renamePngTo1080Webp } from '@repo/utils'
import { Clapperboard } from 'lucide-react'

import InfoBox from '@/components/atoms/InfoBox'
import Tooltip from '@/components/atoms/Tooltip'

import { getDetailCategory } from '@/services/architect'

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
        {item.youtubeUrl && (
          <div
            className="group/youtube peer absolute top-10 right-10 z-10 flex flex-col items-center rounded-lg fill-[#fff] p-[3px] text-left opacity-80 hover:cursor-pointer hover:rounded-l-none hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              window.open(item.youtubeUrl as string)
            }}
          >
            <Clapperboard
              className="absolute text-neutral-800/50"
              width={32}
              height={32}
            />
            <Clapperboard
              className="absolute text-white"
              width={34}
              height={34}
            />
            <p className="invisible absolute top-0 right-9 flex h-10 w-max items-center pr-[6px] pb-[1px] pl-[10px] text-[white] [text-shadow:_1px_1px_0_#000] group-hover/youtube:visible group-hover/youtube:rounded-l-lg">
              유튜브로 이동
            </p>
          </div>
        )}
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
          <p className="text-neutral-400 [text-shadow:_1px_1px_0_#555]">
            {getDetailCategory(item.category, item.episode)}
          </p>
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
