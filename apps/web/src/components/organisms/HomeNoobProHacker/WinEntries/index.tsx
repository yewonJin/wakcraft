import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Link2 } from 'lucide-react'
import { renamePngToWebp } from '@repo/utils'

import { InfoBox } from '@/components/atoms'

import { getHackerWinLine, getProWinLine } from '@/services/content'
import { getRecentNoobProHackers } from '@/libs/actions/noobprohacker'

export function HomeRecentWinEntries() {
  const { data: recentNoobProHackers } = useQuery({
    queryKey: ['recentNoobProHackers'],
    queryFn: () => getRecentNoobProHackers(3),
  })

  if (!recentNoobProHackers) return null

  return (
    <div className="mt-16">
      <h3 className="text-xl font-semibold md:text-3xl">최근 우승 작품</h3>
      <div className="relative mt-6 flex flex-wrap gap-5 gap-y-8 md:[&>div:nth-child(2)]:flex-row-reverse">
        {recentNoobProHackers.map((noobprohacker) => {
          const hackerWinTitle = getHackerWinLine(noobprohacker)?.title
          const proWinTitle = getHackerWinLine(noobprohacker)?.title
          const hackerEntry = getHackerWinLine(noobprohacker)?.entries[2]
          const proEntry = getProWinLine(noobprohacker)?.entries[1]

          return (
            <div
              key={noobprohacker.contentInfo.episode}
              className="flex w-full flex-col gap-5 md:flex-row"
            >
              <div className="relative aspect-video w-full rounded-3xl hover:cursor-pointer md:w-3/5 [&>img]:rounded-3xl">
                <Image
                  alt="해커 우승 작품"
                  fill
                  src={renamePngToWebp(hackerEntry?.imageUrl || '')}
                />
                <InfoBox
                  position="bottom"
                  className="flex w-max items-center gap-4 rounded-lg bg-black/80 px-4 py-2 text-base"
                >
                  {hackerEntry?.youtubeUrl && (
                    <Link2
                      onClick={() =>
                        window.open(hackerEntry.youtubeUrl || '', '_blank')
                      }
                      className="text-neutral-400 hover:cursor-pointer hover:text-neutral-300"
                    />
                  )}
                  <span>
                    {noobprohacker.contentInfo.episode}회 : {hackerWinTitle}
                  </span>
                  <Link
                    href={`/architect/${hackerEntry?.architectId[0].wakzooId}`}
                    className="text-neutral-400 hover:text-neutral-300"
                  >
                    {hackerEntry?.architectId[0].wakzooId}
                  </Link>
                </InfoBox>
              </div>
              <div className="relative aspect-video w-full rounded-3xl hover:cursor-pointer md:w-2/5 [&>img]:rounded-3xl">
                <Image
                  alt="프로 우승 작품"
                  fill
                  style={{ objectFit: 'cover' }}
                  src={renamePngToWebp(
                    getProWinLine(noobprohacker)?.entries[1].imageUrl || '',
                  )}
                />
                <InfoBox
                  position="bottom"
                  className="flex w-max items-center gap-4 rounded-lg bg-black/80 px-4 py-2 text-base"
                >
                  {proEntry?.youtubeUrl && (
                    <Link2
                      onClick={() =>
                        window.open(proEntry.youtubeUrl || '', '_blank')
                      }
                      className="text-neutral-400 hover:cursor-pointer hover:text-neutral-300"
                    />
                  )}
                  <span>
                    {noobprohacker.contentInfo.episode}회 : {proWinTitle}
                  </span>
                  <Link
                    href={`/architect/${proEntry?.architectId[0].wakzooId}`}
                    className="text-neutral-400 hover:text-neutral-300"
                  >
                    {proEntry?.architectId[0].wakzooId}
                  </Link>
                </InfoBox>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
