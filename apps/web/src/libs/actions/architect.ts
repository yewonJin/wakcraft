'use server'

import Architect from '@/models/architect'
import { connectMongo } from '@repo/database'

export const getArchitectsWithoutPortfolio = async () => {
  await connectMongo()

  const architects = await Architect.findAllWithoutPortfolio()
  const serializeds = architects.map((architect) => architect.toJSON())

  return serializeds
}

export const getArchitectById = async (id: string) => {
  await connectMongo()

  const architect = await Architect.findByArchitectId(id)
  const serialized = architect?.toJSON()
  return serialized
}

export const getArchitectByArchitectId = async (_id: string) => {
  await connectMongo()

  const architect = await Architect.findById(_id)
  const serialized = architect?.toJSON()

  return serialized
}

export const getArchitectsWithTier = async () => {
  await connectMongo()

  const architectTiers = await Architect.findAllWithTier()
  const serializeds = architectTiers.map((architect) => architect.toJSON())

  return serializeds
}
