'use client'

import { useParams } from 'next/navigation'
import { GridEventNoobProHacker, PlacementTest } from '@repo/types'

import Divider from '@/components/atoms/Divider'
import ContentInfo from '@/components/molecules/ContentInfo'
import GridInfo from '@/components/molecules/GridInfo'
import PlacementTestGridInfo from '@/components/molecules/PlacementTestGridInfo'

import { useContentForm } from '@/hooks/useContentForm'
import { convertGridContentArchitectId } from '@/services/content'
import { useArchitectsStore } from '@/store/architectStore'

type Props<T extends GridEventNoobProHacker | PlacementTest> = {
  action: (payload: T) => Promise<void>
  initialContent: T
}

export default function GridContentForm<
  T extends GridEventNoobProHacker | PlacementTest,
>({ action, initialContent }: Props<T>) {
  const {
    content,
    onContentInfoChange,
    onGridInfoChange,
    onGridImageUrlChange,
    onGridArchitectIdChange,
  } = useContentForm(initialContent)
  const { architects } = useArchitectsStore()
  const params = useParams()

  return (
    <form
      action={() =>
        action(
          !Boolean(params.episode)
            ? (convertGridContentArchitectId(architects, content) as T)
            : content,
        )
      }
      className="flex flex-col gap-8 p-8 max-w-[1920px] mx-auto"
    >
      <h1 className="text-2xl font-bold">
        {'type' in content ? '그리드 이벤트 눕프핵' : '배치고사'}
      </h1>
      <ContentInfo
        contentInfo={content.contentInfo}
        onContentInfoChange={onContentInfoChange}
      />
      <Divider />
      {'type' in content ? (
        <GridInfo
          entries={content.workInfo}
          onGridChange={onGridInfoChange}
          onGridImageUrlChange={onGridImageUrlChange}
          onGridArchitectIdChange={onGridArchitectIdChange}
        />
      ) : (
        <PlacementTestGridInfo
          entries={content.workInfo}
          onGridChange={onGridInfoChange}
        />
      )}
    </form>
  )
}
