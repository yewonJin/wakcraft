'use server'

import { connectMongo } from '@repo/database'

import PlacementTest from '@/models/placementTest'

export const getPlacementTests = async () => {
  await connectMongo()

  const placementTests = await PlacementTest.find({})
  const serializeds = placementTests.map((placementTest) =>
    placementTest.toJSON(),
  )

  return serializeds
}

export const getPlacementTest = async (episode: number) => {
  await connectMongo()

  const placementTest = await PlacementTest.findByEpisode(episode)
  const serialized = placementTest?.toJSON()

  if (!serialized) return null

  return serialized
}

export const getPlacementTestsWithoutWorkInfo = async () => {
  await connectMongo()

  const placementTests = await PlacementTest.findAllWithoutWorkInfo()
  const serializeds = placementTests.map((placementTest) =>
    placementTest.toJSON(),
  )

  return serializeds
}
