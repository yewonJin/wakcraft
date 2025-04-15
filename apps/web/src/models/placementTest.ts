import { Document, Model, model, models } from 'mongoose'

import { placementTestSchema } from '@repo/schemas'
import { type PlacementTest } from '@repo/types'

type PlacementTestDocument = Document<unknown, object, PlacementTest> &
  PlacementTest &
  Required<{ _id: string }>

interface PlacementTestModel extends Model<PlacementTest> {
  findAllWithoutWorkInfo: () => Promise<PlacementTestDocument[]>
  findByEpisode: (episode: number) => Promise<PlacementTestDocument | null>
}

const PlacementTest =
  (models['PlacementTest'] as unknown as PlacementTestModel) ||
  model<PlacementTest, PlacementTestModel>('PlacementTest', placementTestSchema)

PlacementTest.findAllWithoutWorkInfo = function () {
  return this.find({}, { workInfo: 0 })
}

PlacementTest.findByEpisode = function (episode) {
  return this.findOne({
    'contentInfo.episode': episode,
  }).populate({
    path: 'workInfo.architectId',
    model: 'Architect',
    select: 'minecraftId wakzooId',
  })
}

export default PlacementTest
