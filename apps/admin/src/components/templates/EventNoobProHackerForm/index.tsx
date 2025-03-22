'use client'

import { Fragment } from 'react'

import LineContentForm from '@/components/organisms/LineContentForm'
import ContentSetting from '@/components/organisms/ContentSetting'
import GridContentForm from '@/components/organisms/GridContentForm'

import { useEventNoobProHacker } from '@/hooks/useEventNoobProHacker'

type Props = {
  nextEpisode: number
}

export default function EventNoobProHackerForm({ nextEpisode }: Props) {
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
        <LineContentForm initialContent={initialLineEventNoobProHacker} />
      ) : (
        <GridContentForm initialContent={intialGridEventNoobProHacker} />
      )}
    </Fragment>
  )
}
