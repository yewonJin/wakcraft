import { Model, model, models } from 'mongoose'

import { eventNoobProHackerSchema } from '@repo/schemas'
import { EventNoobProHackerDocument } from '@repo/types'

const EventNoobProHacker =
  (models[
    'EventNoobProHacker'
  ] as unknown as Model<EventNoobProHackerDocument>) ||
  model<EventNoobProHackerDocument, Model<EventNoobProHackerDocument>>(
    'EventNoobProHacker',
    eventNoobProHackerSchema,
  )

export default EventNoobProHacker
