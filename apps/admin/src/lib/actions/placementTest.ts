import PlacementTest from '@/models/placementTest'
import connectMongo from '../db'

export const getPlacementTestLatestEpisode = async () => {
  'use server'
  await connectMongo()
  const placementTest = await PlacementTest.findOne().sort({
    'contentInfo.episode': -1,
  })

  return placementTest?.contentInfo.episode || 0
}
