import EventNoobProHackerForm from '@/components/templates/EventNoobProHackerForm'
import DataProvider from '@/providers/DataProvider'

import { getArchitectIds } from '@/lib/actions/architect'
import { getEventNoobProHackerLatestEpisode } from '@/lib/actions/eventNoobProHacker'

export default async function Page() {
  const nextEpisode = (await getEventNoobProHackerLatestEpisode()) + 1
  const architects = await getArchitectIds()

  return (
    <DataProvider
      category="eventNoobProHacker"
      episode={nextEpisode}
      architects={JSON.parse(JSON.stringify(architects))}
    >
      <EventNoobProHackerForm nextEpisode={nextEpisode} />
    </DataProvider>
  )
}
