import { Architect, PlacementTest } from '@repo/types'
import { Types } from 'mongoose'

export const mockPlacementTestsWithoutWorkInfo: Omit<
  PlacementTest,
  'workInfo'
>[] = [
  {
    contentInfo: {
      episode: 1,
      date: '2024-09-18',
      title: '',
      youtubeUrl: '',
      isTribute: false,
    },
  },
  {
    contentInfo: {
      episode: 2,
      date: '2024-03-20',
      title: '',
      youtubeUrl: '',
      isTribute: false,
    },
  },
  {
    contentInfo: {
      episode: 3,
      date: '2023-11-25',
      title: '',
      youtubeUrl: '',
      isTribute: false,
    },
  },
]

export const mockArchitectsWithTier: (Architect & {
  _id: Types.ObjectId
  __v: number
})[] = [
  {
    _id: new Types.ObjectId('6617e0beee8cabc123456789'),
    wakzooId: '건축가1',
    minecraftId: 'architect1',
    curTier: '해커',
    wakzooLink: '',
    statistics: { participation: 0, win: 0, hackerWin: 0, proWin: 0 },
    portfolio: [],
    __v: 1,
    tier: [
      { isPortfolioPlacementTest: false, result: '마카게', season: 1 },
      { isPortfolioPlacementTest: false, result: '오마카세', season: 2 },
    ],
  },
]
