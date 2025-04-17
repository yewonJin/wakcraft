import { Model, model, models } from 'mongoose'

import { placementTestSchema } from '@repo/schemas'
import { PlacementTestDocument } from '@repo/types'

const PlacementTest =
  (models['PlacementTest'] as unknown as Model<PlacementTestDocument>) ||
  model<PlacementTestDocument, Model<PlacementTestDocument>>(
    'PlacementTest',
    placementTestSchema,
  )

export default PlacementTest
