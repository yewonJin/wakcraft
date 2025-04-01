import ContentLine from '@/components/organisms/ContentLine'
import { getNoobProHacker } from '@/libs/actions/noobprohacker'
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

  const noobprohacker = await getNoobProHacker(Number(episode))

  return (
    <ContentLine
      isMobile={isMobile(userAgent)}
      content={JSON.parse(JSON.stringify(noobprohacker))}
    />
  )
}
