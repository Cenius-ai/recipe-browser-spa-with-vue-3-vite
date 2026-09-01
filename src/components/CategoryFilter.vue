<script setup>
import { useCategoryFilter } from '@/composables/useCategoryFilter'
import { useRecipesStore } from '@/stores/recipes'

const { currentCategory, categories, selectCategory, clearCategory } = useCategoryFilter()
const store = useRecipesStore()

const categoryEmojis = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  dessert: '🍰'
}
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" role="group" aria-label="Filter by category">
    <!-- All / clear -->
    <button
      @click="clearCategory"
      :class="[
        'flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border min-h-[40px]',
        !currentCategory
          ? 'bg-accent-500/20 text-accent-300 border-accent-500/40'
          : 'bg-surface-800 text-surface-400 border-surface-700 hover:text-surface-200 hover:border-surface-500'
      ]"
    >
      All
    </button>

    <button
      v-for="cat in categories"
      :key="cat"
      @click="selectCategory(cat)"
      :class="[
        'flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border capitalize min-h-[40px] flex items-center gap-1.5',
        currentCategory === cat
          ? 'bg-accent-500/20 text-accent-300 border-accent-500/40'
          : 'bg-surface-800 text-surface-400 border-surface-700 hover:text-surface-200 hover:border-surface-500'
      ]"
    >
      <span aria-hidden="true">{{ categoryEmojis[cat] || '📋' }}</span>
      {{ store.getCategoryLabel(cat) }}
    </button>
  </div>
</template>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
