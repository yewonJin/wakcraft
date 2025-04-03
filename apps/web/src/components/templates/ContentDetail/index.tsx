import {
  Category,
  EventNoobProHacker,
  NoobProHacker,
  PlacementTest,
} from '@repo/types'

import { ContentYoutubeLink } from '@/components/atoms'
import { ContentDetailTitle } from '@/components/molecules'
import { ContentGrid, ContentLine } from '@/components/organisms'

type Props = {
  category: Category
  content: NoobProHacker | EventNoobProHacker | PlacementTest
  isMobile: boolean
}

export default function ContentDetail({ category, content, isMobile }: Props) {
  const renderContent = () => {
    if (category === '눕프로해커') {
      return (
        <ContentLine isMobile={isMobile} content={content as NoobProHacker} />
      )
    }

    if (category === '배치고사') {
      return <ContentGrid content={content as PlacementTest} />
    }

    const eventContent = content as EventNoobProHacker
    return eventContent.type === 'grid' ? (
      <ContentGrid content={eventContent} />
    ) : (
      <ContentLine isMobile={isMobile} content={eventContent} />
    )
  }

  return (
    <main className="overflow-hidden">
      <div className="mx-auto max-w-[1300px] pt-6 md:pt-12">
        <ContentDetailTitle
          category={category}
          episode={content.contentInfo.episode}
          title={content.contentInfo.title}
        />
        <div className="px-4 xl:px-0">
          <ContentYoutubeLink youtubeUrl={content.contentInfo.youtubeUrl} />
        </div>
        {renderContent()}
      </div>
    </main>
  )
}
