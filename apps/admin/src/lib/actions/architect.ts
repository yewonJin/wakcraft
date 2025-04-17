'use server'

import mongoose from 'mongoose'
import { connectMongo } from '@repo/database'

import Architect from '@/models/architect'
import { getPlacementTestLatestEpisode } from './placementTest'

export const getArchitectIds = async () => {
  await connectMongo()
  const architectIds = await Architect.find(
    {},
    'minecraftId wakzooId _id',
  ).lean()

  return architectIds
}

export const getArchitect = async (minecraftId: string) => {
  await connectMongo()
  const architect = await Architect.findOne({ minecraftId })
  return architect
}

export const addArchitect = async (formData: FormData) => {
  const minecraftId = formData.get('minecraftId') as string
  const wakzooId = formData.get('wakzooId') as string

  if (!minecraftId || !wakzooId)
    return console.log('아이디를 모두 입력해주세요')

  await connectMongo()
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      const season = await getPlacementTestLatestEpisode()

      await Architect.create({
        minecraftId,
        wakzooId,
        tier: Array.from({ length: season }, (_, i) => ({
          season: i + 1,
          isPortfolioPlacementTest: false,
          result: '언랭',
        })),
        curTier: '언랭',
      })

      console.log('건축가 추가 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}

export const updateArchitect = async (payload: Architect & { _id: string }) => {
  await connectMongo()
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      await Architect.updateOne(
        {
          _id: payload._id,
        },
        { $set: payload },
      )

      console.log('건축가 수정 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}
