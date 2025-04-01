import { TIER } from '@repo/constants'
import { Architect, Category, PortfolioItem, AllTier, Tier } from '@repo/types'

export const devideByYear = (portfolio: PortfolioItem[]) => {
  return portfolio.reduce<Record<number, PortfolioItem[]>>((acc, cur) => {
    const year = new Date(cur.date).getFullYear()

    if (!acc[year]) {
      acc[year] = [cur]
    } else {
      acc[year].push(cur)
    }

    return acc
  }, {})
}

export const filterByCategory = (
  category: '전체보기' | Category,
  portfolio: PortfolioItem[],
) => {
  return portfolio.filter((item) => {
    switch (category) {
      case '전체보기':
        return true

      case '눕프로해커':
        return item.category === '눕프로해커'

      case '배치고사':
        return item.category === '배치고사'

      case '예능 눕프핵':
        return item.category !== '눕프로해커' && item.category !== '배치고사'
    }
  })
}

export const sortByRecentDate = (portfolio: PortfolioItem[]) => {
  return portfolio.toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export const sortByTier = (a: Architect, b: Architect) => {
  const tierDiff = TIER.indexOf(a.curTier) - TIER.indexOf(b.curTier)

  if (tierDiff !== 0) return tierDiff
  return a.minecraftId.localeCompare(b.minecraftId)
}

export const getDetailCategory = (category: string, episode: number) => {
  switch (category) {
    case '눕프로해커':
      return `제 ${episode}회 눕프로해커`

    case '배치고사':
      return `${episode}회 배치고사`

    default:
      return category
  }
}

export const getTierTextColor = (tier: AllTier) => {
  const tierColors: { [key in AllTier]: string } = {
    마카게: 'text-pink-500/85',
    오마카세: 'text-pink-500/85',
    해커: 'text-violet-500/85',
    해장국: 'text-cyan-500/85',
    국밥: 'text-cyan-500/85',
    '식은 국밥': 'text-cyan-500/85',
    '미지근한 국밥': 'text-cyan-500/85',
    프로: 'text-amber-500/85',
    계추: 'text-slate-500/85',
    계륵: 'text-slate-500/85',
    '가짜 눕': 'text-yellow-700/85',
    '퓨어 눕': 'text-yellow-700/85',
    '안 나쁜 눕': 'text-yellow-700/85',
    '착한 눕': 'text-yellow-700/85',
    '그냥 눕': 'text-yellow-700/85',
    '진짜 눕': 'text-yellow-700/85',
    언랭: 'text-yellow-700/85',
  }

  return tierColors[tier]
}

export const getTierBackgroundColor = (tier: Tier) => {
  const tierColors: { [key in Tier]: string } = {
    마카게: 'bg-pink-500/80',
    오마카세: 'bg-pink-500/85',
    해커: 'bg-violet-500/85',
    해장국: 'bg-cyan-500/85',
    국밥: 'bg-cyan-500/85',
    '미지근한 국밥': 'bg-cyan-500/85',
    프로: 'bg-amber-500/85',
    계추: 'bg-slate-500/85',
    계륵: 'bg-slate-500/85',
    '가짜 눕': 'bg-yellow-700/85',
    '퓨어 눕': 'bg-yellow-700/85',
    언랭: 'bg-yellow-700/85',
  }

  return tierColors[tier]
}
