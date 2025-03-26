import { Schema } from "mongoose";

import { contentInfoSchema, lineInfoSchema, gridInfoSchema } from "./shared";
import { EventNoobProHacker, NoobProHacker, PlacementTest } from "@repo/types";

export const noobprohackerSchema = new Schema<NoobProHacker>({
  contentInfo: contentInfoSchema,
  workInfo: [lineInfoSchema],
});

export const eventNoobProHackerSchema = new Schema<EventNoobProHacker>({
  type: {
    type: String,
    enum: ["line", "grid"],
    required: true,
  },
  contentInfo: contentInfoSchema,
  workInfo: [
    {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (this: EventNoobProHacker, value: any) {
          if (this.type === "line") {
            return Array.isArray(value) && value.every((item) => "entries" in item);
          }
          if (this.type === "grid") {
            return Array.isArray(value) && value.every((item) => "order" in item);
          }
          return false;
        },
      },
    },
  ],
});

export const placementTestSchema = new Schema<PlacementTest>({
  contentInfo: contentInfoSchema,
  workInfo: [gridInfoSchema],
});
