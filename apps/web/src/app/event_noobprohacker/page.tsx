import EventNoobProHackerHome from '@/components/templates/EventNoobProHackerHome'

import { getEventNoobProHackers } from '@/libs/actions/eventNoobProHacker'

export default async function Page() {
  const eventNoobProHackers = await getEventNoobProHackers()

  return (
    <EventNoobProHackerHome
      eventNoobProHackers={JSON.parse(JSON.stringify(eventNoobProHackers))}
    />
  )
}
