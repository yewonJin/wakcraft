import { NoobProHacker } from '@repo/types'

export function HomeCarouselTitle({
  latestNoobProHacker,
}: {
  latestNoobProHacker: NoobProHacker
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-text-strong text-3xl font-bold md:text-5xl md:text-neutral-100">
        {`눕프로해커 : ${latestNoobProHacker.contentInfo.title} 편`}
      </h1>
      <h2 className="text-text-subtle text-2xl font-semibold md:text-4xl md:text-neutral-400">
        {latestNoobProHacker.contentInfo.episode + '회'}
      </h2>
    </div>
  )
}
