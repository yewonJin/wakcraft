import { Schema } from 'mongoose'

import { EventNoobProHacker, NoobProHacker, PlacementTest } from '@repo/types'
import {
  contentInfoSchema,
  lineInfoSchema,
  gridInfoSchema,
  stringifyIds,
} from './shared'

export const noobprohackerSchema = new Schema<NoobProHacker>(
  {
    contentInfo: contentInfoSchema,
    workInfo: [lineInfoSchema],
  },
  {
    virtuals: false,
    toJSON: {
      transform: (doc, ret) => stringifyIds(ret),
    },
  },
)

export const eventNoobProHackerSchema = new Schema<EventNoobProHacker>(
  {
    type: {
      type: String,
      enum: ['line', 'grid'],
      required: true,
    },
    contentInfo: contentInfoSchema,
  },
  {
    discriminatorKey: 'type',
    virtuals: false,
    toJSON: {
      transform: (doc, ret) => stringifyIds(ret),
    },
  },
)

export const placementTestSchema = new Schema<PlacementTest>(
  {
    contentInfo: contentInfoSchema,
    workInfo: [gridInfoSchema],
  },
  {
    virtuals: false,
    toJSON: {
      transform: (doc, ret) => stringifyIds(ret),
    },
  },
)
