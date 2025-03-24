'use client'

import { Fragment } from 'react'

import LineContentForm from '@/components/organisms/LineContentForm'
import GridContentForm from '@/components/organisms/GridContentForm'

import { GridEventNoobProHacker, LineEventNoobProHacker } from '@/types/content'

type Props = {
  content: LineEventNoobProHacker | GridEventNoobProHacker
  actions: {
    line: (payload: LineEventNoobProHacker) => Promise<void>
    grid: (payload: GridEventNoobProHacker) => Promise<void>
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
