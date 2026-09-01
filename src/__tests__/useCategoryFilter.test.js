import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRecipesStore } from '@/stores/recipes'
import { useCategoryFilter } from '@/composables/useCategoryFilter'

describe('useCategoryFilter composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('exposes categories from the store', () => {
    const { categories } = useCategoryFilter()
    expect(categories.value).toEqual(['breakfast', 'dessert', 'dinner', 'lunch'])
  })

  it('starts with null currentCategory', () => {
    const { currentCategory } = useCategoryFilter()
    expect(currentCategory.value).toBeNull()
  })

  it('selectCategory sets the category in the store', () => {
    const store = useRecipesStore()
    const { selectCategory, currentCategory } = useCategoryFilter()

    selectCategory('breakfast')
    expect(currentCategory.value).toBe('breakfast')
    expect(store.activeCategory).toBe('breakfast')
  })

  it('selectCategory toggles off when clicking the same category', () => {
    const store = useRecipesStore()
    const { selectCategory, currentCategory } = useCategoryFilter()

    selectCategory('dessert')
    expect(currentCategory.value).toBe('dessert')

    selectCategory('dessert')
    expect(currentCategory.value).toBeNull()
    expect(store.activeCategory).toBeNull()
  })

  it('selectCategory switches between categories', () => {
    const { selectCategory, currentCategory } = useCategoryFilter()

    selectCategory('breakfast')
    expect(currentCategory.value).toBe('breakfast')

    selectCategory('dinner')
    expect(currentCategory.value).toBe('dinner')
  })

  it('clearCategory resets to null', () => {
    const store = useRecipesStore()
    const { selectCategory, clearCategory, currentCategory } = useCategoryFilter()

    selectCategory('lunch')
    expect(currentCategory.value).toBe('lunch')

    clearCategory()
    expect(currentCategory.value).toBeNull()
    expect(store.activeCategory).toBeNull()
  })
})
