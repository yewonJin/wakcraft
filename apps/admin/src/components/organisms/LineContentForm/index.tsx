'use client'

import { useParams } from 'next/navigation'
import { LineEventNoobProHacker, NoobProHacker } from '@repo/types'

import Divider from '@/components/atoms/Divider'
import ContentInfo from '@/components/molecules/ContentInfo'
import LineInfo from '@/components/molecules/LineInfo'

import { useContentForm } from '@/hooks/useContentForm'
import { convertLineContentArchitectId } from '@/services/content'
import { useArchitectsStore } from '@/store/architectStore'

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
  const params = useParams()

  return (
    <form
      action={() =>
        action(
          !Boolean(params.episode)
            ? (convertLineContentArchitectId(architects, content) as T)
            : content,
        )
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
