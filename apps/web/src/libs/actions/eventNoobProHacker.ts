'use server'

import { connectMongo } from '@repo/database'
import EventNoobProHacker from '@/models/eventNoobProHacker'
import { getArchitectIds, populateWakzooId } from '@/services/content'
import { getArchitectInfos } from './architect'

export const getEventNoobProHackers = async () => {
  await connectMongo()

  const eventNoobProHackers = (await EventNoobProHacker.find(
    {},
  ).lean()) as unknown as EventNoobProHacker[]
  return eventNoobProHackers
}

export const getEventNoobProHacker = async (episode: number) => {
  await connectMongo()

  const eventNoobProHacker = (await EventNoobProHacker.findOne({
    'contentInfo.episode': episode,
  }).lean()) as unknown as EventNoobProHacker

  if (!eventNoobProHacker) return null

  const architectIds = getArchitectIds(eventNoobProHacker.workInfo)
  const architectInfos = await getArchitectInfos(architectIds)

  return {
    ...eventNoobProHacker,
    workInfo: populateWakzooId(eventNoobProHacker.workInfo, architectInfos),
  }
}
