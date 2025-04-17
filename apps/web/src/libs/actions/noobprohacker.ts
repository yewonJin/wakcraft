'use server'

import { connectMongo } from '@repo/database'
import { ContentInfo } from '@repo/types'

import NoobProHacker from '@/models/noobprohacker'
import {
  PopulatedLineInfo,
  PopulatedNoobProHackerDocument,
} from '@/types/content'

export const getLatestNoobProHacker = async () => {
  await connectMongo()

  const noobprohacker = await NoobProHacker.findLatest()
  const serialized = noobprohacker?.toJSON()

  if (!noobprohacker)
    return console.log('최근 눕프로해커 작품을 찾을 수 없습니다.')

  return serialized
}

export const getNoobProHacker = async (episode: number) => {
  await connectMongo()

  const noobprohacker = await NoobProHacker.findByEpisode(episode)
  const serialized = noobprohacker?.toJSON()

  return serialized
}

export const getNoobProHackers = async () => {
  await connectMongo()

  const noobprohackers = await NoobProHacker.find({})
  const serializeds = noobprohackers?.map((noobprohacker) =>
    noobprohacker.toJSON(),
  )
  return serializeds
}

export const getRecentNoobProHackers = async (length: number) => {
  await connectMongo()

  const noobprohackers = await NoobProHacker.findRecent(length)
  const serializeds = noobprohackers?.map((noobprohacker) =>
    noobprohacker.toJSON(),
  )

  return serializeds
}

export const getSweepLines = async () => {
  await connectMongo()

  const noobprohackers = await NoobProHacker.findAllWithSweepLine()
  const populated = (await NoobProHacker.populate(noobprohackers, {
    path: 'workInfo.entries.architectId',
    model: 'Architect',
    select: 'minecraftId wakzooId',
  })) as unknown as Promise<PopulatedNoobProHackerDocument>
  const serializeds = JSON.parse(JSON.stringify(populated))

  return serializeds as unknown as {
    contentInfo: ContentInfo
    workInfo: PopulatedLineInfo
  }[]
}
