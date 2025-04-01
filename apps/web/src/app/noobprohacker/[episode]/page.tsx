import ContentLine from '@/components/organisms/ContentLine'
import { getNoobProHacker } from '@/libs/actions/noobprohacker'

export default async function Page({
  params,
}: {
  params: Promise<{ episode: string }>
}) {
  const { episode } = await params
  const noobprohacker = await getNoobProHacker(Number(episode))

  return <ContentLine content={JSON.parse(JSON.stringify(noobprohacker))} />
}
