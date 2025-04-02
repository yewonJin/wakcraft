import EventNoobProHackerForm from '@/components/templates/EventNoobProHackerForm'
import DataProvider from '@/providers/DataProvider'

import { getArchitectIds } from '@/lib/actions/architect'
import { getEventNoobProHackerLatestEpisode } from '@/lib/actions/eventNoobProHacker'
import {
  postGridEventNoobProHacker,
  postLineEventNoobProHacker,
} from '@/lib/actions/eventNoobProHacker'

export default async function Page() {
  const nextEpisode = (await getEventNoobProHackerLatestEpisode()) + 1
  const architects = await getArchitectIds()

  return (
    <DataProvider
      category="event_noobprohacker"
      episode={nextEpisode}
      architects={JSON.parse(JSON.stringify(architects))}
    >
      <EventNoobProHackerForm
        actions={{
          line: postLineEventNoobProHacker,
          grid: postGridEventNoobProHacker,
        }}
        nextEpisode={nextEpisode}
      />
    </DataProvider>
  )
}
