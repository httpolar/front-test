<script setup lang="ts">
import { cn } from "@/lib/cn";
import { useInventoryStore } from "@/stores/inventory";
import InventorySelectedItem from "./InventorySelectedItem.vue";
import InventorySlot from "./InventorySlot.vue";
import { vOnClickOutside } from "@vueuse/components";

const inventory = useInventoryStore();
</script>

<template>
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
            'rounded-br-md': rowIdx === inventory.items.length - 1 && colIdx === chunk.length - 1
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
</template>
