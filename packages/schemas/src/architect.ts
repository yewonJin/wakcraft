import { Schema } from "mongoose";

import { PortfolioItemSchema } from "./shared";
import { Architect } from "@repo/types";
import { TIER } from "@repo/constants";

export const architectSchema = new Schema<Architect>({
  minecraftId: {
    type: String,
    required: true,
    unique: true,
  },
  wakzooId: { type: String, unique: true },
  tier: { type: [String], enum: TIER },
  curTier: { type: String, enum: TIER, default: "언랭" },
  wakzooLink: { type: String },
  statistics: {
    win: { type: Number, default: 0 },
    hackerWin: { type: Number, default: 0 },
    proWin: { type: Number, default: 0 },
    participation: { type: Number, default: 0 },
  },
  portfolio: { type: [PortfolioItemSchema], default: [] },
});
