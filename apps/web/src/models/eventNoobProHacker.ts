import { model, models, Model, Document } from 'mongoose'

import {
  eventNoobProHackerSchema,
  gridInfoSchema,
  lineInfoSchema,
} from '@repo/schemas'
import { type EventNoobProHacker } from '@repo/types'
import Architect from './architect'

type EventNoobProHackerDocument = Document<
  unknown,
  object,
  EventNoobProHacker
> &
  EventNoobProHacker &
  Required<{ _id: string }>

interface EventNoobProHackerModel extends Model<EventNoobProHacker> {
  findPopluatedOne: (
    episode: number,
  ) => Promise<EventNoobProHackerDocument | null>
}

const EventNoobProHacker =
  (models['EventNoobProHacker'] as unknown as EventNoobProHackerModel) ||
  model<EventNoobProHacker, EventNoobProHackerModel>(
    'EventNoobProHacker',
    eventNoobProHackerSchema,
  )

if (EventNoobProHacker.discriminators) {
  if (!EventNoobProHacker.discriminators['line']) {
    EventNoobProHacker.discriminator('line', lineInfoSchema)
  }

  if (!EventNoobProHacker.discriminators['grid']) {
    EventNoobProHacker.discriminator('grid', gridInfoSchema)
  }
}

EventNoobProHacker.findPopluatedOne = async function (episode) {
  const doc = await this.findOne({ 'contentInfo.episode': episode })

  if (!doc) return null

  return doc.type === 'line'
    ? doc.populate({
        path: 'workInfo.entries.architectId',
        model: Architect as unknown as Model<Architect>,
        select: 'minecraftId wakzooId',
        strictPopulate: false,
      })
    : doc.populate({
        path: 'workInfo.architectId',
        model: Architect as unknown as Model<Architect>,
        select: 'minecraftId wakzooId',
        strictPopulate: false,
      })
}

export default EventNoobProHacker
