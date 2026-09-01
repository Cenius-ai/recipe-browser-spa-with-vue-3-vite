import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useRecipesStore } from '@/stores/recipes'
import CategoryFilter from '@/components/CategoryFilter.vue'

describe('CategoryFilter', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  function mountFilter() {
    return mount(CategoryFilter, {
      global: {
        stubs: { 'router-link': true }
      }
    })
  }

  it('renders "All" button and all categories', () => {
    const wrapper = mountFilter()
    const buttons = wrapper.findAll('button')
    // All + breakfast, dessert, dinner, lunch = 5
    expect(buttons).toHaveLength(5)
  })

  it('"All" button is active by default', () => {
    const wrapper = mountFilter()
    const allBtn = wrapper.findAll('button')[0]
    expect(allBtn.text().trim()).toBe('All')
    // Should have active styling (bg-accent class)
    expect(allBtn.classes().some(c => c.includes('bg-accent') || c.includes('text-accent'))).toBe(true)
  })

  it('clicking a category activates it', async () => {
    const wrapper = mountFilter()
    const store = useRecipesStore()

    // Find the "Lunch" button
    const lunchBtn = wrapper.findAll('button').find(b => b.text().includes('Lunch'))
    expect(lunchBtn).toBeTruthy()
    await lunchBtn.trigger('click')

    expect(store.activeCategory).toBe('lunch')
  })

  it('clicking active category deactivates it', async () => {
    const wrapper = mountFilter()
    const store = useRecipesStore()

    // Activate breakfast
    const breakfastBtn = wrapper.findAll('button').find(b => b.text().includes('Breakfast'))
    await breakfastBtn.trigger('click')
    expect(store.activeCategory).toBe('breakfast')

    // Click breakfast again to deactivate
    await breakfastBtn.trigger('click')
    expect(store.activeCategory).toBeNull()
  })

  it('"All" button clears category', async () => {
    const wrapper = mountFilter()
    const store = useRecipesStore()

    // First activate a category
    store.setCategory('dinner')
    expect(store.activeCategory).toBe('dinner')

    // Click All
    const allBtn = wrapper.findAll('button')[0]
    await allBtn.trigger('click')
    expect(store.activeCategory).toBeNull()
  })

  it('has group role for accessibility', () => {
    const wrapper = mountFilter()
    expect(wrapper.find('[role="group"]').exists()).toBe(true)
  })

  it('has aria-label for accessibility', () => {
    const wrapper = mountFilter()
    expect(wrapper.find('[aria-label="Filter by category"]').exists()).toBe(true)
  })

  it('renders category emojis', () => {
    const wrapper = mountFilter()
    const html = wrapper.html()
    expect(html).toContain('🌅') // breakfast
    expect(html).toContain('🍰') // dessert
  })
})
