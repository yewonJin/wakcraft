import {
  GridEventNoobProHacker,
  GridInfo,
  LineEventNoobProHacker,
  LineInfo,
  NoobProHacker,
  PlacementTest,
  PortfolioItem,
} from '@repo/types'
import { ArchitectInfo } from '@/store/architectStore'

// 함수
export const makeInitialNoobProHackerContent = (
  nextEpisode: number,
  workInfoLength: number,
  entryLength: number,
  tiers: string[],
) => {
  const noobprohacker: NoobProHacker = {
    contentInfo: {
      episode: nextEpisode,
      date: new Date().toISOString().split('T')[0],
      title: '자유',
      youtubeUrl: null,
    },
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
  const lineEventNoobProHacker: LineEventNoobProHacker = {
    type: 'line',
    contentInfo: {
      episode: nextEpisode,
      date: new Date().toISOString().split('T')[0],
      title: '',
      youtubeUrl: null,
    },
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
  const gridEventNoobProHacker: GridEventNoobProHacker = {
    type: 'grid',
    contentInfo: {
      episode: nextEpisode,
      date: new Date().toISOString().split('T')[0],
      title: '',
      youtubeUrl: null,
    },
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
  const placementTest: PlacementTest = {
    contentInfo: {
      episode: nextEpisode,
      date: new Date().toISOString().split('T')[0],
      title: '',
      youtubeUrl: null,
    },
    workInfo: imageUrls.map((imageUrl) => ({
      ...makeInitialGridInfo(),
      imageUrl: imageUrl,
      architectId: [getMinecraftIdByImageUrl(imageUrl) || ''],
    })),
  }

  return placementTest
}

export const makeInitialLineInfo = (entryLength: number, tiers: string[]) => {
  const lineInfo: LineInfo = {
    title: '',
    ranking: 0,
    entries: Array.from({ length: entryLength }, (_, i) =>
      makeInitialEntry(tiers[i]),
    ),
  }

  return lineInfo
}

export const makeInitialEntry = (tier: string) => {
  const entry: LineInfo['entries'][number] = {
    tier: tier,
    description: '',
    architectId: [],
    imageUrl: '',
    youtubeUrl: null,
    ranking: 0,
  }

  return entry
}

export const makeInitialGridInfo = () => {
  const gridInfo: GridInfo = {
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

export const convertLineContentArchitectId = (
  architects: ArchitectInfo[],
  payload: NoobProHacker | LineEventNoobProHacker,
): NoobProHacker | LineEventNoobProHacker => {
  return {
    ...payload,
    workInfo: payload.workInfo.map((line) => ({
      ...line,
      entries: line.entries.map((entry) => ({
        ...entry,
        architectId: entry.architectId.map(
          (minecraftId) =>
            architects.find(
              (architect) => architect.minecraftId === minecraftId,
            )?._id || '',
        ),
      })),
    })),
  }
}

export const convertGridContentArchitectId = (
  architects: ArchitectInfo[],
  payload: GridEventNoobProHacker | PlacementTest,
): GridEventNoobProHacker | PlacementTest => {
  return {
    ...payload,
    workInfo: payload.workInfo.map((entry) => ({
      ...entry,
      architectId: entry.architectId.map(
        (minecraftId) =>
          architects.find((architect) => architect.minecraftId === minecraftId)
            ?._id || '',
      ),
    })),
  }
}

export const convertNoobProHackerToPortfolioItems = (
  payload: NoobProHacker,
) => {
  const portfolioItems: { _id: string; portfolioItem: PortfolioItem }[] = []

  payload.workInfo.forEach((line) => {
    line.entries.forEach((entry) => {
      const portfolioItem: PortfolioItem = {
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
  payload: LineEventNoobProHacker,
) => {
  const portfolioItems: { _id: string; portfolioItem: PortfolioItem }[] = []

  payload.workInfo.forEach((line) => {
    line.entries.forEach((entry) => {
      const portfolioItem: PortfolioItem = {
        category: payload.contentInfo.title,
        episode: payload.contentInfo.episode,
        date: payload.contentInfo.date,
        description: entry.description,
        imageUrl: entry.imageUrl,
        youtubeUrl: entry.youtubeUrl,
        type: entry.tier,
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

export const convertGridEventNoobProHackerToPortfolioItems = (
  payload: GridEventNoobProHacker,
) => {
  const portfolioItems: { _id: string; portfolioItem: PortfolioItem }[] = []

  payload.workInfo.forEach((entry) => {
    const portfolioItem: PortfolioItem = {
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
  payload: PlacementTest,
) => {
  const portfolioItems: { _id: string; portfolioItem: PortfolioItem }[] = []

  payload.workInfo.forEach((entry) => {
    const portfolioItem: PortfolioItem = {
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

export const hasEmptyImageUrl = (workInfo: LineInfo[] | GridInfo[]) => {
  return workInfo.some((item) => {
    if ('entries' in item) {
      return item.entries.some((entry) => entry.imageUrl === '')
    } else {
      return item.imageUrl === ''
    }
  })
}

export const hasEmptyArchitectId = (workInfo: LineInfo[] | GridInfo[]) => {
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

export const hasEmptyEntryRanking = (workInfo: LineInfo[]) =>
  workInfo.some((item) =>
    item.entries.some((entry) => entry.tier !== '눕' && entry.ranking === 0),
  )

export const hasEmptyOrder = (workInfo: GridInfo[]) =>
  workInfo.some((item) => item.order === 0 || item.order === null)

export const hasEmptyDescription = (workInfo: GridInfo[]) =>
  workInfo.some((item) => item.description === '')

export const hasEmptyTitle = (workInfo: LineInfo[] | GridInfo[]) =>
  workInfo.some((item) => item.title === '' || item.title === null)

export const hasEmptyYoutubeUrl = (workInfo: LineInfo[] | GridInfo[]) => {
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
