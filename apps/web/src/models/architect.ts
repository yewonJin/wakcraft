import { Model, model, models } from 'mongoose'

import { architectSchema } from '@repo/schemas'
import { ArchitectDocument, type Architect } from '@repo/types'

interface ArchitectModel extends Model<ArchitectDocument> {
  findAllWithoutPortfolio: () => Promise<ArchitectDocument[]>
  findByArchitectId: (_id: string) => Promise<ArchitectDocument | null>
  findAllWithTier: () => Promise<
    Pick<ArchitectDocument, '_id' | 'wakzooId' | 'tier' | 'toJSON'>[]
  >
}

const Architect =
  (models['Architect'] as unknown as ArchitectModel) ||
  model<ArchitectDocument, ArchitectModel>('Architect', architectSchema)

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
