import { CATEGORY } from '@repo/constants'

export type Category = (typeof CATEGORY)[number]

export type ArchitectId = {
  _id: string
  minecraftId: string
  wakzooId: string
}

export type ContentInfo = {
  _id: string
  episode: number
  title: string
  date: string
  youtubeUrl: string | null
  isTribute: boolean
}

// 여러 개의 라인에 작품이 3개 or 여러개 있는 형태
export type LineInfo = {
  _id: string
  title: string
  ranking: number
  entries: {
    tier: string
    title: string
    description: string | null
    architectId: ArchitectId[]
    imageUrl: string
    youtubeUrl: string | null
    ranking: number
  }[]
}

// 작품이 여러개 있는 형태
export type GridInfo = {
  _id: string
  order: number
  description: string | null
  title: string | null
  architectId: ArchitectId[]
  imageUrl: string
  youtubeUrl: string | null
  ranking: number
}

export type NoobProHacker = {
  _id: string
  contentInfo: ContentInfo
  workInfo: LineInfo[]
}

export type EventNoobProHacker = LineEventNoobProHacker | GridEventNoobProHacker

export type LineEventNoobProHacker = {
  _id: string
  type: 'line'
  contentInfo: ContentInfo
  workInfo: LineInfo[]
}

export type GridEventNoobProHacker = {
  _id: string
  type: 'grid'
  contentInfo: ContentInfo
  workInfo: GridInfo[]
}

export type PlacementTest = {
  _id: string
  contentInfo: ContentInfo
  workInfo: GridInfo[]
}

// Mutation(create, update) 전용 타입
export type ContentInfoMutation = Omit<ContentInfo, '_id'>

export type LineInfoMutation = {
  title: string
  ranking: number
  entries: {
    tier: string
    title: string
    description: string | null
    architectId: string[]
    imageUrl: string
    youtubeUrl: string | null
    ranking: number
  }[]
}

export type GridInfoMutation = {
  order: number
  description: string | null
  title: string | null
  architectId: string[]
  imageUrl: string
  youtubeUrl: string | null
  ranking: number
}

export type NoobProHackerMutation = {
  contentInfo: Omit<ContentInfo, '_id'>
  workInfo: LineInfoMutation[]
}

export type EventNoobProHackerMutation =
  | LineEventNoobProHackerMutation
  | GridEventNoobProHackerMutation

export type LineEventNoobProHackerMutation = {
  type: 'line'
  contentInfo: Omit<ContentInfo, '_id'>
  workInfo: LineInfoMutation[]
}

export type GridEventNoobProHackerMutation = {
  type: 'grid'
  contentInfo: Omit<ContentInfo, '_id'>
  workInfo: GridInfoMutation[]
}

export type PlacementTestMutation = {
  contentInfo: Omit<ContentInfo, '_id'>
  workInfo: GridInfoMutation[]
}
