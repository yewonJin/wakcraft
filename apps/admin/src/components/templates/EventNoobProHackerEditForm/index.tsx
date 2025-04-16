'use client'

import { Fragment } from 'react'
import {
  GridEventNoobProHackerMutation,
  LineEventNoobProHackerMutation,
} from '@repo/types'

import LineContentForm from '@/components/organisms/LineContentForm'
import GridContentForm from '@/components/organisms/GridContentForm'

type Props = {
  content: LineEventNoobProHackerMutation | GridEventNoobProHackerMutation
  actions: {
    line: (payload: LineEventNoobProHackerMutation) => Promise<void>
    grid: (payload: GridEventNoobProHackerMutation) => Promise<void>
  }
}

export default function EventNoobProHackerEditForm({
  content,
  actions,
}: Props) {
  return (
    <Fragment>
      {content.type === 'line' ? (
        <LineContentForm action={actions.line} initialContent={content} />
      ) : (
        <GridContentForm action={actions.grid} initialContent={content} />
      )}
    </Fragment>
  )
}
