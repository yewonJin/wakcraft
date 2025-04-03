import { NoobProHacker } from '@repo/types'
import { renamePngTo1080Webp } from '@repo/utils'

import { getHackerWinLine } from '@/services/content'

export function HomeCarouselBackground({
  latestNoobProHacker,
}: {
  latestNoobProHacker: NoobProHacker
}) {
  return (
    <div
      className="absolute top-0 left-0 z-[-1] hidden h-full w-full bg-[rgba(0,0,0,0.5)] bg-cover bg-center bg-no-repeat bg-blend-darken md:block"
      style={{
        backgroundImage: `url("${renamePngTo1080Webp(getHackerWinLine(latestNoobProHacker)?.entries[2]?.imageUrl as string)}")`,
      }}
    ></div>
  )
}
