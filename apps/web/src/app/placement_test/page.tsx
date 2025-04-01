import ContentCardItem from '@/components/molecules/ContentCardItem'
import { getPlacementTests } from '@/libs/actions/placementTest'

export default async function Page() {
  const placementTests = await getPlacementTests()

  return (
    <div className="mx-auto max-w-[1200px] pt-12">
      <h1 className="mb-4 text-3xl font-semibold">배치고사</h1>
      <h2 className="text-text-subtler mb-6">
        마인크래프트 배치고사 컨텐츠를 볼 수 있다.
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {placementTests
          .sort(
            (a, b) =>
              new Date(b.contentInfo.date).getTime() -
              new Date(a.contentInfo.date).getTime(),
          )
          .map((placementTest) => (
            <ContentCardItem
              key={placementTest.contentInfo.date}
              category="배치고사"
              contentInfo={placementTest.contentInfo}
              contentUrl={`/placement_test/${placementTest.contentInfo.episode}`}
              lines={null}
            />
          ))}
      </div>{' '}
    </div>
  )
}
