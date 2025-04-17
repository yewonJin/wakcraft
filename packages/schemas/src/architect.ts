import { Schema } from 'mongoose'

import { ArchitectDocument, PlacementTestTierInfoDoucment } from '@repo/types'
import { ALL_TIER, TIER } from '@repo/constants'
import { PortfolioItemSchema } from './shared'

const tierSchema = new Schema<PlacementTestTierInfoDoucment>({
  season: { type: Number },
  isPortfolioPlacementTest: { type: Boolean },
  result: { type: String, enum: ALL_TIER },
})

export const architectSchema = new Schema<ArchitectDocument>(
  {
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
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        // 메인 문서의 _id 처리
        ret._id = ret._id.toString()

        // tier 배열의 _id 처리
        if (ret.tier) {
          ret.tier = ret.tier.map((tier: any) => {
            if (tier._id) {
              tier._id = tier._id.toString()
            }
            return tier
          })
        }

        // portfolio 배열의 _id 처리
        if (ret.portfolio) {
          ret.portfolio = ret.portfolio.map((item: any) => {
            if (item._id) {
              item._id = item._id.toString()
            }
            return item
          })
        }

        return ret
      },
    },
  },
)
