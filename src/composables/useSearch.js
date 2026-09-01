import { ref, watch } from 'vue'
import { useRecipesStore } from '@/stores/recipes'

export function useSearch() {
  const store = useRecipesStore()
  const query = ref(store.searchQuery)
  let debounceTimer = null

  function onInput(value) {
    query.value = value
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      store.setSearchQuery(value)
    }, 200)
  }

  function clear() {
    query.value = ''
    store.setSearchQuery('')
  }

  // Sync with store (e.g. on page navigation)
  watch(() => store.searchQuery, (newVal) => {
    if (query.value !== newVal) {
      query.value = newVal
    }
  })

  return { query, onInput, clear }
}
