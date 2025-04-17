import { HydratedDocument } from 'mongoose'
import {
  GridEventNoobProHacker,
  GridInfo,
  LineEventNoobProHacker,
  LineInfo,
  NoobProHacker,
  PlacementTest,
} from '@repo/types'

type ArchitectId = {
  _id: string
  minecraftId: string
  wakzooId: string
}

type Replace<T, K extends keyof T, V> = Omit<T, K> & Record<K, V>

type LineEntry = LineInfo['entries'][number]
export type PopulatedLineEntry = Replace<
  LineEntry,
  'architectId',
  ArchitectId[]
>

export type PopulatedLineInfo = Replace<
  LineInfo,
  'entries',
  PopulatedLineEntry[]
>
export type PopulatedGridInfo = Replace<GridInfo, 'architectId', ArchitectId[]>

export type PopulatedNoobProHacker = Replace<
  NoobProHacker,
  'workInfo',
  PopulatedLineInfo[]
>

export type PopulatedLineEventNoobProHacker = Replace<
  LineEventNoobProHacker,
  'workInfo',
  PopulatedLineInfo[]
>

export type PopulatedGridEventNoobProHacker = Replace<
  GridEventNoobProHacker,
  'workInfo',
  PopulatedGridInfo[]
>

export type PopulatedEventNoobProHacker =
  | PopulatedLineEventNoobProHacker
  | PopulatedGridEventNoobProHacker

export type PopulatedPlacementTest = Replace<
  PlacementTest,
  'workInfo',
  PopulatedGridInfo[]
>

// Mongoose Document 타입
export type PopulatedNoobProHackerDocument =
  HydratedDocument<PopulatedNoobProHacker>

export type PopulatedEventNoobProHackerDocument =
  HydratedDocument<PopulatedEventNoobProHacker>

export type PopulatedLineEventNoobProHackerDocument =
  HydratedDocument<PopulatedLineEventNoobProHacker>

export type PopulatedGridEventNoobProHackerDocument =
  HydratedDocument<PopulatedGridEventNoobProHacker>

export type PopulatedPlacementTestDocument =
  HydratedDocument<PopulatedPlacementTest>
