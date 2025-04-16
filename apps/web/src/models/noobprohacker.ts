import { model, models, Model, Document } from 'mongoose'

import { noobprohackerSchema } from '@repo/schemas'
import { ContentInfo, LineInfo, type NoobProHacker } from '@repo/types'
import Architect from './architect'

type NoobProHackerDocument = Document<unknown, object, NoobProHacker> &
  NoobProHacker &
  Required<{ _id: string }>

interface NoobProHackerModel extends Model<NoobProHacker> {
  findLatest: () => Promise<NoobProHackerDocument | null>
  findByEpisode: (episode: number) => Promise<NoobProHackerDocument | null>
  findRecent: (length: number) => Promise<NoobProHackerDocument[] | null>
  findAllWithSweepLine: () => Promise<
    { contentInfo: ContentInfo; workInfo: LineInfo }[]
  >
}

const NoobProHacker =
  (models['NoobProHacker'] as unknown as NoobProHackerModel) ||
  model<NoobProHacker, NoobProHackerModel>('NoobProHacker', noobprohackerSchema)

NoobProHacker.findLatest = function () {
  return this.findOne()
    .sort({
      'contentInfo.episode': -1,
    })
    .populate({
      path: 'workInfo.entries.architectId',
      model: Architect as unknown as Model<Architect>,
      select: 'minecraftId wakzooId',
    })
}

NoobProHacker.findByEpisode = function (episode) {
  return this.findOne({ 'contentInfo.episode': episode }).populate({
    path: 'workInfo.entries.architectId',
    model: Architect as unknown as Model<Architect>,
    select: 'minecraftId wakzooId',
  })
}

NoobProHacker.findRecent = function (length) {
  return this.find({})
    .sort({ 'contentInfo.episode': -1 })
    .limit(length)
    .populate({
      path: 'workInfo.entries.architectId',
      model: Architect as unknown as Model<Architect>,
      select: 'minecraftId wakzooId',
    })
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
