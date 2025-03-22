import EventNoobProHacker from '@/models/eventNoobProHacker'
import connectMongo from '../db'

export const getEventNoobProHackerLatestEpisode = async () => {
  'use server'
  await connectMongo()
  const eventNoobProHacker = await EventNoobProHacker.findOne().sort({
    'contentInfo.episode': -1,
  })

  return eventNoobProHacker?.contentInfo.episode || 0
}
