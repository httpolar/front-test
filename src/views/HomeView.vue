<script setup lang="ts">
import InventoryDescription from "@/components/InventoryDescription.vue";
import InventoryBottom from "@/components/InventoryBottom.vue";
import InventorySlot from "@/components/InventorySlot.vue";
import MainWrapper from "@/components/MainWrapper.vue";
import { cn } from "@/lib/cn";
import { useInventoryStore } from "@/stores/inventory";

const inventoryStore = useInventoryStore();
</script>

<template>
  <MainWrapper class="flex items-center justify-center">
    <div class="flex w-fit flex-col gap-6">
      <div class="flex flex-row gap-6">
        <InventoryDescription />

        <div
          class="grid auto-cols-[100px] grid-cols-1 gap-[1px] rounded-md border dark:border-neutral-700 dark:bg-neutral-700"
        >
          <div
            v-for="(chunk, rowIdx) in inventoryStore.items"
            :key="`row-${rowIdx}`"
            class="grid auto-cols-[100px] grid-flow-col grid-rows-1 gap-[1px]"
          >
            <InventorySlot
              v-for="(item, colIdx) in chunk"
              :item="item"
              :key="`item-${rowIdx}-${colIdx}`"
              :class="
                cn({
                  'rounded-tl-md': rowIdx === 0 && colIdx === 0,
                  'rounded-tr-md': rowIdx === 0 && colIdx === chunk.length - 1,
                  'rounded-bl-md': rowIdx === inventoryStore.items.length - 1 && colIdx === 0,
                  'rounded-br-md':
                    rowIdx === inventoryStore.items.length - 1 && colIdx === chunk.length - 1
                })
              "
              :rowIdx="rowIdx"
              :colIdx="colIdx"
              :data-row="rowIdx"
              :data-col="colIdx"
            />
          </div>
        </div>
      </div>

      <InventoryBottom />
    </div>
  </MainWrapper>
</template>
