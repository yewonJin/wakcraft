import { model, models } from 'mongoose'

import { noobprohackerSchema } from '@repo/schemas'
import { type NoobProHacker } from '@repo/types'

const NoobProHacker =
  models['NoobProHacker'] ||
  model<NoobProHacker>('NoobProHacker', noobprohackerSchema)

export default NoobProHacker
