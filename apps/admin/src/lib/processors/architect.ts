import Architect from '@/models/architect'
import { PortfolioItemMutation, Tier } from '@repo/types'

export const pushToArchitectsPortfolio = async (
  portfolioItems: { _id: string; portfolioItem: PortfolioItemMutation }[],
) => {
  for (const { _id, portfolioItem } of portfolioItems) {
    await Architect.pushToPortfolio(_id, portfolioItem)

    if (portfolioItem.category === '눕프로해커') {
      if (portfolioItem.ranking === 1 && portfolioItem.type === '프로') {
        await Architect.increaseProWin(_id)
      }

      if (portfolioItem.ranking === 1 && portfolioItem.type === '해커') {
        await Architect.increaseHackerWin(_id)
      }
    }

    if (portfolioItem.ranking === 1) {
      await Architect.increaseWin(_id)
    }

    await Architect.increaseParticipation(_id)
  }
}

export const updateArchitectsPortfolio = async (
  portfolioItems: { _id: string; portfolioItem: PortfolioItemMutation }[],
) => {
  // 건축가 포트폴리오에 반영
  for (const { _id, portfolioItem } of portfolioItems) {
    await Architect.updatePortfolioYoutubeUrl(
      _id,
      portfolioItem.title as string,
      portfolioItem.category,
      portfolioItem.episode,
      portfolioItem.youtubeUrl as string,
    )
    await Architect.updatePortfolioDescription(
      _id,
      portfolioItem.title as string,
      portfolioItem.category,
      portfolioItem.episode,
      portfolioItem.description as string,
    )
  }
}

export const updateArchitectsTier = async (
  portfolioItems: { _id: string; portfolioItem: PortfolioItemMutation }[],
) => {
  for (const { _id, portfolioItem } of portfolioItems) {
    await Architect.updateCurTier(_id, portfolioItem.title as Tier)
    await Architect.updateSeasonTier(
      _id,
      portfolioItem.episode,
      portfolioItem.title as Tier,
    )
  }
}
