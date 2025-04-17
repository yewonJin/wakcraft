import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import {
  convertNoobProHackerToPortfolioItems,
  makeInitialContentInfo,
} from '@/services/content'

import {
  BASE_ENTRY_LENGTH,
  BASE_LINE_TIERS,
  BASE_WORKINFO_LENGTH,
} from '@repo/constants'
import NoobProHacker from '@/models/noobprohacker'
import {
  pushToArchitectsPortfolio,
  updateArchitectsPortfolio,
} from '@/lib/processors/architect'
import Architect from '@/models/architect'
import { NoobProHacker as TNoobProHacker } from '@repo/types'

let mongoServer: MongoMemoryServer

describe('NoobProHacker Action', () => {
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

  it('눕프로해커 post 후 update까지 전체 흐름테스트', async () => {
    const architects = await Architect.find({})

    const getId = (minecraftId: string) => {
      return architects.find(
        (architect) => architect.minecraftId === minecraftId,
      )?._id
    }

    const mockPostContent: TNoobProHacker = {
      contentInfo: makeInitialContentInfo(12, '자유'),
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

    const mockPostAction = async (data: TNoobProHacker) => {
      await NoobProHacker.create(data)
      const portfolioItems = convertNoobProHackerToPortfolioItems(data)
      await pushToArchitectsPortfolio(portfolioItems)
    }

    await mockPostAction(mockPostContent)

    {
      const noobprohacker = await NoobProHacker.findOne({
        'contentInfo.episode': 12,
      })

      const architects = await Architect.find({})

      const participations = architects.map(
        (architect) => architect.statistics.participation,
      )
      const wins = architects.map((architect) => architect.statistics.win)
      const hackerWins = architects.map(
        (architect) => architect.statistics.hackerWin,
      )
      const proWins = architects.map((architect) => architect.statistics.proWin)
      const portfolios = architects.map(
        (architect) => architect.portfolio.length,
      )

      // 눕프로해커 create 확인
      expect(noobprohacker).not.toBeNull()

      // 건축가 컨텐츠 정보 증가 확인
      expect(participations.every((v) => v === 1)).toBe(true)
      expect(wins.filter((x) => x === 1).length).toBe(3)
      expect(hackerWins.filter((x) => x === 1).length).toBe(1)
      expect(proWins.filter((x) => x === 1).length).toBe(1)

      // 추가된 포트폴리오 개수 확인
      expect(portfolios.every((v) => v === 1)).toBe(true)
    }

    const mockUpdateContent = {
      contentInfo: {
        ...makeInitialContentInfo(12, '자유'),
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

    const mockUpdateAction = async (payload: TNoobProHacker) => {
      await NoobProHacker.findOneAndUpdate(
        { 'contentInfo.episode': payload.contentInfo.episode },
        { $set: payload },
      )
      const portfolioItems = convertNoobProHackerToPortfolioItems(payload)
      await updateArchitectsPortfolio(portfolioItems)
    }

    await mockUpdateAction(mockUpdateContent)

    {
      const noobprohacker = (await NoobProHacker.findOne({
        'contentInfo.episode': 12,
      })) as TNoobProHacker
      const architects = await Architect.find({})

      expect(noobprohacker.contentInfo.youtubeUrl).toBe('https://youtube.com')

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
