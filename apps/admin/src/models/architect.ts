import { Schema, Model, model, models } from 'mongoose'

import { type Architect } from '@/types/architect'
import { PortfolioItem } from '@/types/architect'
import { Tier, TIER, TIER_LIST } from '@/services/tier'
import { Category } from '@/services/content'

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

interface ArchitectModel extends Model<Architect> {
  updateWakzooId: (architectId: string, wakzooId: string) => Promise<void>
  updateCurTier: (architectId: string, tier: Tier) => Promise<void>
  updateSeasonTier: (
    architectId: string,
    season: number,
    tier: Tier,
  ) => Promise<void>
  updateAllArchitectsTierToUnranked: () => Promise<void>
  increaseParticipation: (architectId: string) => Promise<void>
  increaseWin: (architectId: string) => Promise<void>
  increaseHackerWin: (architectId: string) => Promise<void>
  increaseProWin: (architectId: string) => Promise<void>
  pushToPortfolio: (
    architectId: string,
    payload: Architect['portfolio'][number],
  ) => Promise<void>
  updatePortfolioYoutubeUrl: (
    architectId: string,
    category: Category,
    episode: number,
    youtubeUrl: string,
  ) => Promise<void>
}

architectSchema.statics.updateCurTier = function (
  architectId: string,
  tier: Tier,
) {
  return this.findOneAndUpdate(
    { _id: architectId },
    { $set: { curTier: tier } },
  )
}

architectSchema.statics.updateSeasonTier = function (
  architectId: string,
  season: number,
  tier: Tier,
) {
  return this.updateOne(
    { _id: architectId },
    {
      $set: { [`tier.${season - 1}`]: tier },
    },
  )
}

architectSchema.statics.updateAllArchitectsTierToUnranked = function () {
  return this.updateMany(
    { tier: { $nin: TIER_LIST['눕'] } },
    {
      $push: { tier: '언랭' },
      $set: { curTier: '언랭' },
    },
  )
}

architectSchema.statics.updateWakzooId = function (
  architectId: string,
  wakzooId: string,
) {
  return this.findOneAndUpdate({ _id: architectId }, { $set: { wakzooId } })
}

architectSchema.statics.pushToPortfolio = function (
  architectId: string,
  payload: Architect['portfolio'][number],
) {
  return this.findOneAndUpdate(
    { _id: architectId },
    { $push: { portfolio: payload } },
  )
}

architectSchema.statics.increaseParticipation = function (architectId: string) {
  return this.findOneAndUpdate(
    { _id: architectId },
    {
      $inc: {
        'statistics.participation': 1,
      },
    },
  )
}

architectSchema.statics.increaseWin = function (architectId: string) {
  return this.findOneAndUpdate(
    { _id: architectId },
    {
      $inc: {
        'statistics.win': 1,
      },
    },
  )
}
architectSchema.statics.increaseHackerWin = function (architectId: string) {
  return this.findOneAndUpdate(
    { _id: architectId },
    {
      $inc: {
        'statistics.hackerWin': 1,
      },
    },
  )
}

architectSchema.statics.increaseProWin = function (architectId: string) {
  return this.findOneAndUpdate(
    { _id: architectId },
    {
      $inc: {
        'statistics.proWin': 1,
      },
    },
  )
}

architectSchema.statics.updatePortfolioYoutubeUrl = function (
  architectId: string,
  category: Category,
  episode: number,
  youtubeUrl: string,
) {
  return this.findOneAndUpdate(
    {
      _id: architectId,
      'portfolio.category': category,
      'portfolio.episode': episode,
    },
    {
      $set: { 'portfolio.$.youtubeUrl': youtubeUrl },
    },
  )
}

const Architect =
  (models['Architect'] as unknown as ArchitectModel) ||
  model<Architect, ArchitectModel>('Architect', architectSchema)

export default Architect
