import { HydratedDocument } from 'mongoose'
import { CATEGORY } from '@repo/constants'

export type Category = (typeof CATEGORY)[number]

export type ArchitectId = {
  minecraftId: string
  wakzooId: string
}

export type ContentInfo = {
  episode: number
  title: string
  date: string
  youtubeUrl: string | null
  isTribute: boolean
}

// 여러 개의 라인에 작품이 3개 or 여러개 있는 형태
export type LineInfo = {
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

// 작품이 여러개 있는 형태
export type GridInfo = {
  order: number
  description: string | null
  title: string | null
  architectId: string[]
  imageUrl: string
  youtubeUrl: string | null
  ranking: number
}

export type NoobProHacker = {
  contentInfo: ContentInfo
  workInfo: LineInfo[]
}

export type EventNoobProHacker = LineEventNoobProHacker | GridEventNoobProHacker

export type LineEventNoobProHacker = {
  type: 'line'
  contentInfo: ContentInfo
  workInfo: LineInfo[]
}

export type GridEventNoobProHacker = {
  type: 'grid'
  contentInfo: ContentInfo
  workInfo: GridInfo[]
}

export type PlacementTest = {
  contentInfo: ContentInfo
  workInfo: GridInfo[]
}

// Mongoose Document 타입
export type ContentInfoDocument = HydratedDocument<ContentInfo>
export type LineInfoDocument = HydratedDocument<LineInfo>
export type GridInfoDocument = HydratedDocument<GridInfo>

export type NoobProHackerDocument = HydratedDocument<NoobProHacker>

export type LineEventNoobProHackerDocument =
  HydratedDocument<LineEventNoobProHacker>
export type GridEventNoobProHackerDocument =
  HydratedDocument<GridEventNoobProHacker>
export type EventNoobProHackerDocument =
  | LineEventNoobProHackerDocument
  | GridEventNoobProHackerDocument

export type PlacementTestDocument = HydratedDocument<PlacementTest>
