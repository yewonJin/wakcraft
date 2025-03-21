import { Schema } from 'mongoose'

import { ContentInfo, GridInfo, LineInfo } from '@/types/content'

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
      description: { type: String },
      minecraftId: { type: [String] },
      imageUrl: { type: String },
      youtubeUrl: { type: String, default: null },
      ranking: { type: Number },
    },
  ],
})

export const gridInfoSchema = new Schema<GridInfo>({
  order: { type: Number, required: true },
  description: { type: String },
  minecraftId: { type: [String] },
  imageUrl: { type: String },
  youtubeUrl: { type: String, default: null },
  ranking: { type: Number },
})
