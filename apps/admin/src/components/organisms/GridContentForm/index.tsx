'use client'

import Divider from '@/components/atoms/Divider'
import ContentInfo from '@/components/molecules/ContentInfo'
import GridInfo from '@/components/molecules/GridInfo'

import { useContentForm } from '@/hooks/useContentForm'
import { GridEventNoobProHacker, PlacementTest } from '@/types/content'

type Props = {
  initialContent: GridEventNoobProHacker | PlacementTest
}

export default function GridContentForm({ initialContent }: Props) {
  const {
    content,
    onContentInfoChange,
    onGridInfoChange,
    onGridImageUrlChange,
    onGridMinecraftIdChange,
  } = useContentForm(initialContent)

  return (
    <form className="flex flex-col gap-8 p-8 max-w-[1920px] mx-auto">
      <h1 className="text-2xl font-bold">
        {'type' in content ? '그리드 이벤트 눕프핵' : '배치고사'}
      </h1>
      <ContentInfo
        contentInfo={content.contentInfo}
        onContentInfoChange={onContentInfoChange}
      />
      <Divider />
      <GridInfo
        entries={content.workInfo}
        onGridChange={onGridInfoChange}
        onGridImageUrlChange={onGridImageUrlChange}
        onGridMinecraftIdChange={onGridMinecraftIdChange}
      />
    </form>
  )
}
