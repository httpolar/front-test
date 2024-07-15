<script setup lang="ts">
import XIcon from "@/components/icons/XIconMicro.vue";
</script>

<template>
  <div class="relative rounded-md border p-4 pr-16 dark:border-neutral-700 dark:bg-neutral-800">
    <div class="h-9 animate-pulse rounded-md dark:bg-neutral-700"></div>
    <div class="absolute right-0 top-0 mr-2 mt-2">
      <XIcon class="cursor-pointer" />
    </div>
  </div>
</template>
