import ContentCardItem from '@/components/molecules/ContentCardItem'
import { getNoobProHackers } from '@/libs/actions/noobprohacker'

export default async function Page() {
  const noobprohackers = await getNoobProHackers()

  return (
    <div className="mx-auto max-w-[1200px] pt-12">
      <h1 className="mb-4 text-3xl font-semibold">눕프로해커</h1>
      <h2 className="text-text-subtler mb-6">
        마인크래프트 눕프로해커 컨텐츠를 볼 수 있다.
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {noobprohackers
          .sort(
            (a, b) =>
              new Date(b.contentInfo.date).getTime() -
              new Date(a.contentInfo.date).getTime(),
          )
          .map((noobprohacker) => (
            <ContentCardItem
              key={noobprohacker.contentInfo.date}
              category="눕프로해커"
              contentInfo={noobprohacker.contentInfo}
              contentUrl={`noobprohacker/${noobprohacker.contentInfo.episode}`}
              lines={noobprohacker.workInfo.map((line) => line.title)}
            />
          ))}
      </div>
    </div>
  )
}
