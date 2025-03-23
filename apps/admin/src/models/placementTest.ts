import { Schema, Model, model, models } from 'mongoose'

import { type PlacementTest } from '@/types/content'
import { contentInfoSchema, gridInfoSchema } from './content'

const placementTestSchema = new Schema<PlacementTest>({
  contentInfo: contentInfoSchema,
  workInfo: [gridInfoSchema],
})

interface PlacementTestModel extends Model<PlacementTest> {}

const PlacementTest =
  (models['PlacementTest'] as PlacementTestModel) ||
  model<PlacementTest, PlacementTestModel>('PlacementTest', placementTestSchema)

export default PlacementTest
