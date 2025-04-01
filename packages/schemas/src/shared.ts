import { Schema } from 'mongoose'
import { ContentInfo, GridInfo, LineInfo, PortfolioItem } from '@repo/types'

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
      architectId: { type: [String] },
      imageUrl: { type: String },
      youtubeUrl: { type: String, default: null },
      ranking: { type: Number },
    },
  ],
})

export const gridInfoSchema = new Schema<GridInfo>({
  order: { type: Number, required: true },
  description: { type: String },
  architectId: { type: [String] },
  imageUrl: { type: String },
  title: { type: String },
  youtubeUrl: { type: String, default: null },
  ranking: { type: Number },
})
