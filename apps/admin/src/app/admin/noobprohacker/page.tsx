import NoobProHackerForm from '@/components/templates/NoobProHackerForm'
import DataProvider from '@/providers/DataProvider'

import { getArchitectIds } from '@/lib/actions/architect'
import { getNoobProHackerLatestEpisode } from '@/lib/actions/noobprohacker'

export default async function Page() {
  const nextEpisode = (await getNoobProHackerLatestEpisode()) + 1
  const architects = await getArchitectIds()

  return (
    <DataProvider
      category="noobProHacker"
      episode={nextEpisode}
      architects={architects}
    >
      <NoobProHackerForm nextEpisode={nextEpisode} />
    </DataProvider>
  )
}
