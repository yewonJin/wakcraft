import { Schema } from 'mongoose'

import {
  EventNoobProHackerDocument,
  NoobProHackerDocument,
  PlacementTestDocument,
} from '@repo/types'
import {
  contentInfoSchema,
  lineInfoSchema,
  gridInfoSchema,
  stringifyIds,
} from './shared'

export const noobprohackerSchema = new Schema<NoobProHackerDocument>(
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

export const eventNoobProHackerSchema = new Schema<EventNoobProHackerDocument>(
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

export const placementTestSchema = new Schema<PlacementTestDocument>(
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
