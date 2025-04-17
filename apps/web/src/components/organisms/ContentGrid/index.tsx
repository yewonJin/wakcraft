'use client'

import { ContentGridItem } from './Item'
import {
  PopulatedGridEventNoobProHacker,
  PopulatedPlacementTest,
} from '@/types/content'

type Props = {
  content: PopulatedGridEventNoobProHacker | PopulatedPlacementTest
}

export default function ContentGrid({ content }: Props) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 gap-y-12 md:grid-cols-2 2xl:w-[1400px] 2xl:grid-cols-3">
      {content.workInfo
        .sort((a, b) => a.order - b.order)
        .map((entry) => (
          <ContentGridItem key={entry.imageUrl} entry={entry} />
        ))}
    </div>
  )
}
