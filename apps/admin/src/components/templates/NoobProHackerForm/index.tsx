'use client'

import LineContentForm from '@/components/organisms/LineContentForm'
import { postNoobProHacker } from '@/lib/actions/noobprohacker'
import {
  BASE_ENTRY_LENGTH,
  BASE_LINE_TIERS,
  BASE_WORKINFO_LENGTH,
  makeInitialNoobProHackerContent,
} from '@/services/content'

type Props = {
  nextEpisode: number
}

export default function NoobProHackerForm({ nextEpisode }: Props) {
  const initialNoobProHacker = makeInitialNoobProHackerContent(
    nextEpisode,
    BASE_WORKINFO_LENGTH,
    BASE_ENTRY_LENGTH,
    BASE_LINE_TIERS,
  )

  return (
    <LineContentForm
      action={postNoobProHacker}
      initialContent={initialNoobProHacker}
    />
  )
}
