import { Architect } from '@repo/types'

type Props = {
  statistics: Architect['statistics']
}

export default function ArchitectStatistics({ statistics }: Props) {
  return (
    <div className="text-text-subtle flex gap-4 text-sm md:gap-8 md:text-base">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:flex-col">
        <p className="hidden sm:block">참여 횟수</p>
        <p className="sm:hidden">참여</p>
        <span className="text-text-strong">{statistics.participation}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:flex-col">
        <p className="hidden sm:block">우승 횟수</p>
        <p className="sm:hidden">우승</p>
        <span className="text-text-strong">{statistics.win}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:flex-col">
        <span className="">해커 우승</span>
        <span className="text-text-strong">{statistics.hackerWin}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:flex-col">
        <span className="">프로 우승</span>
        <span className="text-text-strong">{statistics.proWin}</span>
      </div>
    </div>
  )
}
