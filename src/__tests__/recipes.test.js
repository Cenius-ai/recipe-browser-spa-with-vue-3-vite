import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRecipesStore } from '@/stores/recipes'

describe('Recipes Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('loads all 24 recipes from seed data', () => {
    const store = useRecipesStore()
    expect(store.recipes).toHaveLength(24)
  })

  it('returns correct categories', () => {
    const store = useRecipesStore()
    expect(store.categories).toEqual(['breakfast', 'dessert', 'dinner', 'lunch'])
  })

  it('filters recipes by search query matching title', () => {
    const store = useRecipesStore()
    store.setSearchQuery('omelette')
    expect(store.filteredRecipes.length).toBeGreaterThanOrEqual(1)
    expect(store.filteredRecipes[0].title.toLowerCase()).toContain('omelette')
  })

  it('filters recipes by search query matching ingredient', () => {
    const store = useRecipesStore()
    store.setSearchQuery('avocado')
    const results = store.filteredRecipes
    expect(results.length).toBeGreaterThanOrEqual(1)
    // Every result should have 'avocado' somewhere (title, desc, ingredients, or tags)
    results.forEach(r => {
      const haystack = [
        r.title, r.description, ...r.ingredients, ...(r.tags || [])
      ].join(' ').toLowerCase()
      expect(haystack).toContain('avocado')
    })
  })

  it('filters recipes by category', () => {
    const store = useRecipesStore()
    store.setCategory('breakfast')
    store.filteredRecipes.forEach(r => {
      expect(r.category).toBe('breakfast')
    })
  })

  it('combines search + category filter', () => {
    const store = useRecipesStore()
    store.setCategory('breakfast')
    store.setSearchQuery('egg')
    store.filteredRecipes.forEach(r => {
      expect(r.category).toBe('breakfast')
      const haystack = [r.title, r.description, ...r.ingredients].join(' ').toLowerCase()
      expect(haystack).toContain('egg')
    })
  })

  it('getRecipeById returns correct recipe', () => {
    const store = useRecipesStore()
    const recipe = store.getRecipeById(1)
    expect(recipe).toBeTruthy()
    expect(recipe.title).toBe('Classic French Omelette')
  })

  it('getRecipeById returns null for missing id', () => {
    const store = useRecipesStore()
    expect(store.getRecipeById(9999)).toBeNull()
  })

  it('getRecipesByCategory returns only matching recipes', () => {
    const store = useRecipesStore()
    const desserts = store.getRecipesByCategory('dessert')
    expect(desserts.length).toBeGreaterThan(0)
    desserts.forEach(r => expect(r.category).toBe('dessert'))
  })

  it('getCategoryLabel formats slugs correctly', () => {
    const store = useRecipesStore()
    expect(store.getCategoryLabel('breakfast')).toBe('Breakfast')
    expect(store.getCategoryLabel('dinner')).toBe('Dinner')
    expect(store.getCategoryLabel('unknown')).toBe('Unknown')
  })

  it('clearFilters resets search and category', () => {
    const store = useRecipesStore()
    store.setSearchQuery('chicken')
    store.setCategory('dinner')
    store.clearFilters()
    expect(store.searchQuery).toBe('')
    expect(store.activeCategory).toBeNull()
    expect(store.filteredRecipes).toHaveLength(24)
  })

  it('search is case-insensitive', () => {
    const store = useRecipesStore()
    store.setSearchQuery('CHICKEN')
    expect(store.filteredRecipes.length).toBeGreaterThan(0)
    store.setSearchQuery('chicken')
    const lowerCount = store.filteredRecipes.length
    store.setSearchQuery('CHICKEN')
    expect(store.filteredRecipes.length).toBe(lowerCount)
  })
})
