'use server'

import mongoose from 'mongoose'

import EventNoobProHacker from '@/models/eventNoobProHacker'
import connectMongo from '../db'
import { GridEventNoobProHacker, LineEventNoobProHacker } from '@/types/content'
import {
  convertGridEventNoobProHackerToPortfolioItems,
  convertLineEventNoobProHackerToPortfolioItems,
  hasEmptyArchitectId,
  hasEmptyImageUrl,
  hasEmptyTitle,
} from '@/services/content'
import Architect from '@/models/architect'

export const getEventNoobProHackerLatestEpisode = async () => {
  await connectMongo()
  const eventNoobProHacker = await EventNoobProHacker.findOne().sort({
    'contentInfo.episode': -1,
  })

  return eventNoobProHacker?.contentInfo.episode || 0
}

export const postLineEventNoobProHacker = async (
  payload: LineEventNoobProHacker,
) => {
  if (hasEmptyTitle(payload.workInfo)) {
    return console.log('작품명을 모두 입력해주세요')
  }

  if (hasEmptyImageUrl(payload.workInfo)) {
    return console.log('이미지를 모두 선택해 주세요.')
  }

  if (hasEmptyArchitectId(payload.workInfo)) {
    return console.log('건축가 ID를 모두 입력해주세요')
  }

  await connectMongo()
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      await EventNoobProHacker.create(payload)

      const portfolioItems =
        convertLineEventNoobProHackerToPortfolioItems(payload)

      // 건축가 포트폴리오에 반영
      for (const { _id, portfolioItem } of portfolioItems) {
        await Architect.pushToPortfolio(_id, portfolioItem)

        if (portfolioItem.ranking === 1) {
          await Architect.increaseWin(_id)
        }

        await Architect.increaseParticipation(_id)
      }

      console.log('라인 이벤트 눕프핵 추가 및 건축 포트폴리오 push 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}

export const postGridEventNoobProHacker = async (
  payload: GridEventNoobProHacker,
) => {
  if (hasEmptyTitle(payload.workInfo)) {
    return console.log('설명을 모두 입력해주세요')
  }

  if (hasEmptyImageUrl(payload.workInfo)) {
    return console.log('이미지를 모두 선택해 주세요.')
  }

  if (hasEmptyArchitectId(payload.workInfo)) {
    return console.log('건축가 ID를 모두 입력해주세요')
  }

  await connectMongo()
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      await EventNoobProHacker.create(payload)

      const portfolioItems =
        convertGridEventNoobProHackerToPortfolioItems(payload)

      // 건축가 포트폴리오에 반영
      for (const { _id, portfolioItem } of portfolioItems) {
        await Architect.pushToPortfolio(_id, portfolioItem)

        if (portfolioItem.ranking === 1) {
          await Architect.increaseWin(_id)
        }

        await Architect.increaseParticipation(_id)
      }

      console.log('그리드 이벤트 눕프핵 추가 및 건축 포트폴리오 push 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}
