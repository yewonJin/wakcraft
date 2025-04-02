import PlacementTestForm from '@/components/templates/PlacementTestForm'
import DataProvider from '@/providers/DataProvider'

import { getArchitectIds } from '@/lib/actions/architect'
import { getPlacementTestLatestEpisode } from '@/lib/actions/placementTest'

export default async function Page() {
  const nextEpisode = (await getPlacementTestLatestEpisode()) + 1
  const architects = await getArchitectIds()

  return (
    <DataProvider
      category="placement_test"
      episode={nextEpisode}
      architects={JSON.parse(JSON.stringify(architects))}
    >
      <PlacementTestForm nextEpisode={nextEpisode} />
    </DataProvider>
  )
}
