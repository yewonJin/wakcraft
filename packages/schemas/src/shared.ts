import { Schema } from 'mongoose'
import {
  ContentInfo,
  EventNoobProHacker,
  GridInfo,
  LineInfo,
  NoobProHacker,
  PlacementTest,
  PortfolioItem,
} from '@repo/types'

export const PortfolioItemSchema = new Schema<PortfolioItem>({
  type: { type: String },
  category: { type: String, required: true },
  episode: { type: Number, required: true },
  title: { type: String, required: true },
  ranking: { type: Number, default: null },
  imageUrl: { type: String, required: true },
  youtubeUrl: { type: String, default: null },
  date: { type: String, required: true },
  description: { type: String },
})

export const contentInfoSchema = new Schema<ContentInfo>({
  episode: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true, default: new Date().toISOString() },
  youtubeUrl: { type: String, default: null },
  isTribute: { type: Boolean },
})

export const lineInfoSchema = new Schema<LineInfo>({
  title: { type: String, required: true },
  ranking: { type: Number, default: 0 },
  entries: [
    {
      tier: { type: String, required: true },
      title: { type: String },
      description: { type: String },
      architectId: [{ type: Schema.Types.ObjectId, ref: 'Architect' }],
      imageUrl: { type: String },
      youtubeUrl: { type: String, default: null },
      ranking: { type: Number },
    },
  ],
})

export const gridInfoSchema = new Schema<GridInfo>({
  order: { type: Number, required: true },
  description: { type: String },
  architectId: [{ type: Schema.Types.ObjectId, ref: 'Architect' }],
  imageUrl: { type: String },
  title: { type: String },
  youtubeUrl: { type: String, default: null },
  ranking: { type: Number },
})

export const stringifyIds = <
  T extends NoobProHacker | EventNoobProHacker | PlacementTest,
>(
  ret: T,
): T => {
  if (ret._id) ret._id = ret._id.toString()
  if (ret.contentInfo) {
    ret.contentInfo._id = ret.contentInfo._id.toString()
  }
  if (ret.workInfo) {
    ret.workInfo = ret.workInfo.map((work) => {
      if (work._id) work._id = work._id.toString()
      if (work.entries) {
        work.entries = work.entries.map((entry) => {
          if (entry._id) entry._id = entry._id.toString()
          return entry
        })
      }
      return work
    })
  }
  return ret
}
