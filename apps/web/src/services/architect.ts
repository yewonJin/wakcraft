import { TIER } from '@repo/constants'
import { Architect, Category, PortfolioItem } from '@repo/types'

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
