<script setup>
import { useFavoritesStore } from '@/stores/favorites'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const props = defineProps({
  recipeId: {
    type: [Number, String],
    required: true
  },
  size: {
    type: String,
    default: 'md'
  }
})

const favorites = useFavoritesStore()
const auth = useAuthStore()
const router = useRouter()

const isFav = favorites.isFavorite(props.recipeId)

function handleToggle() {
  if (!auth.isLoggedIn) {
    router.push({ name: 'login', query: { redirect: window.location.pathname } })
    return
  }
  favorites.toggleFavorite(props.recipeId)
}

const sizeClasses = {
  sm: 'min-h-[36px] min-w-[36px] text-lg p-1',
  md: 'min-h-[48px] min-w-[48px] text-xl p-2',
  lg: 'min-h-[56px] min-w-[56px] text-2xl p-3'
}
</script>

<template>
  <button
    @click.stop="handleToggle"
    :class="[
      'rounded-lg border transition-all duration-200 flex items-center justify-center',
      sizeClasses[size] || sizeClasses.md,
      isFav
        ? 'bg-red-500/15 border-red-500/30 text-red-400 hover:bg-red-500/20'
        : 'bg-surface-800 border-surface-600 text-surface-400 hover:bg-surface-700 hover:text-surface-200'
    ]"
    :aria-label="isFav ? 'Remove from favorites' : 'Add to favorites'"
    :title="auth.isLoggedIn ? (isFav ? 'Remove from favorites' : 'Add to favorites') : 'Login to save favorites'"
  >
    {{ isFav ? '❤️' : '🤍' }}
  </button>
</template>
