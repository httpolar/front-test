<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
import { computed, useAttrs } from "vue";

type Props = {
  variant?: "default" | "destructive" | "ghost";
  fullWidth?: boolean;
};

const props = withDefaults(defineProps<Props>(), { variant: "default" });
const attrs = useAttrs();

const classes = computed(() =>
  cn(
    "flex h-8 px-4 items-center justify-center rounded-md text-center text-sm leading-none transition-colors duration-150",
    {
      "w-full": props.fullWidth === true,
      "dark:bg-neutral-50 dark:text-neutral-800 hover:dark:bg-neutral-200":
        props.variant === "default",
      "bg-red-400 text-center text-white hover:dark:bg-red-500": props.variant === "destructive",
      "bg-transparent dark:text-neutral-200 dark:hover:bg-neutral-200/10": props.variant === "ghost"
    },
    attrs.class as ClassValue
  )
);
</script>

<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>
