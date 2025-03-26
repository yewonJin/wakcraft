import EventNoobProHackerEditForm from '@/components/templates/EventNoobProHackerEditForm'
import DataProvider from '@/providers/DataProvider'

import { getArchitectIds } from '@/lib/actions/architect'
import {
  getEventNoobProHacker,
  updateLineEventNoobProHacker,
  updateGridEventNoobProHacker,
} from '@/lib/actions/eventNoobProHacker'

export default async function Page({
  params,
}: {
  params: Promise<{ episode: string }>
}) {
  const { episode } = await params
  const eventNoobProHacker = await getEventNoobProHacker(Number(episode))
  const architects = await getArchitectIds()

  return (
    <DataProvider
      category="eventNoobProHacker"
      episode={Number(episode)}
      architects={JSON.parse(JSON.stringify(architects))}
    >
      <EventNoobProHackerEditForm
        content={JSON.parse(JSON.stringify(eventNoobProHacker))}
        actions={{
          line: updateLineEventNoobProHacker,
          grid: updateGridEventNoobProHacker,
        }}
      />
    </DataProvider>
  )
}
