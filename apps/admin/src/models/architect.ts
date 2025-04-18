import { Model, model, models } from 'mongoose'

import { architectSchema } from '@repo/schemas'
import { type Tier, type Architect, ArchitectDocument } from '@repo/types'
import { TIER_GROUP } from '@repo/constants'

interface ArchitectModel extends Model<ArchitectDocument> {
  updateWakzooId: (architectId: string, wakzooId: string) => Promise<void>
  updateCurTier: (architectId: string, tier: Tier) => Promise<void>
  updateSeasonTier: (
    architectId: string,
    season: number,
    tier: Tier,
  ) => Promise<void>
  setAllArchitectsTierToUnrankedForSeason: (season: number) => Promise<void>
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
    title: string,
    category: string,
    episode: number,
    youtubeUrl: string,
  ) => Promise<void>
  updatePortfolioDescription: (
    architectId: string,
    title: string,
    category: string,
    episode: number,
    description: string,
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

architectSchema.statics.updateSeasonTier = async function (
  architectId: string,
  season: number,
  tier: Tier,
) {
  await this.updateOne({ _id: architectId }, { $pop: { tier: 1 } })

  return this.updateOne(
    { _id: architectId },
    {
      $push: {
        tier: { season: season, isPortfolioPlacementTest: false, result: tier },
      },
      $set: { curTier: tier },
    },
  )
}

architectSchema.statics.setAllArchitectsTierToUnrankedForSeason = function (
  season,
) {
  return this.updateMany(
    {},
    {
      $push: {
        tier: {
          season: season,
          isPortfolioPlacementTest: false,
          result: '언랭',
        },
      },
    },
  )
}

architectSchema.statics.updateAllArchitectsTierToUnranked = function () {
  return this.updateMany(
    { curTier: { $nin: TIER_GROUP['눕'] } },
    {
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
  title: string,
  category: string,
  episode: number,
  youtubeUrl: string,
) {
  return this.findOneAndUpdate(
    {
      _id: architectId,
    },
    {
      $set: { 'portfolio.$[elem].youtubeUrl': youtubeUrl },
    },
    {
      arrayFilters: [
        {
          'elem.title': title,
          'elem.category': category,
          'elem.episode': episode,
        },
      ],
      new: true,
    },
  )
}

architectSchema.statics.updatePortfolioDescription = function (
  architectId: string,
  title: string,
  category: string,
  episode: number,
  description: string,
) {
  return this.findOneAndUpdate(
    {
      _id: architectId,
    },
    {
      $set: { 'portfolio.$[elem].description': description },
    },
    {
      arrayFilters: [
        {
          'elem.title': title,
          'elem.category': category,
          'elem.episode': episode,
        },
      ],
      new: true,
    },
  )
}

const Architect =
  (models['Architect'] as unknown as ArchitectModel) ||
  model<ArchitectDocument, ArchitectModel>('Architect', architectSchema)

export default Architect
