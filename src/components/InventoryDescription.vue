<script lang="ts" setup>
import niceBgUrl from "@/assets/img/nicebg.webp?url";
</script>

<template>
  <div
    class="flex w-[250px] flex-col rounded-md border p-4 dark:border-neutral-700 dark:bg-neutral-800"
  >
    <img :src="niceBgUrl" />

    <div class="mt-5 flex flex-col items-center">
      <div class="h-6 w-full max-w-[190px] animate-pulse rounded-md dark:bg-neutral-700"></div>

      <div class="grid grid-cols-1 auto-cols-auto grid-flow-row gap-4 w-full place-items-center mt-6 animate-pulse">
        <div class="h-3 max-w-[150px] w-full dark:bg-neutral-700 rounded-md"></div>
        <div class="h-3 max-w-[190px] w-full dark:bg-neutral-700 rounded-md"></div>
        <div class="h-3 max-w-[170px] w-full dark:bg-neutral-700 rounded-md"></div>
        <div class="h-3 max-w-[160px] w-full dark:bg-neutral-700 rounded-md"></div>
        <div class="h-3 max-w-[140px] w-full dark:bg-neutral-700 rounded-md"></div>
      </div>
    </div>
  </div>
</template>
