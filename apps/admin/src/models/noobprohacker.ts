import { type NoobProHacker } from "@/types/content";
import { Schema, Model, model, models } from "mongoose";
import { contentInfoSchema, lineInfoSchema } from "./content";

const noobprohackerSchema = new Schema<NoobProHacker>({
  contentInfo: contentInfoSchema,
  workInfo: lineInfoSchema,
});

interface NoobProHackerModel extends Model<NoobProHacker> {}

const NoobProHacker =
  (models["NoobProHacker"] as NoobProHackerModel) ||
  model<NoobProHacker, NoobProHackerModel>("NoobProHacker", noobprohackerSchema);

export default NoobProHacker;
