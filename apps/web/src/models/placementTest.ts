import { Model, model, models } from 'mongoose'

import { placementTestSchema } from '@repo/schemas'
import { PlacementTestDocument } from '@repo/types'
import Architect from './architect'
import { PopulatedPlacementTestDocument } from '@/types/content'

interface PlacementTestModel extends Model<PlacementTestDocument> {
  findAllWithoutWorkInfo: () => Promise<PlacementTestDocument[]>
  findByEpisode: (
    episode: number,
  ) => Promise<PopulatedPlacementTestDocument | null>
}

const PlacementTest =
  (models['PlacementTest'] as unknown as PlacementTestModel) ||
  model<PlacementTestDocument, PlacementTestModel>(
    'PlacementTest',
    placementTestSchema,
  )

PlacementTest.findAllWithoutWorkInfo = function () {
  return this.find({}, { workInfo: 0 })
}

PlacementTest.findByEpisode = function (episode) {
  return this.findOne({
    'contentInfo.episode': episode,
  }).populate({
    path: 'workInfo.architectId',
    model: Architect as unknown as Model<Architect>,
    select: 'minecraftId wakzooId',
  }) as unknown as Promise<PopulatedPlacementTestDocument | null>
}

export default PlacementTest
