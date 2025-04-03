import { ContentCardItem, MainPageTitle } from '@/components/molecules'

import { compareByDateDescending, getContentUrl } from '@/services/content'
import {
  Category,
  EventNoobProHacker,
  NoobProHacker,
  PlacementTest,
} from '@repo/types'

type Contents = NoobProHacker[] | EventNoobProHacker[] | PlacementTest[]

type Props<T extends Contents> = {
  category: Category
  description: string
  contents: T
}

export default function ContentMain<T extends Contents>({
  contents,
  category,
  description,
}: Props<T>) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 md:pt-12 xl:px-0">
      <MainPageTitle title={category} description={description} />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {contents.sort(compareByDateDescending).map((content) => (
          <ContentCardItem
            key={content.contentInfo.date}
            category={category}
            contentInfo={content.contentInfo}
            contentUrl={getContentUrl(category, content.contentInfo.episode)}
            lines={content.workInfo
              .map((line) => ('entries' in line ? line.title : null))
              .filter((x) => x !== null)}
          />
        ))}
      </div>
    </div>
  )
}
