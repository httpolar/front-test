import type { InventoryItem } from "@/types/inventory-item";
import { defineStore } from "pinia";
import { ref } from "vue";

type ItemsState = InventoryItem | null;

export const useInventoryStore = defineStore("inventory-store", () => {
  const items = ref<ItemsState[]>(Array(5 * 5).fill(null));

  return { items };
});
