import { Schema, Model, model, models } from 'mongoose'

import { type Architect } from '@/types/architect'
import { PortfolioItem } from '@/types/architect'
import { TIER } from '@/services/tier'

const PortfolioItemSchema = new Schema<PortfolioItem>({
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

const architectSchema = new Schema<Architect>({
  minecraftId: {
    type: String,
    required: true,
    unique: true,
  },
  wakzooId: { type: String, unique: true },
  tier: { type: [String], enum: TIER },
  curTier: { type: String, enum: TIER, default: '언랭' },
  wakzooLink: { type: String },
  statistics: {
    win: { type: Number, default: 0 },
    hackerWin: { type: Number, default: 0 },
    proWin: { type: Number, default: 0 },
    participation: { type: Number, default: 0 },
  },
  portfolio: { type: [PortfolioItemSchema], default: [] },
})

interface ArchitectModel extends Model<Architect> {}

const Architect =
  (models['Architect'] as ArchitectModel) ||
  model<Architect, ArchitectModel>('Architect', architectSchema)

export default Architect
