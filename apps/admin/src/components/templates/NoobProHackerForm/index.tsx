'use client'

import LineContentForm from '@/components/organisms/LineContentForm'
import {
  BASE_ENTRY_LENGTH,
  BASE_LINE_TIERS,
  BASE_WORKINFO_LENGTH,
  makeInitialNoobProHackerContent,
} from '@/services/content'
import { NoobProHacker } from '@/types/content'

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
