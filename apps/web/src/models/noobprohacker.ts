import { model, models, Model } from 'mongoose'

import { noobprohackerSchema } from '@repo/schemas'
import { ContentInfo, LineInfo, NoobProHackerDocument } from '@repo/types'
import Architect from './architect'
import { PopulatedNoobProHackerDocument } from '@/types/content'

interface NoobProHackerModel extends Model<NoobProHackerDocument> {
  findLatest: () => Promise<PopulatedNoobProHackerDocument | null>
  findByEpisode: (
    episode: number,
  ) => Promise<PopulatedNoobProHackerDocument | null>
  findRecent: (
    length: number,
  ) => Promise<PopulatedNoobProHackerDocument[] | null>
  findAllWithSweepLine: () => Promise<
    { contentInfo: ContentInfo; workInfo: LineInfo }[]
  >
}

const NoobProHacker =
  (models['NoobProHacker'] as unknown as NoobProHackerModel) ||
  model<NoobProHackerDocument, NoobProHackerModel>(
    'NoobProHacker',
    noobprohackerSchema,
  )

NoobProHacker.findLatest = function () {
  return this.findOne()
    .sort({
      'contentInfo.episode': -1,
    })
    .populate({
      path: 'workInfo.entries.architectId',
      model: Architect as unknown as Model<Architect>,
      select: 'minecraftId wakzooId',
    }) as Promise<PopulatedNoobProHackerDocument | null>
}

NoobProHacker.findByEpisode = function (episode) {
  return this.findOne({ 'contentInfo.episode': episode }).populate({
    path: 'workInfo.entries.architectId',
    model: Architect as unknown as Model<Architect>,
    select: 'minecraftId wakzooId',
  }) as Promise<PopulatedNoobProHackerDocument | null>
}

NoobProHacker.findRecent = function (length) {
  return this.find({})
    .sort({ 'contentInfo.episode': -1 })
    .limit(length)
    .populate({
      path: 'workInfo.entries.architectId',
      model: Architect as unknown as Model<Architect>,
      select: 'minecraftId wakzooId',
    }) as unknown as Promise<PopulatedNoobProHackerDocument[] | null>
}

NoobProHacker.findAllWithSweepLine = function () {
  return this.aggregate([
    {
      $unwind: '$workInfo',
    },
    {
      $match: {
        $and: [
          {
            'workInfo.entries.1.ranking': 1,
          },
          {
            'workInfo.entries.2.ranking': 1,
          },
          {
            'workInfo.ranking': 1,
          },
        ],
      },
    },
  ])
}

export default NoobProHacker
