'use client'

import { Fragment } from 'react'
import { GridEventNoobProHacker, LineEventNoobProHacker } from '@repo/types'

import {
  ContentSetting,
  LineContentForm,
  GridContentForm,
} from '@/components/organisms'
import { useEventNoobProHackerForm } from './EventNoobProHackerForm.hooks'

type Props = {
  actions: {
    line: (payload: LineEventNoobProHacker) => Promise<void>
    grid: (payload: GridEventNoobProHacker) => Promise<void>
  }
  nextEpisode: number
}

export default function EventNoobProHackerForm({
  actions,
  nextEpisode,
}: Props) {
  const {
    isEnd,
    state,
    onStateChange,
    onSelectChange,
    onButtonClick,
    initialLineEventNoobProHacker,
    initialGridEventNoobProHacker,
  } = useEventNoobProHackerForm(nextEpisode)

  if (!isEnd)
    return (
      <ContentSetting
        state={state}
        onStateChange={onStateChange}
        onSelectChange={onSelectChange}
        onButtonClick={onButtonClick}
      />
    )

  return (
    <Fragment>
      {state.type === 'line' ? (
        <LineContentForm
          action={actions.line}
          initialContent={initialLineEventNoobProHacker}
        />
      ) : (
        <GridContentForm
          action={actions.grid}
          initialContent={initialGridEventNoobProHacker}
        />
      )}
    </Fragment>
  )
}
