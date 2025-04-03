import { PlacementTest } from '@repo/types'

import { formatDateToKorean, getDaysBetween } from '@/utils/date'

type Props = {
  currentPlacementTest: Omit<PlacementTest, 'workInfo'>
  nextPlecementTest?: Omit<PlacementTest, 'workInfo'>
}

export function HomeSeasonInfoDateInfo({
  currentPlacementTest,
  nextPlecementTest,
}: Props) {
  return (
    <div className="flex h-[40px] items-center gap-2">
      <p className="text-text-subtle text-md md:text-lg">
        {`${formatDateToKorean(currentPlacementTest.contentInfo.date)} ~
        ${nextPlecementTest ? formatDateToKorean(nextPlecementTest.contentInfo.date) : ''}`}
      </p>
      {nextPlecementTest && (
        <span className="text-md md:text-lg">
          (
          {getDaysBetween(
            currentPlacementTest.contentInfo.date,
            nextPlecementTest.contentInfo.date,
          )}
          일)
        </span>
      )}
    </div>
  )
}
