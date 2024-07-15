<script setup lang="ts">
import InventoryDescription from "@/components/InventoryDescription.vue";
import InventoryBottom from "@/components/InventoryBottom.vue";
import MainWrapper from "@/components/MainWrapper.vue";
import Button from "@/components/Button.vue";
import InventoryContainer from "@/components/InventoryContainer.vue";
import { useInventoryStore } from "@/stores/inventory";

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
        <InventoryContainer />
      </div>

      <InventoryBottom />
    </div>
  </MainWrapper>
</template>
