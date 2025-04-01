import { Architect } from '@repo/types'

type Props = {
  statistics: Architect['statistics']
}

export default function ArchitectStatistics({ statistics }: Props) {
  return (
    <div className="text-text-subtle flex gap-4 md:gap-8">
      <div className="flex flex-col items-center gap-2">
        <p className="hidden sm:block">참여 횟수</p>
        <p className="sm:hidden">참여</p>
        <span className="text-text-strong">{statistics.participation}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="hidden sm:block">우승 횟수</p>
        <p className="sm:hidden">우승</p>
        <span className="text-text-strong">{statistics.win}</span>
      </div>
      <div className="hidden flex-col items-center gap-2 md:flex">
        <span className="">해커 우승</span>
        <span className="text-text-strong">{statistics.hackerWin}</span>
      </div>
      <div className="hidden flex-col items-center gap-2 md:flex">
        <span className="">프로 우승</span>
        <span className="text-text-strong">{statistics.proWin}</span>
      </div>
    </div>
  )
}
