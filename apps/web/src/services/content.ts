import { ALL_TIER_GROUP } from '@repo/constants'
import {
  AllTier,
  AllTierGroup,
  Architect,
  Category,
  GridInfo,
  LineInfo,
  NoobProHacker,
} from '@repo/types'

export const getArchitectIds = <T extends LineInfo[] | GridInfo[]>(
  workInfo: T,
) => {
  return [
    ...new Set(
      workInfo.flatMap((line) => {
        if ('entries' in line) {
          return line.entries.flatMap((entry) => entry.architectId)
        } else {
          const entry = line
          return entry.architectId
        }
      }),
    ),
  ]
}

export const populateWakzooId = <T extends LineInfo[] | GridInfo[]>(
  workInfo: T,
  architectInfos: Pick<Architect, '_id' | 'wakzooId'>[],
): T => {
  const idToMinecraftIdMap = architectInfos.reduce(
    (acc, { _id, wakzooId }) => {
      acc[_id.toString()] = wakzooId.replaceAll(' ', '-')
      return acc
    },
    {} as Record<string, string>,
  )

  return workInfo.map((line) => {
    if ('entries' in line) {
      return {
        ...line,
        entries: line.entries.map((entry) => ({
          ...entry,
          architectId: entry.architectId.map(
            (id) => idToMinecraftIdMap[id] || id,
          ),
        })),
      }
    } else {
      const entry = line
      return {
        ...entry,
        architectId: entry.architectId.map(
          (id) => idToMinecraftIdMap[id] || id,
        ),
      }
    }
  }) as T
}

export const getHackerWinLine = (noobprohacker: NoobProHacker) => {
  return noobprohacker.workInfo.find((line) =>
    line.entries.find((entry) => entry.tier === '해커' && entry.ranking === 1),
  )
}

export const getProWinLine = (noobprohacker: NoobProHacker) => {
  return noobprohacker.workInfo.find((line) =>
    line.entries.find((entry) => entry.tier === '프로' && entry.ranking === 1),
  )
}

export const getDetailContentTitle = (
  category: Category,
  episode: number,
  title: string,
) => {
  switch (category) {
    case '눕프로해커':
      return `눕프로해커 ${episode}회 : ${title} 편`

    case '배치고사':
      return `제 ${episode}회 배치고사`

    default:
      return title
  }
}

export const getContentUrl = (category: string, episode: number) => {
  switch (category) {
    case '눕프로해커':
      return `/noobprohacker/${episode}`

    case '배치고사':
      return `/placement_test/${episode}`

    default:
      return `/event_noobprohacker/${episode}`
  }
}

export const groupArchitectTierBySeason = (
  tiers: Architect['tier'],
  season: number,
) => {
  const tierCounts: Record<AllTierGroup, Record<string, number>> = {} as Record<
    AllTierGroup,
    Record<string, number>
  >

  tiers
    .filter((tier) => tier.season === season)
    .filter((tier) => tier.result !== '언랭')
    .forEach((item) => {
      for (const [group, groupTiers] of Object.entries(ALL_TIER_GROUP) as [
        AllTierGroup,
        readonly string[],
      ][]) {
        if (groupTiers.includes(item.result)) {
          if (!tierCounts[group as AllTierGroup]) {
            tierCounts[group as AllTierGroup] = {}
          }
          tierCounts[group as AllTierGroup][item.result] =
            (tierCounts[group as AllTierGroup][item.result] || 0) + 1
          break
        }
      }
    })

  return Object.entries(tierCounts).map(([group, tiers]) => ({
    group,
    tiers: Object.entries(tiers)
      .sort(
        (a, b) =>
          (ALL_TIER_GROUP[group as AllTierGroup] as readonly string[]).indexOf(
            a[0],
          ) -
          (ALL_TIER_GROUP[group as AllTierGroup] as readonly string[]).indexOf(
            b[0] as AllTier,
          ),
      )
      .map(([tier, count]) => ({ [tier]: count })),
  }))
}
