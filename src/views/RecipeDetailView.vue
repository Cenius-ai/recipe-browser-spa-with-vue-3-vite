<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecipesStore } from '@/stores/recipes'
import FavoritesToggle from '@/components/FavoritesToggle.vue'

const route = useRoute()
const router = useRouter()
const store = useRecipesStore()

const recipe = computed(() => {
  const r = store.getRecipeById(route.params.id)
  if (!r) {
    router.replace({ name: 'not-found', params: { pathMatch: [`recipe/${route.params.id}`] } })
    return null
  }
  return r
})

function goToCategory() {
  if (recipe.value) {
    router.push({ name: 'category', params: { slug: recipe.value.category } })
  }
}

function getImageFallback(title) {
  const colors = ['#4675d8', '#8b5cf6', '#a6846f', '#5e4c43', '#605753']
  const idx = (title || '').length % colors.length
  return colors[idx]
}

const categoryEmojis = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  dessert: '🍰'
}
</script>

<template>
  <div v-if="recipe" class="space-y-6 max-w-3xl mx-auto">
    <!-- Back -->
    <button
      @click="router.back()"
      class="btn-ghost text-sm"
      aria-label="Go back"
    >
      ← Back
    </button>

    <!-- Hero image area -->
    <div
      class="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden border border-hairline border-surface-700"
    >
      <div
        class="absolute inset-0 flex items-center justify-center text-7xl"
        :style="{ backgroundColor: getImageFallback(recipe.title) + '25' }"
      >
        <span aria-hidden="true">{{ recipe.tags?.[0] === 'dessert' ? '🍰' : recipe.tags?.[0] === 'breakfast' ? '🥞' : recipe.tags?.[0] === 'soup' ? '🍲' : recipe.category === 'dinner' ? '🍽️' : '🥗' }}</span>
      </div>
      <img
        :src="recipe.imageUrl"
        :alt="recipe.title"
        class="absolute inset-0 w-full h-full object-cover opacity-0"
        loading="lazy"
        @error="$event.target.style.display = 'none'"
      />
      <!-- Favorites toggle overlay -->
      <div class="absolute top-4 right-4 z-10">
        <FavoritesToggle :recipe-id="recipe.id" size="lg" />
      </div>
    </div>

    <!-- Title section -->
    <div class="space-y-3">
      <div class="flex flex-wrap items-start gap-3">
        <h1 class="font-display text-2xl sm:text-3xl font-bold text-surface-100 flex-1">
          {{ recipe.title }}
        </h1>
      </div>

      <p class="text-surface-300 text-base leading-relaxed">
        {{ recipe.description }}
      </p>

      <!-- Meta chips -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          @click="goToCategory"
          class="badge-accent capitalize cursor-pointer hover:bg-accent-500/30 transition-colors"
        >
          {{ categoryEmojis[recipe.category] || '' }} {{ recipe.category }}
        </button>
        <span class="badge-surface">{{ recipe.cookTime }}</span>
        <span class="badge-surface">{{ recipe.servings }} {{ recipe.servings === 1 ? 'serving' : 'servings' }}</span>
        <span class="badge-surface capitalize">{{ recipe.difficulty }}</span>
      </div>

      <!-- Tags -->
      <div v-if="recipe.tags?.length" class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in recipe.tags"
          :key="tag"
          class="text-xs px-2.5 py-1 rounded-full bg-surface-800 text-surface-400 border border-hairline border-surface-700"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Two column: ingredients + steps -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
      <!-- Ingredients (sidebar) -->
      <aside class="md:col-span-2" aria-label="Ingredients">
        <div class="card p-5 sticky top-20">
          <h2 class="font-display text-lg font-semibold text-surface-100 mb-4 flex items-center gap-2">
            <span aria-hidden="true">🛒</span> Ingredients
          </h2>
          <ul class="space-y-2.5" role="list">
            <li
              v-for="(ingredient, idx) in recipe.ingredients"
              :key="idx"
              class="flex items-start gap-3 text-sm text-surface-300 leading-relaxed"
            >
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0" aria-hidden="true"></span>
              <span>{{ ingredient }}</span>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Steps (main) -->
      <section class="md:col-span-3" aria-label="Instructions">
        <h2 class="font-display text-lg font-semibold text-surface-100 mb-4 flex items-center gap-2">
          <span aria-hidden="true">👨‍🍳</span> Instructions
        </h2>
        <ol class="space-y-4" role="list">
          <li
            v-for="(step, idx) in recipe.steps"
            :key="idx"
            class="flex gap-4"
          >
            <span
              class="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-500/15 border border-hairline border-accent-500/30 flex items-center justify-center text-sm font-semibold text-accent-300"
              aria-hidden="true"
            >
              {{ idx + 1 }}
            </span>
            <p class="text-surface-200 text-sm leading-relaxed pt-1">
              {{ step }}
            </p>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>
