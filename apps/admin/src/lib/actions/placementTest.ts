'use server'

import mongoose from 'mongoose'
import { connectMongo } from '@repo/database'
import { Tier } from '@repo/types'

import PlacementTest from '@/models/placementTest'
import Architect from '@/models/architect'
import { convertPlacementTestToPortfolioItems } from '@/services/content'

export const getPlacementTestLatestEpisode = async () => {
  await connectMongo()
  const placementTest = await PlacementTest.findOne().sort({
    'contentInfo.episode': -1,
  })

  return placementTest?.contentInfo.episode || 0
}

export const postPlacementTest = async (payload: PlacementTest) => {
  await connectMongo()
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      await PlacementTest.create(payload)

      const portfolioItems = convertPlacementTestToPortfolioItems(payload)

      // 눕을 제외한 모든 건축가의 티어 초기화 및 tier에 '언랭' push
      await Architect.updateAllArchitectsTierToUnranked()

      // 건축가 포트폴리오에 반영
      for (const { _id, portfolioItem } of portfolioItems) {
        await Architect.pushToPortfolio(_id, portfolioItem)
        await Architect.updateCurTier(_id, portfolioItem.title as Tier)
        await Architect.updateSeasonTier(
          _id,
          portfolioItem.episode,
          portfolioItem.title as Tier,
        )

        if (portfolioItem.ranking === 1) {
          await Architect.increaseWin(_id)
        }

        await Architect.increaseParticipation(_id)
      }

      console.log('배치고사 추가 및 건축 포트폴리오 push 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}
