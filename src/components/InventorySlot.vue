<script setup lang="ts">
import { cn } from "@/lib/cn";
import { useInventoryStore } from "@/stores/inventory";
import type { InventoryItem } from "@/types/inventory-item";
import type { ClassValue } from "clsx";

type Props = {
  item?: InventoryItem | null;
  rowIdx: number;
  colIdx: number;
};

const props = defineProps<Props>();

const inventory = useInventoryStore();

const DT_ROW_IDX_KEY = "item-row-idx";
const DT_COL_IDX_KEY = "item-col-idx";

const dragStart = (e: DragEvent) => {
  if (e.dataTransfer == null || props.item == null) {
    return;
  }

  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData(DT_ROW_IDX_KEY, `${props.rowIdx}`);
  e.dataTransfer.setData(DT_COL_IDX_KEY, `${props.colIdx}`);
};

const drop = (e: DragEvent) => {
  if (e.dataTransfer == null || e.currentTarget == null) {
    return;
  }

  const fromRowIdxStr = e.dataTransfer.getData(DT_ROW_IDX_KEY);
  const fromColIdxStr = e.dataTransfer.getData(DT_COL_IDX_KEY);

  if (fromRowIdxStr == null || fromColIdxStr == null) {
    return;
  }

  if (fromRowIdxStr.length < 1 || fromColIdxStr.length < 1) {
    return;
  }

  const fromRowIdx = Number(fromRowIdxStr);
  const fromColIdx = Number(fromColIdxStr);

  inventory.move(fromRowIdx, fromColIdx, props.rowIdx, props.colIdx);
};

const click = () => {
  if (props.item == null) {
    return;
  }

  inventory.selected = [props.rowIdx, props.colIdx];
};
</script>

<template>
  <div
    :class="
      cn(
        'relative aspect-square h-full max-h-[100px] w-full max-w-[100px] p-2 dark:bg-neutral-800 dark:data-[selected=true]:bg-neutral-700',
        $attrs.class as ClassValue
      )
    "
    @click="click"
    :draggable="item != null"
    @dragstart="dragStart"
    @drop="drop"
    @dragover.prevent
    @dragenter.prevent
    :data-selected="inventory.selected[0] === rowIdx && inventory.selected[1] === colIdx"
  >
    <div
      v-if="item != null"
      class="flex h-full w-full grid-cols-1 grid-rows-1 items-center justify-center"
    >
      <img :src="`/img/items/${item.assetName}`" />
      <div
        class="absolute bottom-0 right-0 flex h-4 items-center justify-center rounded-tl-md border-l border-t px-1 dark:border-neutral-700"
      >
        <span class="text-xs leading-none dark:text-neutral-400">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes drop {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.2);
  }
}

.dragStart {
  animation: drop 0.5s ease forwards;
}
</style>
