<script setup>
import { computed } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import RecipeCard from '@/components/RecipeCard.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const store = useRecipesStore()
const router = useRouter()

const label = computed(() => store.getCategoryLabel(props.slug))
const recipes = computed(() => store.getRecipesByCategory(props.slug))

if (recipes.value.length === 0) {
  router.replace({ name: 'not-found', params: { pathMatch: [`category/${props.slug}`] } })
}

const categoryEmojis = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  dessert: '🍰'
}
</script>

<template>
  <div class="space-y-5" v-if="recipes.length">
    <!-- Header -->
    <div class="flex items-center gap-3 py-2">
      <button
        @click="router.push('/')"
        class="btn-ghost text-sm"
        aria-label="Back to all recipes"
      >
        ← Back
      </button>
      <span class="text-3xl" aria-hidden="true">{{ categoryEmojis[slug] || '📋' }}</span>
      <div>
        <h1 class="font-display text-2xl sm:text-3xl font-bold text-surface-100 capitalize">
          {{ label }}
        </h1>
        <p class="text-sm text-surface-400">{{ recipes.length }} {{ recipes.length === 1 ? 'recipe' : 'recipes' }}</p>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
  </div>
</template>
