<script setup>
import { computed } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import SearchBar from '@/components/SearchBar.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import RecipeCard from '@/components/RecipeCard.vue'

defineProps({
  searchExpanded: Boolean
})

const store = useRecipesStore()
const results = computed(() => store.filteredRecipes)
</script>

<template>
  <div class="space-y-5">
    <!-- Hero -->
    <section class="py-4 sm:py-8">
      <h1 class="font-display text-3xl sm:text-4xl font-bold text-surface-100 tracking-tight leading-tight">
        Discover<br />
        <span class="text-accent-400">delicious recipes</span>
      </h1>
      <p class="mt-2 text-surface-400 text-base max-w-lg">
        Browse our curated collection of {{ store.recipes.length }} hand-picked recipes. Filter by category, search by ingredient, and save your favorites.
      </p>
    </section>

    <!-- Search + Filter -->
    <div class="space-y-3">
      <SearchBar :expanded="searchExpanded !== false" />
      <CategoryFilter />
    </div>

    <!-- Results -->
    <section aria-label="Recipe results">
      <div v-if="results.length === 0" class="py-16 text-center">
        <p class="text-5xl mb-4">🍳</p>
        <p class="text-surface-400 text-lg">No recipes found</p>
        <p class="text-surface-500 text-sm mt-1">Try adjusting your search or filters</p>
        <button
          @click="store.clearFilters()"
          class="btn-outline mt-4"
        >
          Clear all filters
        </button>
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        <RecipeCard
          v-for="recipe in results"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>

      <p class="text-center text-xs text-surface-500 mt-6" v-if="results.length > 0">
        Showing {{ results.length }} of {{ store.recipes.length }} recipes
      </p>
    </section>
  </div>
</template>
