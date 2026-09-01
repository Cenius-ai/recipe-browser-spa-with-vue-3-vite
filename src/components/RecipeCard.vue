<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

const router = useRouter()

function goToRecipe() {
  router.push({ name: 'recipe-detail', params: { id: props.recipe.id } })
}

function getImageFallback(title) {
  const colors = ['#4675d8', '#8b5cf6', '#a6846f', '#5e4c43', '#605753']
  const idx = title.length % colors.length
  return colors[idx]
}
</script>

<template>
  <article
    @click="goToRecipe"
    class="card-interactive cursor-pointer group overflow-hidden flex flex-col"
    role="button"
    :aria-label="`View recipe: ${recipe.title}`"
    tabindex="0"
    @keydown.enter="goToRecipe"
    @keydown.space.prevent="goToRecipe"
  >
    <!-- Image area -->
    <div class="relative aspect-[4/3] overflow-hidden bg-surface-800">
      <div
        class="absolute inset-0 flex items-center justify-center text-5xl"
        :style="{ backgroundColor: getImageFallback(recipe.title) + '20' }"
      >
        <span aria-hidden="true">{{ recipe.tags?.[0] === 'dessert' ? '🍰' : recipe.tags?.[0] === 'breakfast' ? '🥞' : recipe.tags?.[0] === 'soup' ? '🍲' : '🍽️' }}</span>
      </div>
      <img
        :src="recipe.imageUrl"
        :alt="recipe.title"
        class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity"
        loading="lazy"
        @error="$event.target.style.display = 'none'"
      />
      <!-- Category badge -->
      <span class="absolute top-3 left-3 badge-accent capitalize">
        {{ recipe.category }}
      </span>
      <!-- Cook time -->
      <span class="absolute bottom-3 right-3 badge-surface text-[11px]">
        {{ recipe.cookTime }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-2 p-4 flex-1">
      <h3 class="font-display font-semibold text-surface-100 text-base leading-snug group-hover:text-accent-400 transition-colors line-clamp-2">
        {{ recipe.title }}
      </h3>
      <p class="text-sm text-surface-400 leading-relaxed line-clamp-2 flex-1">
        {{ recipe.description }}
      </p>
      <div class="flex items-center gap-2 mt-1">
        <span class="text-xs text-surface-500">{{ recipe.servings }} {{ recipe.servings === 1 ? 'serving' : 'servings' }}</span>
        <span class="text-surface-600">·</span>
        <span class="text-xs text-surface-500 capitalize">{{ recipe.difficulty }}</span>
        <span v-if="recipe.tags?.length" class="flex-1"></span>
        <span
          v-for="tag in recipe.tags?.slice(0, 2)"
          :key="tag"
          class="text-[10px] px-2 py-0.5 rounded-full bg-surface-700 text-surface-400"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>
