<script setup lang="ts">
import InventoryDescription from "@/components/InventoryDescription.vue";
import InventoryBottom from "@/components/InventoryBottom.vue";
import InventorySlot from "@/components/InventorySlot.vue";
import MainWrapper from "@/components/MainWrapper.vue";
import { cn } from "@/lib/cn";
import { useInventoryStore } from "@/stores/inventory";
import { vOnClickOutside } from "@vueuse/components";
import InventorySelectedItem from "@/components/InventorySelectedItem.vue";
import Button from "@/components/Button.vue";

const inventory = useInventoryStore();
</script>

<template>
  <MainWrapper class="flex items-center justify-center">
    <div class="flex w-fit flex-col gap-6">
      <div>
        <Button variant="ghost" @click="inventory.reset">Сбросить состояние</Button>
      </div>
      <div class="flex flex-row gap-6">
        <InventoryDescription />

        <div
          class="relative grid auto-cols-[100px] grid-cols-1 gap-[1px] rounded-md border dark:border-neutral-700 dark:bg-neutral-700"
        >
          <div
            v-for="(chunk, rowIdx) in inventory.items"
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
                  'rounded-bl-md': rowIdx === inventory.items.length - 1 && colIdx === 0,
                  'rounded-br-md':
                    rowIdx === inventory.items.length - 1 && colIdx === chunk.length - 1
                })
              "
              :rowIdx="rowIdx"
              :colIdx="colIdx"
            />
          </div>

          <Transition
            enterFromClass="opacity-0 translate-x-12"
            enterToClass="opacity-100"
            enterActiveClass="transition duration-300"
            leaveFromClass="opacity-100"
            leaveToClass="opacity-0 translate-x-12"
            leaveActiveClass="transition duration-300"
          >
            <InventorySelectedItem
              v-if="
                inventory.selectedItem != null &&
                inventory.selected[0] != null &&
                inventory.selected[1] != null
              "
              :item="inventory.selectedItem"
              :rowIdx="inventory.selected[0]"
              :colIdx="inventory.selected[1]"
              v-on-click-outside="inventory.deselect"
            ></InventorySelectedItem>
          </Transition>
        </div>
      </div>

      <InventoryBottom />
    </div>
  </MainWrapper>
</template>
