import {
  GridEventNoobProHacker,
  GridInfo,
  LineEventNoobProHacker,
  LineInfo,
  NoobProHacker,
} from '@/types/content'

// 상수
export const CATEGORY = ['눕프로해커', '예능 눕프핵', '배치고사'] as const
export const BASE_WORKINFO_LENGTH = 6 as const
export const BASE_ENTRY_LENGTH = 3 as const
export const BASE_LINE_TIERS = ['눕', '프로', '해커']

// 타입
export type Category = (typeof CATEGORY)[number]

// 함수
export const makeInitialNoobProHackerContent = (
  nextEpisode: number,
  workInfoLength: number,
  entryLength: number,
  tiers: string[],
) => {
  const noobprohacker: NoobProHacker = {
    contentInfo: {
      episode: nextEpisode,
      date: new Date().toISOString().split('T')[0],
      title: '자유',
      youtubeUrl: null,
    },
    workInfo: Array.from({ length: workInfoLength }, () =>
      makeInitialLineInfo(entryLength, tiers),
    ),
  }

  return noobprohacker
}

export const makeInitialLineEventNoobProHackerContent = (
  nextEpisode: number,
  workInfoLength: number,
  entryLength: number,
  tiers: string[],
) => {
  const lineEventNoobProHacker: LineEventNoobProHacker = {
    type: 'line',
    contentInfo: {
      episode: nextEpisode,
      date: new Date().toISOString().split('T')[0],
      title: '',
      youtubeUrl: null,
    },
    workInfo: Array.from({ length: workInfoLength }, () =>
      makeInitialLineInfo(entryLength, tiers),
    ),
  }

  return lineEventNoobProHacker
}

export const makeInitialGridEventNoobProHackerContent = (
  nextEpisode: number,
  workInfoLength: number,
) => {
  const gridEventNoobProHacker: GridEventNoobProHacker = {
    type: 'grid',
    contentInfo: {
      episode: nextEpisode,
      date: new Date().toISOString().split('T')[0],
      title: '',
      youtubeUrl: null,
    },
    workInfo: Array.from({ length: workInfoLength }, () =>
      makeInitialGridInfo(),
    ),
  }

  return gridEventNoobProHacker
}

export const makeInitialLineInfo = (entryLength: number, tiers: string[]) => {
  const lineInfo: LineInfo = {
    title: '',
    ranking: 0,
    entries: Array.from({ length: entryLength }, (_, i) =>
      makeInitialEntry(tiers[i]),
    ),
  }

  return lineInfo
}

export const makeInitialEntry = (tier: string) => {
  const entry: LineInfo['entries'][number] = {
    tier: tier,
    description: '',
    minecraftId: [],
    imageUrl: '',
    youtubeUrl: null,
    ranking: 0,
  }

  return entry
}

export const makeInitialGridInfo = () => {
  const gridInfo: GridInfo = {
    order: 0,
    description: '',
    minecraftId: [],
    imageUrl: '',
    youtubeUrl: null,
    ranking: 0,
  }

  return gridInfo
}
