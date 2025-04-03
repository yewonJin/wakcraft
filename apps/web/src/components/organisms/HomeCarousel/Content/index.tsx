import Image from 'next/image'
import Link from 'next/link'
import { NoobProHacker } from '@repo/types'
import { renamePngToWebp } from '@repo/utils'

import { Tooltip } from '@/components/atoms'

type Props = {
  latestNoobProHacker: NoobProHacker
  carouselIndex: number
  onMouseOver: () => void
  onMouseOut: () => void
}

export function HomeCarouselContent({
  latestNoobProHacker,
  carouselIndex,
  onMouseOver,
  onMouseOut,
}: Props) {
  return (
    <div className="w-full overflow-hidden px-4 xl:px-0">
      <div
        className="flex gap-8 duration-500"
        style={{
          transform: `translateX(calc(${-carouselIndex} * (100% + 32px)))`,
        }}
      >
        {latestNoobProHacker.workInfo.map((line) => (
          <div
            key={line.title}
            className="flex w-full flex-col justify-center gap-6 md:flex-row md:gap-8"
          >
            {line.entries.map((entry) => (
              <div
                key={entry.imageUrl}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                className="group relative h-[60vw] max-h-[480px] w-[calc(100vw-32px)] overflow-hidden hover:cursor-pointer md:h-[45vh] md:w-[30vw] [&>img]:duration-[500ms] [&>img]:hover:scale-105"
              >
                <Image
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                  src={renamePngToWebp(entry.imageUrl)}
                  alt="작품 이미지"
                />
                <Tooltip
                  onClick={(e) => e.preventDefault()}
                  position="bottom"
                  className="md:group-hover:animate-fadeIn visible flex gap-4 rounded-2xl px-6 py-2 md:invisible md:group-hover:visible"
                >
                  <Link href={`/architect/${entry.architectId[0]}`}>
                    <p className="text-[#aaa] hover:cursor-pointer hover:text-[white]">
                      {entry.architectId[0]}
                    </p>
                  </Link>
                  <p>{entry.tier}</p>
                </Tooltip>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
