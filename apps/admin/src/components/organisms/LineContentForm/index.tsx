'use client'

import Divider from '@/components/atoms/Divider'
import ContentInfo from '@/components/molecules/ContentInfo'
import LineInfo from '@/components/molecules/LineInfo'

import { useContentForm } from '@/hooks/useContentForm'
import { convertLineContentArchitectId } from '@/services/content'
import { useArchitectsStore } from '@/store/architectStore'
import { LineEventNoobProHacker, type NoobProHacker } from '@/types/content'

// type : 추가 or 수정
// 추가 -> disabled : 유튜브 링크
// 수정 -> disabled : 작품명, 건축가, 순위, 라인 우승
type Props<T extends NoobProHacker | LineEventNoobProHacker> = {
  action: (payload: T) => Promise<void>
  initialContent: T
}

export default function LineContentForm<
  T extends NoobProHacker | LineEventNoobProHacker,
>({ action, initialContent }: Props<T>) {
  const {
    content,
    onContentInfoChange,
    onLineInfoChange,
    onEntryChange,
    onLineImageUrlChange,
    onLineArchitectIdChange,
  } = useContentForm(initialContent)
  const { architects } = useArchitectsStore()

  return (
    <form
      action={() =>
        action(convertLineContentArchitectId(architects, content) as T)
      }
      className="flex flex-col gap-8 p-8 max-w-[1920px] mx-auto"
    >
      <h1 className="text-2xl font-bold">
        {'type' in content ? '라인 이벤트 눕프핵' : '눕프로해커'}
      </h1>
      <ContentInfo
        contentInfo={content.contentInfo}
        onContentInfoChange={onContentInfoChange}
      />
      <Divider />
      <LineInfo
        lines={content.workInfo}
        onLineInfoChange={onLineInfoChange}
        onEntryChange={onEntryChange}
        onLineArchitectIdChange={onLineArchitectIdChange}
        onLineImageUrlChange={onLineImageUrlChange}
      />
    </form>
  )
}
