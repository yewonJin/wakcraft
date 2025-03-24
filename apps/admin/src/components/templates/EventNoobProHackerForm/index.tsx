'use client'

import { Fragment } from 'react'

import LineContentForm from '@/components/organisms/LineContentForm'
import ContentSetting from '@/components/organisms/ContentSetting'
import GridContentForm from '@/components/organisms/GridContentForm'

import { useEventNoobProHacker } from '@/hooks/useEventNoobProHacker'
import { GridEventNoobProHacker, LineEventNoobProHacker } from '@/types/content'

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
    intialGridEventNoobProHacker,
  } = useEventNoobProHacker(nextEpisode)

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
          initialContent={intialGridEventNoobProHacker}
        />
      )}
    </Fragment>
  )
}
