import { z } from "zod";

export const InventoryItemSchema = z.object({
  assetName: z.string(),
  id: z.string(),
  name: z.string(),
  description: z.string(),
  count: z.number(),
});

export type InventoryItem = z.infer<typeof InventoryItemSchema>;
