import DataProvider from '@/providers/DataProvider'

import { getArchitectIds } from '@/lib/actions/architect'

import {
  getNoobProHacker,
  updateNoobProHacker,
} from '@/lib/actions/noobprohacker'
import NoobProHackerForm from '@/components/templates/NoobProHackerForm'

export default async function Page({
  params,
}: {
  params: Promise<{ episode: string }>
}) {
  const { episode } = await params
  const noobprohacker = await getNoobProHacker(Number(episode))
  const architects = await getArchitectIds()

  return (
    <DataProvider
      category="noobProHacker"
      episode={Number(episode)}
      architects={JSON.parse(JSON.stringify(architects))}
    >
      <NoobProHackerForm
        action={updateNoobProHacker}
        content={JSON.parse(JSON.stringify(noobprohacker))}
        nextEpisode={Number(episode)}
      />
    </DataProvider>
  )
}
