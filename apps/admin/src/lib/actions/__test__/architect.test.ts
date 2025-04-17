import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { pushToArchitectsPortfolio } from '@/lib/processors/architect'
import { Architect as TArchitect, PortfolioItem } from '@repo/types'
import Architect from '@/models/architect'

let mongoServer: MongoMemoryServer

describe('Architect Action', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
  })

  beforeEach(async () => {
    await Architect.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  const mockPostAction = async (minecraftId: string, wakzooId: string) => {
    await Architect.create({
      minecraftId,
      wakzooId,
      tier: Array.from({ length: 7 }, (_, i) => ({
        season: i + 1,
        isPortfolioPlacementTest: false,
        result: '언랭',
      })),
      curTier: '언랭',
    })
  }

  it('건축가 추가 테스트', async () => {
    await mockPostAction('architect_1', '건축가_1')
    await mockPostAction('architect_2', '건축가_2')
    await mockPostAction('architect_3', '건축가_3')

    const architects = await Architect.find({})

    expect(architects.length).toBe(3)
  })

  it('건축가 수정 테스트', async () => {
    const mockPortfolioItem: PortfolioItem = {
      type: '해커',
      category: '눕프로해커',
      episode: 7,
      date: '2025-03-17T00:00:00.000Z',
      title: '작품 제목',
      ranking: 1,
      imageUrl: 'imageUrl',
      youtubeUrl: 'youtubeUrl',
      description: '',
    }

    await mockPostAction('architect_1', '건축가_1')
    const architect = await Architect.findOne({
      minecraftId: 'architect_1',
    }).lean()
    await pushToArchitectsPortfolio([
      { _id: architect!._id.toString(), portfolioItem: mockPortfolioItem },
    ])

    const mockUpdatedPortfolioItem: PortfolioItem = {
      type: '해커',
      category: '눕프로해커',
      episode: 7,
      date: '2025-03-17T00:00:00.000Z',
      title: '작품 제목',
      ranking: 1,
      imageUrl: 'imageUrl',
      youtubeUrl: 'youtubeUrl2',
      description: 'description',
    }

    if (!architect) return

    const updatePayload: TArchitect = {
      ...architect,
      minecraftId: 'architect_2',
      wakzooId: '건축가_2',
      curTier: '해장국',
      portfolio: [
        ...architect!.portfolio,
        (architect!.portfolio[0] = mockUpdatedPortfolioItem),
      ],
    }

    const mockUpdateAction = async (data: TArchitect) => {
      await Architect.updateOne({ _id: architect._id }, { $set: data })
    }

    await mockUpdateAction(updatePayload)

    {
      const architect = await Architect.findOne({ minecraftId: 'architect_2' })

      expect(architect?.minecraftId).toBe('architect_2')
      expect(architect?.wakzooId).toBe('건축가_2')
      expect(architect?.curTier).toBe('해장국')
      expect(architect?.portfolio[0].youtubeUrl).toBe('youtubeUrl2')
      expect(architect?.portfolio[0].description).toBe('description')
    }
  })
})
