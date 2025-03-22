import { useState } from 'react'

import {
  BASE_ENTRY_LENGTH,
  BASE_LINE_TIERS,
  BASE_WORKINFO_LENGTH,
  makeInitialGridEventNoobProHackerContent,
  makeInitialLineEventNoobProHackerContent,
} from '@/services/content'

export type InitialState = {
  type: null | 'line' | 'grid'
  workInfoLength: number
  entryLength: number
  lineTiers: string[]
}

// 기본 설정 값 한 곳에서 관리하고, import 해오면 좋을듯
const initialState: InitialState = {
  type: 'line',
  workInfoLength: BASE_WORKINFO_LENGTH,
  entryLength: BASE_ENTRY_LENGTH,
  lineTiers: BASE_LINE_TIERS,
}

export const useEventNoobProHacker = (nextEpisode: number) => {
  const [state, setState] = useState(initialState)
  const [isEnd, setIsEnd] = useState(false)

  const onStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'lineTiers') {
      const arr = value.split('-')
      setState((prev) => ({ ...prev, lineTiers: arr }))
      return
    }

    setState((prev) => ({
      ...prev,
      [name]: Number(value),
    }))
  }

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prev) => ({
      ...prev,
      ['type']: e.target.value as 'line' | 'grid',
    }))
  }

  const onButtonClick = () => {
    setIsEnd(true)
  }

  const initialLineEventNoobProHacker =
    makeInitialLineEventNoobProHackerContent(
      nextEpisode,
      state.workInfoLength,
      state.entryLength,
      state.lineTiers,
    )

  const intialGridEventNoobProHacker = makeInitialGridEventNoobProHackerContent(
    nextEpisode,
    state.workInfoLength,
  )

  return {
    state,
    isEnd,
    initialLineEventNoobProHacker,
    intialGridEventNoobProHacker,
    onStateChange,
    onSelectChange,
    onButtonClick,
  }
}
