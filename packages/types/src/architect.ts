import { HydratedDocument } from 'mongoose'
import { AllTier, Tier } from './tier'

export type Architect = {
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

// Mongoose Document 타입
export type ArchitectDocument = HydratedDocument<Architect>

export type PortfolioItemDocument = HydratedDocument<PortfolioItem>

export type PlacementTestTierInfoDoucment =
  HydratedDocument<PlacementTestTierInfo>
