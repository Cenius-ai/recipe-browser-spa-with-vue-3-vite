import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRecipesStore } from './recipes'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteIds = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

  function isFavorite(recipeId) {
    return favoriteIds.value.includes(Number(recipeId))
  }

  function toggleFavorite(recipeId) {
    const id = Number(recipeId)
    const idx = favoriteIds.value.indexOf(id)
    if (idx === -1) {
      favoriteIds.value.push(id)
    } else {
      favoriteIds.value.splice(idx, 1)
    }
    persist()
  }

  function persist() {
    localStorage.setItem('favorites', JSON.stringify(favoriteIds.value))
  }

  function handleStorageChange(e) {
    if (e.key === 'favorites' && e.newValue) {
      try {
        favoriteIds.value = JSON.parse(e.newValue)
      } catch {
        // ignore parse errors
      }
    }
  }

  // Listen for cross-tab changes
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageChange)
  }

  return { favoriteIds, isFavorite, toggleFavorite }
})
