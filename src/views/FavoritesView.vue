<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useRecipesStore } from '@/stores/recipes'
import { useRouter } from 'vue-router'
import RecipeCard from '@/components/RecipeCard.vue'

const favorites = useFavoritesStore()
const recipesStore = useRecipesStore()
const router = useRouter()

const favoriteRecipes = computed(() => {
  return favorites.favoriteIds
    .map(id => recipesStore.getRecipeById(id))
    .filter(Boolean)
})
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center gap-3 py-2">
      <button
        @click="router.push('/')"
        class="btn-ghost text-sm"
        aria-label="Back to all recipes"
      >
        ← Back
      </button>
      <span class="text-3xl" aria-hidden="true">❤️</span>
      <div>
        <h1 class="font-display text-2xl sm:text-3xl font-bold text-surface-100">
          Your Favorites
        </h1>
        <p class="text-sm text-surface-400">
          {{ favoriteRecipes.length }} {{ favoriteRecipes.length === 1 ? 'saved recipe' : 'saved recipes' }}
        </p>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Empty state -->
    <div v-if="favoriteRecipes.length === 0" class="py-20 text-center">
      <p class="text-5xl mb-4">🤍</p>
      <p class="text-surface-300 text-lg">No favorites yet</p>
      <p class="text-surface-500 text-sm mt-1 max-w-sm mx-auto">
        Browse recipes and tap the heart icon to save your favorites for quick access.
      </p>
      <button
        @click="router.push('/')"
        class="btn-primary mt-6"
      >
        Browse recipes
      </button>
    </div>

    <!-- Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
    >
      <RecipeCard
        v-for="recipe in favoriteRecipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
  </div>
</template>
