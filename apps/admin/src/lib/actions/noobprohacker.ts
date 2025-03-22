import NoobProHacker from '@/models/noobprohacker'
import connectMongo from '../db'

export const getNoobProHackerLatestEpisode = async () => {
  'use server'
  await connectMongo()
  const noobprohacker = await NoobProHacker.findOne().sort({
    'contentInfo.episode': -1,
  })

  return noobprohacker?.contentInfo.episode || 0
}
