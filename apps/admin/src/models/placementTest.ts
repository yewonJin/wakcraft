import { model, models } from 'mongoose'

import { placementTestSchema } from '@repo/schemas'
import { type PlacementTest } from '@repo/types'

const PlacementTest =
  models['PlacementTest'] ||
  model<PlacementTest>('PlacementTest', placementTestSchema)

export default PlacementTest
