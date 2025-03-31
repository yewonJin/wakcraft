import { Architect } from '@repo/types'

type Props = {
  statistics: Architect['statistics']
}

export default function ArchitectStatistics({ statistics }: Props) {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-text-subtler">참여 횟수</span>
        <span>{statistics.participation}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-text-subtler">우승 횟수</span>
        <span>{statistics.win}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-text-subtler">해커 우승</span>
        <span>{statistics.hackerWin}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-text-subtler">프로 우승</span>
        <span>{statistics.proWin}</span>
      </div>
    </div>
  )
}
