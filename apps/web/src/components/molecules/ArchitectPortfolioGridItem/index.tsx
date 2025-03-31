import Image from 'next/image'
import { Clapperboard } from 'lucide-react'
import { Architect } from '@repo/types'
import { renamePngTo1080Webp, renamePngToWebp } from '@repo/utils'
import { getDetailCategory } from '@/services/architect'

type Props = {
  item: Architect['portfolio'][number]
}

export default function ArchitectPortfolioGridItem({ item }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="group/image relative aspect-video rounded-xl shadow-md shadow-neutral-700/80 hover:cursor-pointer dark:shadow-neutral-800/90"
        onClick={() => window.open(renamePngTo1080Webp(item.imageUrl))}
      >
        <Image
          className="rounded-xl"
          fill
          src={renamePngToWebp(item.imageUrl)}
          alt="작품 이미지"
        />
        {item.youtubeUrl && (
          <div
            className="group/youtube peer absolute top-2 right-2 z-10 w-8 rounded-lg fill-[#fff] p-[3px] text-left opacity-90 hover:cursor-pointer hover:rounded-l-none hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              window.open(item.youtubeUrl as string)
            }}
          >
            <Clapperboard
              className="absolute text-neutral-800/50"
              width={25}
              height={25}
            />
            <Clapperboard
              className="absolute text-white"
              width={24}
              height={24}
            />
            <p className="invisible absolute top-0 right-8 flex h-8 w-max items-center pr-[6px] pb-[1px] pl-[10px] text-sm text-[white] [text-shadow:_1px_1px_0_#000] group-hover/youtube:visible group-hover/youtube:rounded-l-lg">
              유튜브로 이동
            </p>
          </div>
        )}
        <div className="invisible absolute right-2 bottom-2 bg-neutral-900 px-[10px] py-1 text-sm text-[white] group-hover/image:visible peer-hover:invisible">
          클릭하여 원본 이미지 보기
        </div>
        {item.description && (
          <span className="absolute top-[6px] left-[6px] rounded-md bg-neutral-800/85 px-2.5 py-1.5 text-sm text-neutral-50">
            {item.description}
          </span>
        )}
        {item.type && (
          <span className="absolute bottom-[6px] left-[6px] rounded-md bg-neutral-800/85 px-2.5 py-1.5 text-sm text-neutral-50">
            {item.type} 라인
          </span>
        )}
      </div>
      <div className="relative flex justify-center">
        <div className="flex flex-col items-center gap-1">
          <p className="text-text-subtler">
            {getDetailCategory(item.category, item.episode)}
          </p>
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
