'use server'

import { getArchitectIds, populateWakzooId } from '@/services/content'
import { connectMongo } from '@repo/database'
import { getArchitectInfos } from './architect'
import PlacementTest from '@/models/placementTest'

export const getPlacementTests = async () => {
  await connectMongo()

  const placementTests = (await PlacementTest.find(
    {},
  ).lean()) as unknown as PlacementTest[]
  return placementTests
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
