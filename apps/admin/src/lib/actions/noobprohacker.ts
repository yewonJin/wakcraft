'use server'

import mongoose from 'mongoose'

import NoobProHacker from '@/models/noobprohacker'
import connectMongo from '../db'
import {
  convertNoobProHackerToPortfolioItems,
  hasEmptyArchitectId,
  hasEmptyEntryRanking,
  hasEmptyImageUrl,
  hasEmptyTitle,
} from '@/services/content'
import Architect from '@/models/architect'

export const getNoobProHackerLatestEpisode = async () => {
  await connectMongo()
  const noobprohacker = await NoobProHacker.findOne().sort({
    'contentInfo.episode': -1,
  })

  return noobprohacker?.contentInfo.episode || 0
}

export const postNoobProHacker = async (payload: NoobProHacker) => {
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

      // 건축가 포트폴리오에 반영
      for (const { _id, portfolioItem } of portfolioItems) {
        await Architect.pushToPortfolio(_id, portfolioItem)

        if (portfolioItem.ranking === 1 && portfolioItem.type === '프로') {
          await Architect.increaseProWin(_id)
        }

        if (portfolioItem.ranking === 1 && portfolioItem.type === '해커') {
          await Architect.increaseHackerWin(_id)
        }

        await Architect.increaseParticipation(_id)
      }

      console.log('눕프핵 추가 및 건축 포트폴리오 push 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}
