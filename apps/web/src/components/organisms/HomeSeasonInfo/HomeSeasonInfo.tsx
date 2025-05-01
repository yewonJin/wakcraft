'use client'

import { HomeSeasonInfoProvider } from './HomeSeasonInfo.Provider'
import { HomeSeasonInfoView } from './HomeSeasonInfo.View'

export default function HomeSeasonInfo() {
  return (
    <HomeSeasonInfoProvider>
      <HomeSeasonInfoView />
    </HomeSeasonInfoProvider>
  )
}
