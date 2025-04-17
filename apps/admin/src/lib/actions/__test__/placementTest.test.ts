import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { TIER } from '@repo/constants'

import Architect from '@/models/architect'
import { PlacementTest as TPlacementTest } from '@repo/types'
import PlacementTest from '@/models/placementTest'
import {
  convertPlacementTestToPortfolioItems,
  makeInitialContentInfo,
} from '@/services/content'
import {
  pushToArchitectsPortfolio,
  updateArchitectsTier,
} from '@/lib/processors/architect'

let mongoServer: MongoMemoryServer

describe('PlacementTest Action', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)

    // 미리 건축가들 생성
    for (let i = 0; i < 16; i++) {
      await Architect.create({
        curTier: '프로',
        minecraftId: `architect_${i}`,
        wakzooId: `건축가_${i}`,
      })
    }

    for (let i = 16; i < 20; i++) {
      await Architect.create({
        curTier: '퓨어 눕',
        minecraftId: `architect_${i}`,
        wakzooId: `건축가_${i}`,
      })
    }
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  it('배치고사 post 테스트', async () => {
    const architects = await Architect.find({})

    const getId = (minecraftId: string) => {
      return architects
        .find((architect) => architect.minecraftId === minecraftId)
        ?._id.toString()
    }

    const mockPostContent: TPlacementTest = {
      contentInfo: makeInitialContentInfo(1, '배치고사'),
      workInfo: Array.from({ length: TIER.length - 1 }, (_, i1) => ({
        order: i1,
        title: TIER[i1],
        ranking: i1 + 1,
        architectId: [`${getId(`architect_${i1}`)}`],
        description: '',
        imageUrl: 'https://example.com/image1.jpg',
        youtubeUrl: '',
      })),
    }

    const mockPostAction = async (payload: TPlacementTest) => {
      await PlacementTest.create(payload)
      const portfolioItems = convertPlacementTestToPortfolioItems(payload)

      await Architect.setAllArchitectsTierToUnrankedForSeason(
        payload.contentInfo.episode,
      )
      await Architect.updateAllArchitectsTierToUnranked()

      await pushToArchitectsPortfolio(portfolioItems)
      await updateArchitectsTier(portfolioItems)
    }

    await mockPostAction(mockPostContent)

    {
      const placementTest = await PlacementTest.findOne({
        'contentInfo.episode': 1,
      }).lean()
      const architects = await Architect.find({})

      expect(placementTest).not.toBeNull()

      expect(
        architects.filter((architect) => architect.curTier === '언랭').length,
      ).toBe(5)
      expect(
        architects.filter((architect) => architect.curTier === '퓨어 눕')
          .length,
      ).toBe(5)
    }
  })
})
