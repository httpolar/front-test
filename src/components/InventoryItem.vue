<script setup lang="ts">
import { cn } from "@/lib/cn";

type Props = {
  count?: number;
};

const props = withDefaults(defineProps<Props>(), {
  count: 0
});
</script>

<template>
  <div :class="cn('aspect-square p-2 dark:bg-neutral-800')">
    <div>asdasdasd</div>
  </div>
</template>
