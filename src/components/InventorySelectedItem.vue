<script setup lang="ts">
import { useInventoryStore } from "@/stores/inventory";
import type { InventoryItem } from "@/types/inventory-item";
import { ref } from "vue";
import XIcon from "./icons/XIcon.vue";
import Button from "./Button.vue";

type Props = {
  rowIdx: number;
  colIdx: number;
  item: InventoryItem;
};

const props = defineProps<Props>();

const inventory = useInventoryStore();

const isDeleting = ref(false);
const deleteCount = ref<number>();

const deleteSubmit = (e: Event) => {
  e.preventDefault();

  if (typeof deleteCount.value !== "number") {
    return;
  }

  if (deleteCount.value > props.item.count) {
    return;
  }

  const newCount = props.item.count - deleteCount.value;
  inventory.changeCount(props.rowIdx, props.colIdx, newCount);
};
</script>

<template>
  <div
    class="absolute right-0 top-0 h-full min-w-[250px] rounded-br-md rounded-tr-md border-l backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-800/60 "
  >
    <div class="absolute right-0 top-0">
      <button class="p-2" @click="inventory.deselect">
        <XIcon />
      </button>
    </div>
    <div class="h-full overflow-y-auto p-4">
      <div class="mb-8 mt-8 flex items-center justify-center">
        <img :src="`/img/items/${item.assetName}`" class="h-[130px] w-[130px]" />
      </div>

      <div class="h-[1px] w-full dark:bg-neutral-700"></div>

      <div class="mt-8 h-8 animate-pulse gap-4 rounded-md dark:bg-neutral-700"></div>

      <div class="mt-6 grid grid-flow-row auto-rows-min grid-cols-1 place-content-center gap-4">
        <div class="h-2.5 animate-pulse rounded-md dark:bg-neutral-700"></div>
        <div class="h-2.5 animate-pulse rounded-md dark:bg-neutral-700"></div>
        <div class="h-2.5 animate-pulse rounded-md dark:bg-neutral-700"></div>
        <div
          class="mx-auto h-2.5 w-full max-w-[180px] animate-pulse rounded-md dark:bg-neutral-700"
        ></div>
        <div
          class="mx-auto h-2.5 w-full max-w-[80px] animate-pulse rounded-md dark:bg-neutral-700"
        ></div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 flex w-full flex-col rounded-br-md border-t p-4 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <form
        v-if="isDeleting"
        class="grid grid-flow-row auto-rows-min grid-cols-1 gap-4"
        @submit="deleteSubmit"
      >
        <input
          v-model="deleteCount"
          type="number"
          step="1"
          min="1"
          :max="item.count"
          class="appearance-none rounded-md border px-3 py-2 text-sm placeholder:text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 dark:border-neutral-700 dark:bg-neutral-800 focus:dark:ring-neutral-300"
          placeholder="Введите количество"
          required
        />
        <div class="flex flex-row gap-4">
          <Button type="button" @click="isDeleting = false" fullWidth>
            <span>Отмена</span>
          </Button>
          <Button variant="destructive" type="submit" @click="deleteSubmit" fullWidth>
            <span>Удалить</span>
          </Button>
        </div>
      </form>
      <Button v-else variant="destructive" @click="isDeleting = true" fullWidth>
        Удалиние предмета
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
