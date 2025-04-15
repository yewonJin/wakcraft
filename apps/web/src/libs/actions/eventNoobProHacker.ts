'use server'

import { connectMongo } from '@repo/database'

import EventNoobProHacker from '@/models/eventNoobProHacker'

export const getEventNoobProHackers = async () => {
  await connectMongo()

  const eventNoobProHackers = (await EventNoobProHacker.find(
    {},
  ).lean()) as unknown as EventNoobProHacker[]
  return eventNoobProHackers
}

export const getEventNoobProHacker = async (episode: number) => {
  await connectMongo()

  const eventNoobProHacker = await EventNoobProHacker.findPopluatedOne(episode)
  const serialized = eventNoobProHacker?.toJSON()

  return serialized
}
