<script setup lang="ts">
import { cn } from "@/lib/cn";

type Props = {
  class?: string;
};

defineProps<Props>();
</script>

<template>
  <main :class="cn('h-screen dark:bg-neutral-900 dark:text-neutral-300', $props.class)">
    <slot></slot>
  </main>
</template>
