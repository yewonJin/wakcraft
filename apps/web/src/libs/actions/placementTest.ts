'use server'

import PlacementTest from '@/models/placementTest'
import { getArchitectIds, populateWakzooId } from '@/services/content'
import { connectMongo } from '@repo/database'
import { getArchitectInfos } from './architect'

export const getPlacementTests = async () => {
  await connectMongo()

  const placementTests = (await PlacementTest.find(
    {},
  ).lean()) as unknown as PlacementTest[]
  return placementTests
}

export const getPlacementTest = async (episode: number) => {
  await connectMongo()

  const eventNoobProHacker = (await PlacementTest.findOne({
    'contentInfo.episode': episode,
  }).lean()) as unknown as PlacementTest

  if (!eventNoobProHacker) return null

  const architectIds = getArchitectIds(eventNoobProHacker.workInfo)
  const architectInfos = await getArchitectInfos(architectIds)

  return {
    ...eventNoobProHacker,
    workInfo: populateWakzooId(eventNoobProHacker.workInfo, architectInfos),
  }
}

export const getPlacementTestsWithoutWorkInfo = async () => {
  await connectMongo()

  const placementTests = await PlacementTest.find({}, { workInfo: 0 })
  return placementTests
}
