'use server'

import mongoose from 'mongoose'
import { connectMongo } from '@repo/database'
import {
  EventNoobProHackerMutation,
  GridEventNoobProHackerMutation,
  LineEventNoobProHackerMutation,
} from '@repo/types'

import EventNoobProHacker from '@/models/eventNoobProHacker'
import {
  convertGridEventNoobProHackerToPortfolioItems,
  convertLineEventNoobProHackerToPortfolioItems,
  hasEmptyArchitectId,
  hasEmptyImageUrl,
  hasEmptyTitle,
  hasEmptyYoutubeUrl,
} from '@/services/content'
import {
  pushToArchitectsPortfolio,
  updateArchitectsPortfolio,
} from '../processors/architect'

export const getEventNoobProHacker = async (episode: number) => {
  await connectMongo()
  const eventNoobProHacker = (await EventNoobProHacker.findOne({
    'contentInfo.episode': episode,
  })) as EventNoobProHackerMutation

  return eventNoobProHacker
}

export const getEventNoobProHackerLatestEpisode = async () => {
  await connectMongo()
  const eventNoobProHacker = await EventNoobProHacker.findOne().sort({
    'contentInfo.episode': -1,
  })

  return eventNoobProHacker?.contentInfo.episode || 0
}

export const postLineEventNoobProHacker = async (
  payload: LineEventNoobProHackerMutation,
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
      await pushToArchitectsPortfolio(portfolioItems)

      console.log('라인 이벤트 눕프핵 및 건축 포트폴리오 push 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}

export const postGridEventNoobProHacker = async (
  payload: GridEventNoobProHackerMutation,
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
      await pushToArchitectsPortfolio(portfolioItems)

      console.log('그리드 이벤트 눕프핵 및 건축가 포트폴리오 push 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}

export const updateLineEventNoobProHacker = async (
  payload: LineEventNoobProHackerMutation,
) => {
  if (hasEmptyYoutubeUrl(payload.workInfo)) {
    return console.log('유튜브 링크를 모두 입력해주세요')
  }

  await connectMongo()
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      await EventNoobProHacker.findOneAndUpdate(
        { 'contentInfo.episode': payload.contentInfo.episode },
        { $set: payload },
      )

      const portfolioItems =
        convertLineEventNoobProHackerToPortfolioItems(payload)
      await updateArchitectsPortfolio(portfolioItems)

      console.log('라인 이벤트 눕프핵 및 건축가 포트폴리오 수정 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}

export const updateGridEventNoobProHacker = async (
  payload: GridEventNoobProHackerMutation,
) => {
  if (hasEmptyYoutubeUrl(payload.workInfo)) {
    return console.log('유튜브 링크를 모두 입력해주세요')
  }

  await connectMongo()
  const session = await mongoose.startSession()

  try {
    await session.withTransaction(async () => {
      await EventNoobProHacker.findOneAndUpdate(
        { 'contentInfo.episode': payload.contentInfo.episode },
        { $set: payload },
      )

      const portfolioItems =
        convertGridEventNoobProHackerToPortfolioItems(payload)
      await updateArchitectsPortfolio(portfolioItems)

      console.log('그리드 이벤트 눕프핵 및 건축가 포트폴리오 수정 성공')
    })
  } catch (error) {
    console.log('트랜잭션 실패:', error)
  } finally {
    await session.endSession()
  }
}
