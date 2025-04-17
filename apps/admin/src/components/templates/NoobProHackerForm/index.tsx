'use client'

import {
  BASE_ENTRY_LENGTH,
  BASE_LINE_TIERS,
  BASE_WORKINFO_LENGTH,
} from '@repo/constants'
import { NoobProHacker } from '@repo/types'

import LineContentForm from '@/components/organisms/LineContentForm'
import { makeInitialNoobProHackerContent } from '@/services/content'

type Props = {
  action: (payload: NoobProHacker) => Promise<void>
  content?: NoobProHacker
  nextEpisode: number
}

export default function NoobProHackerForm({
  action,
  content,
  nextEpisode,
}: Props) {
  const initialNoobProHacker = makeInitialNoobProHackerContent(
    nextEpisode,
    BASE_WORKINFO_LENGTH,
    BASE_ENTRY_LENGTH,
    BASE_LINE_TIERS,
  )

  return (
    <LineContentForm
      action={action}
      initialContent={content || initialNoobProHacker}
    />
  )
}
