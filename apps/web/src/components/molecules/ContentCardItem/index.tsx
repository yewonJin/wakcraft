import Image from 'next/image'
import { Category, ContentInfo } from '@repo/types'
import { renamePngToWebp } from '@repo/utils'

import { Link2 } from 'lucide-react'
import Link from 'next/link'
import { getDetailContentTitle } from '@/services/content'

type Props = {
  category: Category
  contentInfo: ContentInfo
  winnerImageUrl: string
  lines: string[]
}

const getYoutubeThumbnailImageUrl = (youtube_url: string) => {
  return `https://i.ytimg.com/vi/${youtube_url.split('/')[3]}/hq720.jpg`
}

export default function ContentCardItem({
  category,
  contentInfo,
  winnerImageUrl,
  lines,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-t-xl duration-300 hover:-translate-y-2 hover:cursor-pointer">
      <div className="relative aspect-video">
        <Image
          className="rounded-t-xl bg-blend-darken brightness-50 duration-300 group-hover:scale-105 group-hover:brightness-100"
          fill
          alt="유튜브 썸네일 이미지"
          src={
            contentInfo.youtubeUrl
              ? getYoutubeThumbnailImageUrl(contentInfo.youtubeUrl)
              : renamePngToWebp(winnerImageUrl as string)
          }
        />
        {contentInfo.isTribute && (
          <span className="absolute top-2 left-2 rounded-md bg-green-700/80 px-2 py-1 text-sm">
            조공 컨텐츠
          </span>
        )}
      </div>
      <div className="bg-fill-default rounded-b-xl px-4 py-6">
        <h3 className="text-text-stronger text-xl font-medium">
          {getDetailContentTitle(
            category,
            contentInfo.episode,
            contentInfo.title,
          )}
        </h3>
        <div className="text-text-subtler mt-4 flex flex-wrap gap-2">
          {lines.map((line) => (
            <span
              key={line}
              className="bg-fill-strong hover:bg-fill-subtle rounded-md px-2 py-1 text-sm hover:cursor-pointer"
            >
              {`#${line}`}
            </span>
          ))}
        </div>
        <div className="bg-fill-subtle my-4 h-[1px] w-full"></div>
        <div className="flex justify-between">
          {contentInfo.youtubeUrl && (
            <Link
              target="_blank"
              href={contentInfo.youtubeUrl}
              className="bg-fill-strong hover:bg-fill-subtle text-text-subtler flex items-center gap-1 rounded-md px-2 py-1 text-sm"
            >
              <Link2 width={18} height={18} className="pt-[1px]" />
              <span>유튜브</span>
            </Link>
          )}
          <span className="text-text-subtler text-sm">
            {new Date(contentInfo.date).toISOString().split('T')[0]}
          </span>
        </div>
      </div>
    </div>
  )
}
