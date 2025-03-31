import { Schema } from 'mongoose'

import { PortfolioItemSchema } from './shared'
import { Architect, PlacementTestTierInfo } from '@repo/types'
import { ALL_TIER, TIER } from '@repo/constants'

const tierSchema = new Schema<PlacementTestTierInfo>({
  season: { type: Number },
  isPortfolioPlacementTest: { type: Boolean },
  result: { type: String, enum: ALL_TIER },
})

export const architectSchema = new Schema<Architect>({
  minecraftId: {
    type: String,
    required: true,
    unique: true,
  },
  wakzooId: { type: String, unique: true },
  tier: { type: [tierSchema] },
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
