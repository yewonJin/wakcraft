import { Schema, Model, model, models } from 'mongoose'

import { type EventNoobProHacker } from '@/types/content'
import { contentInfoSchema } from './content'

const eventNoobProHackerSchema = new Schema<EventNoobProHacker>({
  type: {
    type: String,
    enum: ['line', 'grid'],
    required: true,
  },
  contentInfo: contentInfoSchema,
  workInfo: [
    {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (this: EventNoobProHacker, value: any) {
          if (this.type === 'line') {
            return (
              Array.isArray(value) && value.every((item) => 'entries' in item)
            )
          }
          if (this.type === 'grid') {
            return (
              Array.isArray(value) && value.every((item) => 'order' in item)
            )
          }
          return false
        },
      },
    },
  ],
})

interface EventNoobProHackerModel extends Model<EventNoobProHacker> {}

const EventNoobProHacker =
  (models['EventNoobProHacker'] as EventNoobProHackerModel) ||
  model<EventNoobProHacker, EventNoobProHackerModel>(
    'EventNoobProHacker',
    eventNoobProHackerSchema,
  )

export default EventNoobProHacker
