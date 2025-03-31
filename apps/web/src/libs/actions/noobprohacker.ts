'use server'

import NoobProHacker from '@/models/noobprohacker'
import { connectMongo } from '@repo/database'
import { getArchitectInfos } from './architect'
import { getArchitectIds, populateWakzooId } from '@/services/content'
import { LineInfo } from '@repo/types'

export const getLatestNoobProHacker = async () => {
  await connectMongo()

  const noobprohacker = (await NoobProHacker.findOne()
    .sort({
      'contentInfo.episode': -1,
    })
    .lean()) as unknown as NoobProHacker

  const architectIds = getArchitectIds(noobprohacker.workInfo)
  const architectInfos = await getArchitectInfos(architectIds)

  return {
    ...noobprohacker,
    workInfo: populateWakzooId(noobprohacker.workInfo, architectInfos),
  }
}

export const getNoobProHackers = async () => {
  await connectMongo()

  const noobprohackers = (await NoobProHacker.find(
    {},
  ).lean()) as unknown as NoobProHacker[]
  return noobprohackers
}

export const getRecentNoobProHackers = async (length: number) => {
  await connectMongo()

  const noobprohackers = (await NoobProHacker.find({})
    .sort({ 'contentInfo.episode': -1 })
    .limit(length)
    .lean()) as unknown as NoobProHacker[]

  return noobprohackers
}

export const getSweepLines = async () => {
  await connectMongo()

  const noobprohackers = await NoobProHacker.findAllWithSweepLine()
  return noobprohackers.map(
    (noobprohacker) => noobprohacker.workInfo,
  ) as LineInfo[]
}
