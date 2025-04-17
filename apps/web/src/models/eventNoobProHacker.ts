import { model, models, Model } from 'mongoose'

import {
  eventNoobProHackerSchema,
  gridInfoSchema,
  lineInfoSchema,
} from '@repo/schemas'
import { EventNoobProHackerDocument } from '@repo/types'
import Architect from './architect'
import {
  PopulatedEventNoobProHackerDocument,
  PopulatedGridEventNoobProHackerDocument,
  PopulatedLineEventNoobProHackerDocument,
} from '@/types/content'

interface EventNoobProHackerModel extends Model<EventNoobProHackerDocument> {
  findPopluatedOne: (
    episode: number,
  ) => Promise<PopulatedEventNoobProHackerDocument | null>
}

const EventNoobProHacker =
  (models['EventNoobProHacker'] as unknown as EventNoobProHackerModel) ||
  model<EventNoobProHackerDocument, EventNoobProHackerModel>(
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
    ? (doc.populate({
        path: 'workInfo.entries.architectId',
        model: Architect as unknown as Model<Architect>,
        select: 'minecraftId wakzooId',
        strictPopulate: false,
      }) as unknown as Promise<PopulatedLineEventNoobProHackerDocument>)
    : (doc.populate({
        path: 'workInfo.architectId',
        model: Architect as unknown as Model<Architect>,
        select: 'minecraftId wakzooId',
        strictPopulate: false,
      }) as unknown as Promise<PopulatedGridEventNoobProHackerDocument>)
}

export default EventNoobProHacker
