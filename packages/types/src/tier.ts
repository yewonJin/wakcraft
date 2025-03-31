import { TIER, TIER_GROUP, ALL_TIER_GROUP, ALL_TIER } from '@repo/constants'

export type TierGroup = keyof typeof TIER_GROUP
export type Tier = (typeof TIER)[number]
export type AllTierGroup = keyof typeof ALL_TIER_GROUP
export type AllTier = (typeof ALL_TIER)[number]

export type Line = '눕' | '계륵' | '프로' | '국밥' | '해커'
