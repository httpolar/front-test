import { chunk } from "@/lib/chunk";
import type { InventoryItem } from "@/types/inventory-item";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

type ItemsState = InventoryItem | null;

export const useInventoryStore = defineStore("inventory-store", () => {
  const items = ref<ItemsState[]>(Array(5 * 5).fill(null));
  const chunked = computed(() => chunk(items.value, 5));

  return { items, chunked };
});
