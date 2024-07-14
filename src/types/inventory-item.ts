import { z } from "zod";

export const InventoryItemSchema = z.object({
  name: z.string(),
  description: z.string()
});

export type InventoryItem = z.infer<typeof InventoryItemSchema>;
