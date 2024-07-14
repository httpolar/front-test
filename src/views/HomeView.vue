<script setup lang="ts">
import InventoryItem from "@/components/InventoryItem.vue";
import MainWrapper from "@/components/MainWrapper.vue";
import { useInventoryStore } from "@/stores/inventory";

const inventoryStore = useInventoryStore();
</script>

<template>
  <MainWrapper class="flex justify-center items-center">
    <div class="w-fit flex flex-col gap-6">
      <div class="flex flex-row gap-6">
        <div class="dark:bg-neutral-800 p-4 rounded-md border dark:border-neutral-700 w-[300px]">
          123123
        </div>

        <div
          class="dark:bg-neutral-700 grid grid-cols-[repeat(5,minmax(0,120px))] gap-[1px] rounded-md border dark:border-neutral-700"
        >
          <InventoryItem v-for="(item, idx) in inventoryStore.items" :key="idx" />
        </div>
      </div>
      <div class="dark:bg-neutral-800 p-4 rounded-md border dark:border-neutral-700">123</div>
    </div>
  </MainWrapper>
</template>
