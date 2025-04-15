'use client'

import { HomeNoobProHackerTitle } from './Title'
import { HomeRecentWinEntries } from './WinEntries'
import { HomeSweepLine } from './SweepLine'

export default function HomeNoobProHacker() {
  return (
    <div className="px-4 pt-12 md:pt-24 xl:px-0">
      <HomeNoobProHackerTitle />
      <HomeRecentWinEntries />
      <HomeSweepLine />
    </div>
  )
}
