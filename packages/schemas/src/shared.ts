import { Schema } from 'mongoose'
import {
  ContentInfoDocument,
  GridInfoDocument,
  LineInfoDocument,
  PortfolioItemDocument,
} from '@repo/types'

export const PortfolioItemSchema = new Schema<PortfolioItemDocument>({
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

export const contentInfoSchema = new Schema<ContentInfoDocument>({
  episode: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true, default: new Date().toISOString() },
  youtubeUrl: { type: String, default: null },
  isTribute: { type: Boolean },
})

export const lineInfoSchema = new Schema<LineInfoDocument>({
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

export const gridInfoSchema = new Schema<GridInfoDocument>({
  order: { type: Number, required: true },
  description: { type: String },
  architectId: [{ type: Schema.Types.ObjectId, ref: 'Architect' }],
  imageUrl: { type: String },
  title: { type: String },
  youtubeUrl: { type: String, default: null },
  ranking: { type: Number },
})

export const stringifyIds = (ret: Record<string, any>): Record<string, any> => {
  if (ret._id) ret._id = ret._id.toString()
  if (ret.contentInfo) {
    ret.contentInfo._id = ret.contentInfo._id.toString()
  }
  if (ret.workInfo) {
    ret.workInfo = ret.workInfo.map((work: Record<string, any>) => {
      if (work._id) work._id = work._id.toString()
      if (work.entries) {
        work.entries = work.entries.map((entry: Record<string, any>) => {
          if (entry._id) entry._id = entry._id.toString()
          return entry
        })
      }
      return work
    })
  }
  return ret
}
