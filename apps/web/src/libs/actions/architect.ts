'use server'

import Architect from '@/models/architect'
import { connectMongo } from '@repo/database'

export const getArchitectsWithoutPortfolio = async () => {
  await connectMongo()

  const architects = await Architect.find({}, { portfolio: 0 })
  return architects
}

export const getArchitectById = async (id: string) => {
  await connectMongo()

  const architect = await Architect.findOne({
    $or: [{ minecraftId: id }, { wakzooId: id }],
  })
  return architect
}

export const getArchitectByArchitectId = async (architectId: string) => {
  await connectMongo()

  const architect = Architect.findOne({ _id: architectId })
  return architect
}

export const getArchitectInfos = async (architectIds: string[]) => {
  await connectMongo()

  const architectInfos = await Architect.find(
    { _id: { $in: architectIds } },
    { _id: 1, wakzooId: 1 },
  ).lean()
  return architectInfos
}

export const getArchitectsWithTier = async () => {
  await connectMongo()

  const architectTiers = await Architect.find(
    {},
    { _id: 1, wakzooId: 1, tier: 1 },
  )
  return architectTiers
}
