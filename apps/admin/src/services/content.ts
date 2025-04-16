import {
  ContentInfoMutation,
  GridEventNoobProHackerMutation,
  GridInfoMutation,
  LineEventNoobProHackerMutation,
  LineInfoMutation,
  NoobProHackerMutation,
  PlacementTestMutation,
  PortfolioItemMutation,
} from '@repo/types'
import { ArchitectInfo } from '@/store/architectStore'

// 함수
export const makeInitialNoobProHackerContent = (
  nextEpisode: number,
  workInfoLength: number,
  entryLength: number,
  tiers: string[],
) => {
  const noobprohacker: NoobProHackerMutation = {
    contentInfo: makeInitialContentInfo(nextEpisode, '자유'),
    workInfo: Array.from({ length: workInfoLength }, () =>
      makeInitialLineInfo(entryLength, tiers),
    ),
  }

  return noobprohacker
}

export const makeInitialLineEventNoobProHackerContent = (
  nextEpisode: number,
  workInfoLength: number,
  entryLength: number,
  tiers: string[],
) => {
  const lineEventNoobProHacker: LineEventNoobProHackerMutation = {
    type: 'line',
    contentInfo: makeInitialContentInfo(nextEpisode, ''),
    workInfo: Array.from({ length: workInfoLength }, () =>
      makeInitialLineInfo(entryLength, tiers),
    ),
  }

  return lineEventNoobProHacker
}

export const makeInitialGridEventNoobProHackerContent = (
  nextEpisode: number,
  workInfoLength: number,
) => {
  const gridEventNoobProHacker: GridEventNoobProHackerMutation = {
    type: 'grid',
    contentInfo: makeInitialContentInfo(nextEpisode, ''),
    workInfo: Array.from({ length: workInfoLength }, () =>
      makeInitialGridInfo(),
    ),
  }

  return gridEventNoobProHacker
}

export const makeInitialPlacmentTestContent = (
  nextEpisode: number,
  imageUrls: string[],
) => {
  const placementTest: PlacementTestMutation = {
    contentInfo: makeInitialContentInfo(nextEpisode, ''),
    workInfo: imageUrls.map((imageUrl) => ({
      ...makeInitialGridInfo(),
      imageUrl: imageUrl,
      architectId: [getMinecraftIdByImageUrl(imageUrl) || ''],
    })),
  }

  return placementTest
}

export const makeInitialContentInfo = (nextEpisode: number, title: string) => {
  const contentInfo: ContentInfoMutation = {
    episode: nextEpisode,
    date: new Date().toISOString().split('T')[0],
    title: title,
    isTribute: false,
    youtubeUrl: null,
  }

  return contentInfo
}

export const makeInitialLineInfo = (entryLength: number, tiers: string[]) => {
  const lineInfo: LineInfoMutation = {
    title: '',
    ranking: 0,
    entries: Array.from({ length: entryLength }, (_, i) =>
      makeInitialEntry(tiers[i]),
    ),
  }

  return lineInfo
}

export const makeInitialEntry = (tier: string) => {
  const entry: LineInfoMutation['entries'][number] = {
    tier: tier,
    title: '',
    description: '',
    architectId: [],
    imageUrl: '',
    youtubeUrl: null,
    ranking: 0,
  }

  return entry
}

export const makeInitialGridInfo = () => {
  const gridInfo: GridInfoMutation = {
    order: 0,
    description: '',
    architectId: [],
    imageUrl: '',
    youtubeUrl: null,
    ranking: 0,
    title: null,
  }

  return gridInfo
}

export const convertLineContentArchitectId = <
  T extends NoobProHackerMutation | LineEventNoobProHackerMutation,
>(
  architects: ArchitectInfo[],
  payload: T,
): T => {
  return {
    ...payload,
    workInfo: payload.workInfo.map((line) => ({
      ...line,
      entries: line.entries.map((entry) => ({
        ...entry,
        architectId: entry.architectId.map(
          (id) =>
            architects.find(
              (architect) =>
                architect.minecraftId === id || architect.wakzooId === id,
            )?._id || '',
        ),
      })),
    })),
  }
}

export const convertGridContentArchitectId = <
  T extends GridEventNoobProHackerMutation | PlacementTestMutation,
>(
  architects: ArchitectInfo[],
  payload: T,
): T => {
  return {
    ...payload,
    workInfo: payload.workInfo.map((entry) => ({
      ...entry,
      architectId: entry.architectId.map(
        (id) =>
          architects.find(
            (architect) =>
              architect.minecraftId === id || architect.wakzooId === id,
          )?._id || '',
      ),
    })),
  }
}

export const convertNoobProHackerToPortfolioItems = (
  payload: NoobProHackerMutation,
) => {
  const portfolioItems: {
    _id: string
    portfolioItem: PortfolioItemMutation
  }[] = []

  payload.workInfo.forEach((line) => {
    line.entries.forEach((entry) => {
      const portfolioItem: PortfolioItemMutation = {
        category: '눕프로해커',
        episode: payload.contentInfo.episode,
        date: payload.contentInfo.date,
        description: entry.description,
        imageUrl: entry.imageUrl,
        youtubeUrl: entry.youtubeUrl,
        type: entry.tier as '눕' | '프로' | '해커',
        ranking: entry.ranking,
        title: line.title,
      }

      entry.architectId.forEach((_id) => {
        portfolioItems.push({ _id, portfolioItem })
      })
    })
  })

  return portfolioItems
}

export const convertLineEventNoobProHackerToPortfolioItems = (
  payload: LineEventNoobProHackerMutation,
) => {
  const portfolioItems: {
    _id: string
    portfolioItem: PortfolioItemMutation
  }[] = []

  payload.workInfo.forEach((line) => {
    line.entries.forEach((entry) => {
      const portfolioItem: PortfolioItemMutation = {
        category: payload.contentInfo.title,
        episode: payload.contentInfo.episode,
        date: payload.contentInfo.date,
        description: entry.description,
        imageUrl: entry.imageUrl,
        youtubeUrl: entry.youtubeUrl,
        type: entry.tier,
        ranking: entry.ranking,
        title: entry.title || line.title,
      }

      entry.architectId.forEach((_id) => {
        portfolioItems.push({ _id, portfolioItem })
      })
    })
  })

  return portfolioItems
}

export const convertGridEventNoobProHackerToPortfolioItems = (
  payload: GridEventNoobProHackerMutation,
) => {
  const portfolioItems: {
    _id: string
    portfolioItem: PortfolioItemMutation
  }[] = []

  payload.workInfo.forEach((entry) => {
    const portfolioItem: PortfolioItemMutation = {
      category: payload.contentInfo.title,
      episode: payload.contentInfo.episode,
      date: payload.contentInfo.date,
      imageUrl: entry.imageUrl,
      youtubeUrl: entry.youtubeUrl,
      type: null,
      ranking: entry.ranking,
      title: entry.title,
      description: entry.description,
    }

    entry.architectId.forEach((_id) => {
      portfolioItems.push({ _id, portfolioItem })
    })
  })

  return portfolioItems
}

export const convertPlacementTestToPortfolioItems = (
  payload: PlacementTestMutation,
) => {
  const portfolioItems: {
    _id: string
    portfolioItem: PortfolioItemMutation
  }[] = []

  payload.workInfo.forEach((entry) => {
    const portfolioItem: PortfolioItemMutation = {
      category: '배치고사',
      episode: payload.contentInfo.episode,
      date: payload.contentInfo.date,
      imageUrl: entry.imageUrl,
      youtubeUrl: entry.youtubeUrl,
      type: null,
      ranking: entry.ranking,
      title: entry.title,
      description: entry.description,
    }

    entry.architectId.forEach((_id) => {
      portfolioItems.push({ _id, portfolioItem })
    })
  })

  return portfolioItems
}

export const hasEmptyImageUrl = (
  workInfo: LineInfoMutation[] | GridInfoMutation[],
) => {
  return workInfo.some((item) => {
    if ('entries' in item) {
      return item.entries.some((entry) => entry.imageUrl === '')
    } else {
      return item.imageUrl === ''
    }
  })
}

export const hasEmptyArchitectId = (
  workInfo: LineInfoMutation[] | GridInfoMutation[],
) => {
  return workInfo.some((item) => {
    if ('entries' in item) {
      return item.entries.some(
        (entry) =>
          entry.architectId.includes('') || entry.architectId.length === 0,
      )
    } else {
      return item.architectId.includes('') || item.architectId.length === 0
    }
  })
}

export const hasEmptyEntryRanking = (workInfo: LineInfoMutation[]) =>
  workInfo.some((item) =>
    item.entries.some((entry) => entry.tier !== '눕' && entry.ranking === 0),
  )

export const hasEmptyOrder = (workInfo: GridInfoMutation[]) =>
  workInfo.some((item) => item.order === 0 || item.order === null)

export const hasEmptyDescription = (workInfo: GridInfoMutation[]) =>
  workInfo.some((item) => item.description === '')

export const hasEmptyTitle = (
  workInfo: LineInfoMutation[] | GridInfoMutation[],
) => workInfo.some((item) => item.title === '' || item.title === null)

export const hasEmptyYoutubeUrl = (
  workInfo: LineInfoMutation[] | GridInfoMutation[],
) => {
  return workInfo.some((item) => {
    if ('entries' in item) {
      return item.entries.some(
        (entry) => entry.youtubeUrl === '' || entry.youtubeUrl === null,
      )
    } else {
      return item.youtubeUrl === '' || item.youtubeUrl === null
    }
  })
}

export const getMinecraftIdByImageUrl = (imageUrl: string) => {
  return imageUrl.split('/').at(-1)?.split('.')[0] || null
}
