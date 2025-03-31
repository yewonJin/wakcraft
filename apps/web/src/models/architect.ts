import { model, models } from 'mongoose'

import { architectSchema } from '@repo/schemas'
import { type Architect } from '@repo/types'

const Architect =
  models['Architect'] || model<Architect>('Architect', architectSchema)

export default Architect
