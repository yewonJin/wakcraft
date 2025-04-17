'use server'

import mongoose from 'mongoose'
import { connectMongo } from '@repo/database'

import NoobProHacker from '@/models/noobprohacker'
import {
  convertNoobProHackerToPortfolioItems,
  hasEmptyArchitectId,
  hasEmptyEntryRanking,
  hasEmptyImageUrl,
  hasEmptyTitle,
  hasEmptyYoutubeUrl,
} from '@/services/content'
import {
  pushToArchitectsPortfolio,
  updateArchitectsPortfolio,
} from '../processors/architect'
import { NoobProHacker as TNoobProHacker } from '@repo/types'

export const getNoobProHacker = async (episode: number) => {
  await connectMongo()
  const noobprohacker = await NoobProHacker.findOne({
    'contentInfo.episode': episode,
  })

  return noobprohacker
}

export const getNoobProHackerLatestEpisode = async () => {
  await connectMongo()
  const noobprohacker = await NoobProHacker.findOne().sort({
    'contentInfo.episode': -1,
  })

  return noobprohacker?.contentInfo.episode || 0
}

export const postNoobProHacker = async (payload: TNoobProHacker) => {
  if (hasEmptyTitle(payload.workInfo)) {
    return console.log('작품명을 모두 입력해주세요')
  }

  if (hasEmptyImageUrl(payload.workInfo)) {
    return console.log('이미지를 모두 선택해 주세요.')
  }

  if (hasEmptyArchitectId(payload.workInfo)) {
    return console.log('건축가 ID를 모두 입력해주세요')
  }

  if (hasEmptyEntryRanking(payload.workInfo)) {
    return console.log('작품 랭킹을 모두 입력해주세요')
  }

  await connectMongo()
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      await NoobProHacker.create(payload)

      const portfolioItems = convertNoobProHackerToPortfolioItems(payload)
      await pushToArchitectsPortfolio(portfolioItems)

      console.log('눕프로해커 및 건축가 포트폴리오 추가 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}

export const updateNoobProHacker = async (payload: TNoobProHacker) => {
  if (hasEmptyYoutubeUrl(payload.workInfo)) {
    return console.log('유튜브 링크를 모두 입력해주세요')
  }

  await connectMongo()
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      await NoobProHacker.findOneAndUpdate(
        { 'contentInfo.episode': payload.contentInfo.episode },
        { $set: payload },
      )

      const portfolioItems = convertNoobProHackerToPortfolioItems(payload)
      await updateArchitectsPortfolio(portfolioItems)

      console.log('눕프로해커 및 건축가 포트폴리오 수정 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}
