import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import recipesData from '@/data/recipes.json'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref(recipesData)
  const searchQuery = ref('')
  const activeCategory = ref(null)

  const categories = computed(() => {
    const cats = [...new Set(recipes.value.map(r => r.category))]
    return cats.sort()
  })

  const filteredRecipes = computed(() => {
    let result = recipes.value

    if (activeCategory.value) {
      result = result.filter(r => r.category === activeCategory.value)
    }

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      result = result.filter(r => {
        const titleMatch = r.title.toLowerCase().includes(q)
        const descMatch = r.description.toLowerCase().includes(q)
        const ingredientMatch = r.ingredients.some(i => i.toLowerCase().includes(q))
        const tagMatch = r.tags?.some(t => t.toLowerCase().includes(q))
        return titleMatch || descMatch || ingredientMatch || tagMatch
      })
    }

    return result
  })

  function getRecipeById(id) {
    return recipes.value.find(r => r.id === Number(id)) || null
  }

  function getRecipesByCategory(slug) {
    return recipes.value.filter(r => r.category === slug)
  }

  function getCategoryLabel(slug) {
    const labels = {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      dessert: 'Dessert'
    }
    return labels[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)
  }

  function setSearchQuery(query) {
    searchQuery.value = query
  }

  function setCategory(category) {
    activeCategory.value = category
  }

  function clearFilters() {
    searchQuery.value = ''
    activeCategory.value = null
  }

  return {
    recipes,
    searchQuery,
    activeCategory,
    categories,
    filteredRecipes,
    getRecipeById,
    getRecipesByCategory,
    getCategoryLabel,
    setSearchQuery,
    setCategory,
    clearFilters
  }
})
