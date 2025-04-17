import { Model, model, models } from 'mongoose'

import { noobprohackerSchema } from '@repo/schemas'
import { NoobProHackerDocument } from '@repo/types'

const NoobProHacker =
  (models['NoobProHacker'] as unknown as Model<NoobProHackerDocument>) ||
  model<NoobProHackerDocument, Model<NoobProHackerDocument>>(
    'NoobProHacker',
    noobprohackerSchema,
  )

export default NoobProHacker
