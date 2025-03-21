import { type TierGroup, type Tier } from '@/services/tier'

export type Architect = {
  minecraftId: string
  wakzooId: string
  tier: Tier[]
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

export type PortfolioItem = {
  type?: TierGroup
  category: string
  episode: number
  title: string
  ranking?: number | null
  imageUrl: string
  youtubeUrl?: string | null
  date: string
  description?: string
}

export interface SearchedArchitect extends Architect {
  minecraftIdIndexArr: number[]
  wakzooIdIndexArr: number[]
}
