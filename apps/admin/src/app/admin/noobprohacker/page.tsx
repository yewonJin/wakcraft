import { NoobProHackerForm } from '@/components/templates'
import DataProvider from '@/providers/DataProvider'

import { getArchitectIds } from '@/lib/actions/architect'
import {
  getNoobProHackerLatestEpisode,
  postNoobProHacker,
} from '@/lib/actions/noobprohacker'

export default async function Page() {
  const nextEpisode = (await getNoobProHackerLatestEpisode()) + 1
  const architects = await getArchitectIds()

  return (
    <DataProvider
      category="noobprohacker"
      episode={nextEpisode}
      architects={JSON.parse(JSON.stringify(architects))}
    >
      <NoobProHackerForm action={postNoobProHacker} nextEpisode={nextEpisode} />
    </DataProvider>
  )
}
