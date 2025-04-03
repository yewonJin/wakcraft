'use client'

import { LineInfo, NoobProHacker } from '@repo/types'

import { HomeNoobProHackerTitle } from './Title'
import { HomeRecentWinEntries } from './WinEntries'
import { HomeSweepLine } from './SweepLine'

type Props = {
  recentNoobProHackers: NoobProHacker[]
  sweepLines: LineInfo[]
}

export default function HomeNoobProHacker({
  recentNoobProHackers,
  sweepLines,
}: Props) {
  return (
    <div className="px-4 pt-12 md:pt-24 xl:px-0">
      <HomeNoobProHackerTitle />
      <HomeRecentWinEntries recentNoobProHackers={recentNoobProHackers} />
      <HomeSweepLine sweepLines={sweepLines} />
    </div>
  )
}
