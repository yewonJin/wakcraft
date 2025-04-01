import { model, models } from 'mongoose'

import { eventNoobProHackerSchema } from '@repo/schemas'
import { type EventNoobProHacker } from '@repo/types'

const EventNoobProHacker =
  models['EventNoobProHacker'] ||
  model<EventNoobProHacker>('EventNoobProHacker', eventNoobProHackerSchema)

export default EventNoobProHacker
