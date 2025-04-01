import ContentGrid from '@/components/organisms/ContentGrid'
import ContentLine from '@/components/organisms/ContentLine'
import { getEventNoobProHacker } from '@/libs/actions/eventNoobProHacker'
import { isMobile } from '@/utils/shared'
import { headers } from 'next/headers'

export default async function Page({
  params,
}: {
  params: Promise<{ episode: string }>
}) {
  const { episode } = await params
  const headerList = await headers()
  const userAgent = headerList.get('user-agent') as string

  const eventNoobProHacker = await getEventNoobProHacker(Number(episode))

  if (!eventNoobProHacker) return <h2>해당 컨텐츠가 없습니다.</h2>

  if (eventNoobProHacker.type === 'grid') {
    return (
      <ContentGrid content={JSON.parse(JSON.stringify(eventNoobProHacker))} />
    )
  }

  return (
    <ContentLine
      isMobile={isMobile(userAgent)}
      content={JSON.parse(JSON.stringify(eventNoobProHacker))}
    />
  )
}
