import ContentGrid from '@/components/organisms/ContentGrid'
import ContentLine from '@/components/organisms/ContentLine'
import { getEventNoobProHacker } from '@/libs/actions/eventNoobProHacker'

export default async function Page({
  params,
}: {
  params: Promise<{ episode: string }>
}) {
  const { episode } = await params
  const eventNoobProHacker = await getEventNoobProHacker(Number(episode))

  if (!eventNoobProHacker) return <h2>해당 컨텐츠가 없습니다.</h2>

  if (eventNoobProHacker.type === 'grid') {
    return (
      <ContentGrid content={JSON.parse(JSON.stringify(eventNoobProHacker))} />
    )
  }

  return (
    <ContentLine content={JSON.parse(JSON.stringify(eventNoobProHacker))} />
  )
}
