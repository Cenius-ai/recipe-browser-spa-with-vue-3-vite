import { computed } from 'vue'
import { useRecipesStore } from '@/stores/recipes'

export function useCategoryFilter() {
  const store = useRecipesStore()

  const currentCategory = computed(() => store.activeCategory)
  const categories = computed(() => store.categories)

  function selectCategory(slug) {
    store.setCategory(slug === currentCategory.value ? null : slug)
  }

  function clearCategory() {
    store.setCategory(null)
  }

  return { currentCategory, categories, selectCategory, clearCategory }
}
