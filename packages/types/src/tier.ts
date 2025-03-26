import { TIER, TIER_LIST } from "@repo/constants";

export type TierGroup = keyof typeof TIER_LIST;
export type Tier = (typeof TIER)[number];
