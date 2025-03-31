import { Model, model, models } from 'mongoose'

import { noobprohackerSchema } from '@repo/schemas'
import { ContentInfo, LineInfo, type NoobProHacker } from '@repo/types'

interface NoobProHackerModel extends Model<NoobProHacker> {
  findAllWithSweepLine: () => Promise<
    {
      contentInfo: ContentInfo
      workInfo: LineInfo
    }[]
  >
}

noobprohackerSchema.statics.findAllWithSweepLine = function () {
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

const NoobProHacker =
  (models['NoobProHacker'] as NoobProHackerModel) ||
  model<NoobProHacker, NoobProHackerModel>('NoobProHacker', noobprohackerSchema)

export default NoobProHacker
