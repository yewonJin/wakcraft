import { AllTier, Tier } from './tier'

export type Architect = {
  _id: string
  minecraftId: string
  wakzooId: string
  tier: PlacementTestTierInfo[]
  curTier: Tier
  wakzooLink: string
  statistics: {
    win: number
    hackerWin: number
    proWin: number
    participation: number
  }
  portfolio: PortfolioItem[]
}

export type PlacementTestTierInfo = {
  season: number
  isPortfolioPlacementTest: boolean
  result: AllTier
}

export type PortfolioItem = {
  _id: string
  type: string | null
  category: string
  episode: number
  title: string | null
  ranking: number | null
  imageUrl: string
  youtubeUrl: string | null
  date: string
  description: string | null
}

export interface SearchedArchitect extends Architect {
  minecraftIdIndexArr: number[]
  wakzooIdIndexArr: number[]
}

// Mutation(create, update) 전용 타입

export type PortfolioItemMutation = Omit<PortfolioItem, '_id'>

export type ArchitectMutation = {
  minecraftId: string
  wakzooId: string
  tier: PlacementTestTierInfo[]
  curTier: Tier
  wakzooLink: string
  statistics: {
    win: number
    hackerWin: number
    proWin: number
    participation: number
  }
  portfolio: PortfolioItemMutation[]
}
