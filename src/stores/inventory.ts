import { InventoryItemSchema, type InventoryItem } from "@/types/inventory-item";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

const ROWS = 5;
const COLS = 5;

const LOCAL_STORAGE_KEY = "cool-inventory-items";

type ItemsState = InventoryItem | null;

const initialItemsState = (
  rows: number,
  cols: number,
  checkLocalStorage: boolean = true
): ItemsState[][] => {
  if (checkLocalStorage === true) {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedItems != null) {
      const obj = JSON.parse(storedItems);
      const result = InventoryItemSchema.nullable().array().array().safeParse(obj);

      if (result.success) {
        console.log(`Found stored items in local storage!`);
        return result.data;
      }

      console.log("Found items in local storage cannot be used due to validation error");
      console.error(result.error);

      localStorage.removeItem(LOCAL_STORAGE_KEY);
      console.error("Local storage item has been removed");
    }
    console.log("There are no items in local storage, using default values");
  }

  const items: ItemsState[][] = [];
  for (let i = 0; i < rows; i++) {
    items[i] = [];
    for (let j = 0; j < cols; j++) {
      items[i][j] = null;
    }
  }

  items[0][0] = {
    assetName: "green-box.webp",
    id: "green-box",
    name: "Зелёная коробочка",
    description: "Весьма красивая зелёная коробочка",
    count: 4
  };

  items[0][1] = {
    assetName: "standard-box.webp",
    id: "standard-box",
    name: "Обычная коробочка",
    description: "Самая стандартная коробочка",
    count: 2
  };

  items[0][2] = {
    assetName: "purple-box.webp",
    id: "purple-box",
    name: "Фиолетовая коробочка",
    description: "Очень редкая фиолетовая коробочка",
    count: 5
  };

  return items;
};

export const useInventoryStore = defineStore("inventory-store", () => {
  const items = ref<ItemsState[][]>(initialItemsState(ROWS, COLS));

  const selected = ref<[number | null, number | null]>([null, null]);
  const selectedItem = computed<InventoryItem | null>(() => {
    const i = selected.value[0];
    const j = selected.value[1];

    if (i == null || j == null) {
      return null;
    }

    return items.value.at(i)?.at(j) ?? null;
  });

  const move = (
    fromRowIdx: number,
    fromColIdx: number,
    toRowIdx: number,
    toColIdx: number
  ): boolean => {
    const fromSlot = items.value?.at(fromRowIdx)?.at(fromColIdx);
    if (fromSlot == null) {
      return false;
    }

    if (toRowIdx > items.value.length - 1) {
      return false;
    }

    if (toColIdx > items.value[toRowIdx].length - 1) {
      return false;
    }

    const toSlot = items.value[toRowIdx][toColIdx];

    items.value[fromRowIdx][fromColIdx] = toSlot;
    items.value[toRowIdx][toColIdx] = fromSlot;

    return true;
  };

  const deselect = () => {
    selected.value = [null, null];
  };

  const changeCount = (rowIdx: number, colIdx: number, newCount: number) => {
    const item = items.value?.at(rowIdx)?.at(colIdx);
    if (item == null) {
      return;
    }

    if (newCount <= 0) {
      items.value[rowIdx][colIdx] = null;
      return;
    }

    items.value[rowIdx][colIdx] = { ...item, count: newCount };
  };

  const reset = () => {
    deselect();
    items.value = initialItemsState(ROWS, COLS, false);
  };

  watch(
    () => items,
    (s) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(s.value));
      deselect();
    },
    { deep: true, immediate: true }
  );

  return { items, selected, selectedItem, move, deselect, changeCount, reset };
});
