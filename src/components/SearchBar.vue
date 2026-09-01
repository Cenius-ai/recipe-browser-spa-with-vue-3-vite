<script setup>
import { useSearch } from '@/composables/useSearch'

const { query, onInput, clear } = useSearch()

defineProps({
  expanded: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div
    :class="[
      'transition-all duration-300 overflow-hidden',
      expanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
    ]"
  >
    <div class="relative">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 text-sm pointer-events-none" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        :value="query"
        @input="onInput($event.target.value)"
        placeholder="Search recipes, ingredients, tags..."
        class="input pl-11 pr-10"
        aria-label="Search recipes"
        role="searchbox"
      />
      <button
        v-if="query"
        @click="clear"
        class="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-600 flex items-center justify-center text-xs text-surface-300 hover:bg-surface-500 hover:text-surface-100 transition-colors"
        aria-label="Clear search"
      >
        ✕
      </button>
    </div>
  </div>
</template>
