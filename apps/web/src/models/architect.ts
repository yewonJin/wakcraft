import { Document, Model, model, models } from 'mongoose'

import { architectSchema } from '@repo/schemas'
import { type Architect } from '@repo/types'

type ArchitectDocument = Document<unknown, object, Architect> &
  Architect &
  Required<{ _id: string }>

interface ArchitectModel extends Model<Architect> {
  findAllWithoutPortfolio: () => Promise<ArchitectDocument[]>
  findByArchitectId: (_id: string) => Promise<ArchitectDocument | null>
  findAllWithTier: () => Promise<
    Pick<ArchitectDocument, '_id' | 'wakzooId' | 'tier' | 'toJSON'>[]
  >
}

const Architect =
  (models['Architect'] as unknown as ArchitectModel) ||
  model<Architect, ArchitectModel>('Architect', architectSchema)

Architect.findAllWithoutPortfolio = function () {
  return this.find({}, { portfolio: 0 })
}

Architect.findByArchitectId = function (id) {
  return this.findOne({
    $or: [{ minecraftId: id }, { wakzooId: id }],
  })
}

Architect.findAllWithTier = function () {
  return this.find({}, { _id: 1, wakzooId: 1, tier: 1 })
}

export default Architect
