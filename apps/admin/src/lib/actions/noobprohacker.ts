'use server'

import mongoose from 'mongoose'
import { connectMongo } from '@repo/database'

import NoobProHacker from '@/models/noobprohacker'
import Architect from '@/models/architect'
import {
  convertNoobProHackerToPortfolioItems,
  hasEmptyArchitectId,
  hasEmptyEntryRanking,
  hasEmptyImageUrl,
  hasEmptyTitle,
  hasEmptyYoutubeUrl,
} from '@/services/content'

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

export const updateNoobProHacker = async (payload: NoobProHacker) => {
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

      // 건축가 포트폴리오에 반영
      for (const { _id, portfolioItem } of portfolioItems) {
        await Architect.updatePortfolioYoutubeUrl(
          _id,
          portfolioItem.category,
          portfolioItem.episode,
          portfolioItem.youtubeUrl as string,
        )
        await Architect.updatePortfolioDescription(
          _id,
          portfolioItem.category,
          portfolioItem.episode,
          portfolioItem.description as string,
        )
      }

      console.log('눕프핵 수정 및 건축 포트폴리오 수정 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}
