import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import {
  convertGridEventNoobProHackerToPortfolioItems,
  convertLineEventNoobProHackerToPortfolioItems,
  makeInitialContentInfo,
} from '@/services/content'

import {
  BASE_ENTRY_LENGTH,
  BASE_LINE_TIERS,
  BASE_WORKINFO_LENGTH,
} from '@repo/constants'
import {
  pushToArchitectsPortfolio,
  updateArchitectsPortfolio,
} from '@/lib/processors/architect'
import Architect from '@/models/architect'
import { GridEventNoobProHacker, LineEventNoobProHacker } from '@repo/types'
import EventNoobProHacker from '@/models/eventNoobProHacker'

let mongoServer: MongoMemoryServer

describe('LineEventNoobProHacker Action', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)

    // 미리 건축가들 생성
    for (let i = 0; i < BASE_WORKINFO_LENGTH; i++) {
      for (let j = 0; j < BASE_ENTRY_LENGTH; j++) {
        await Architect.create({
          minecraftId: `architect_${i}_${j}`,
          wakzooId: `건축가_${i}_${j}`,
        })
      }
    }
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  it('라인 이벤트 눕프로해커 post 후 update까지 전체 흐름테스트', async () => {
    const architects = await Architect.find({})

    const getId = (minecraftId: string) => {
      return architects.find(
        (architect) => architect.minecraftId === minecraftId,
      )?._id
    }

    const mockPostContent: LineEventNoobProHacker = {
      type: 'line',
      contentInfo: makeInitialContentInfo(1, '이벤트 눕프핵'),
      workInfo: Array.from({ length: BASE_WORKINFO_LENGTH }, (_, i1) => ({
        title: `${i1} 작품`,
        ranking: 0,
        entries: Array.from({ length: BASE_ENTRY_LENGTH }, (_, i2) => ({
          architectId: [`${getId(`architect_${i1}_${i2}`)}`],
          tier: BASE_LINE_TIERS[i2],
          title: '',
          description: '',
          imageUrl: 'https://example.com/image1.jpg',
          youtubeUrl: '',
          ranking: i1 + 1,
        })),
      })),
    }

    const mockPostAction = async (data: LineEventNoobProHacker) => {
      await EventNoobProHacker.create(data)
      const portfolioItems = convertLineEventNoobProHackerToPortfolioItems(data)
      await pushToArchitectsPortfolio(portfolioItems)
    }

    await mockPostAction(mockPostContent)

    {
      const eventNoobProHacker = await EventNoobProHacker.findOne({
        'contentInfo.episode': 1,
      })
      const architects = await Architect.find({})

      const participations = architects.map(
        (architect) => architect.statistics.participation,
      )
      const wins = architects.map((architect) => architect.statistics.win)
      const portfolios = architects.map(
        (architect) => architect.portfolio.length,
      )

      // 눕프로해커 create 확인
      expect(eventNoobProHacker).not.toBeNull()

      // 건축가 컨텐츠 정보 증가 확인
      expect(participations.every((v) => v === 1)).toBe(true)
      expect(wins.filter((x) => x === 1).length).toBe(3)

      // 추가된 포트폴리오 개수 확인
      expect(portfolios.every((v) => v === 1)).toBe(true)
    }

    const mockUpdateContent: LineEventNoobProHacker = {
      type: 'line',
      contentInfo: {
        ...makeInitialContentInfo(1, '이벤트 눕프핵'),
        youtubeUrl: 'https://youtube.com',
      },
      workInfo: Array.from({ length: BASE_WORKINFO_LENGTH }, (_, i1) => ({
        title: `${i1} 작품`,
        ranking: 0,
        entries: Array.from({ length: BASE_ENTRY_LENGTH }, (_, i2) => ({
          architectId: [`${getId(`architect_${i1}_${i2}`)}`],
          tier: BASE_LINE_TIERS[i2],
          title: '',
          description: '테스트입니다.',
          imageUrl: 'https://example.com/image1.jpg',
          youtubeUrl: 'https://youtube.com',
          ranking: i1 + 1,
        })),
      })),
    }

    const mockUpdateAction = async (data: LineEventNoobProHacker) => {
      await EventNoobProHacker.findOneAndUpdate(
        { 'contentInfo.episode': data.contentInfo.episode },
        { $set: data },
      )
      const portfolioItems = convertLineEventNoobProHackerToPortfolioItems(data)
      await updateArchitectsPortfolio(portfolioItems)
    }

    await mockUpdateAction(mockUpdateContent)

    {
      const eventNoobProHacker = await EventNoobProHacker.findOne({
        'contentInfo.episode': 1,
      })
      const architects = await Architect.find({})

      expect(eventNoobProHacker!.contentInfo.youtubeUrl).toBe(
        'https://youtube.com',
      )

      // 건축가 포트폴리오 유튜브 URL 업데이트
      expect(
        architects.every(
          (x) => x.portfolio[0].youtubeUrl === 'https://youtube.com',
        ),
      ).toBe(true)

      // 건축가 포트폴리오 추가 설명 업데이트
      expect(
        architects.every((x) => x.portfolio[0].description === '테스트입니다.'),
      ).toBe(true)
    }
  })
})

describe('GridEventNoobProHacker Action', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)

    // 미리 건축가들 생성
    for (let i = 0; i < 12; i++) {
      await Architect.create({
        minecraftId: `architect_${i}`,
        wakzooId: `건축가_${i}`,
      })
    }
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  it('그리드 이벤트 눕프로해커 post 후 update까지 전체 흐름테스트', async () => {
    const architects = await Architect.find({})

    const getId = (minecraftId: string) => {
      return architects.find(
        (architect) => architect.minecraftId === minecraftId,
      )?._id
    }

    const mockPostContent: GridEventNoobProHacker = {
      type: 'grid',
      contentInfo: makeInitialContentInfo(1, '이벤트 눕프핵'),
      workInfo: Array.from({ length: 12 }, (_, i1) => ({
        order: i1,
        title: `${i1} 작품`,
        ranking: i1 + 1,
        architectId: [`${getId(`architect_${i1}`)}`],
        description: '',
        imageUrl: 'https://example.com/image1.jpg',
        youtubeUrl: '',
      })),
    }

    const mockPostAction = async (data: GridEventNoobProHacker) => {
      await EventNoobProHacker.create(data)
      const portfolioItems = convertGridEventNoobProHackerToPortfolioItems(data)
      await pushToArchitectsPortfolio(portfolioItems)
    }

    await mockPostAction(mockPostContent)

    {
      const eventNoobProHacker = await EventNoobProHacker.findOne({
        'contentInfo.episode': 1,
      })
      const architects = await Architect.find({})

      const participations = architects.map(
        (architect) => architect.statistics.participation,
      )
      const wins = architects.map((architect) => architect.statistics.win)
      const portfolios = architects.map(
        (architect) => architect.portfolio.length,
      )

      // 눕프로해커 create 확인
      expect(eventNoobProHacker).not.toBeNull()

      // 건축가 컨텐츠 정보 증가 확인
      expect(participations.every((v) => v === 1)).toBe(true)
      expect(wins.filter((x) => x === 1).length).toBe(1)

      // 추가된 포트폴리오 개수 확인
      expect(portfolios.every((v) => v === 1)).toBe(true)
    }

    const mockUpdateContent: GridEventNoobProHacker = {
      type: 'grid',
      contentInfo: {
        ...makeInitialContentInfo(1, '이벤트 눕프핵'),
        youtubeUrl: 'https://youtube.com',
      },
      workInfo: Array.from({ length: 12 }, (_, i1) => ({
        order: i1,
        title: `${i1} 작품`,
        ranking: i1 + 1,
        architectId: [`${getId(`architect_${i1}`)}`],
        description: '테스트입니다.',
        imageUrl: 'https://example.com/image1.jpg',
        youtubeUrl: 'https://youtube.com',
      })),
    }

    const mockUpdateAction = async (data: GridEventNoobProHacker) => {
      await EventNoobProHacker.findOneAndUpdate(
        { 'contentInfo.episode': data.contentInfo.episode },
        { $set: data },
      )
      const portfolioItems = convertGridEventNoobProHackerToPortfolioItems(data)
      await updateArchitectsPortfolio(portfolioItems)
    }

    await mockUpdateAction(mockUpdateContent)

    {
      const eventNoobProHacker = await EventNoobProHacker.findOne({
        'contentInfo.episode': 1,
      })
      const architects = await Architect.find({})

      expect(eventNoobProHacker!.contentInfo.youtubeUrl).toBe(
        'https://youtube.com',
      )

      // 건축가 포트폴리오 유튜브 URL 업데이트
      expect(
        architects.every(
          (x) => x.portfolio[0].youtubeUrl === 'https://youtube.com',
        ),
      ).toBe(true)

      // 건축가 포트폴리오 추가 설명 업데이트
      expect(
        architects.every((x) => x.portfolio[0].description === '테스트입니다.'),
      ).toBe(true)
    }
  })
})
