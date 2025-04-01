import ContentGrid from '@/components/organisms/ContentGrid'
import { getPlacementTest } from '@/libs/actions/placementTest'

export default async function Page({
  params,
}: {
  params: Promise<{ episode: string }>
}) {
  const { episode } = await params
  const placementTest = await getPlacementTest(Number(episode))

  if (!placementTest) return <h2>해당 컨텐츠가 없습니다.</h2>

  return <ContentGrid content={JSON.parse(JSON.stringify(placementTest))} />
}
