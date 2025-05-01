'use client'

import { HomeNoobProHackerProvider } from './HomeNoobProHacker.Provider'
import { HomeNoobProHackerView } from './HomeNoobProHacker.View'

export default function HomeNoobProHacker() {
  return (
    <HomeNoobProHackerProvider>
      <HomeNoobProHackerView />
    </HomeNoobProHackerProvider>
  )
}
