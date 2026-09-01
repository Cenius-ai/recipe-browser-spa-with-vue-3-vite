import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useRecipesStore } from '@/stores/recipes'
import SearchBar from '@/components/SearchBar.vue'

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  function mountBar(props = {}) {
    return mount(SearchBar, {
      props: { expanded: true, ...props },
      global: {
        stubs: { 'router-link': true }
      }
    })
  }

  it('renders search input', () => {
    const wrapper = mountBar()
    const input = wrapper.find('input[type="search"]')
    expect(input.exists()).toBe(true)
  })

  it('has placeholder text', () => {
    const wrapper = mountBar()
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toContain('Search recipes')
  })

  it('accepts user input', async () => {
    const wrapper = mountBar()
    const input = wrapper.find('input')
    await input.setValue('chicken')
    expect(input.element.value).toBe('chicken')
  })

  it('debounces and updates the store', async () => {
    vi.useFakeTimers()
    const wrapper = mountBar()
    const store = useRecipesStore()

    const input = wrapper.find('input')
    await input.setValue('avocado')

    // Store not updated yet (debounce)
    expect(store.searchQuery).toBe('')

    // Advance past debounce
    vi.advanceTimersByTime(250)
    expect(store.searchQuery).toBe('avocado')

    vi.useRealTimers()
  })

  it('shows clear button when query is non-empty', async () => {
    vi.useFakeTimers()
    const wrapper = mountBar()
    const input = wrapper.find('input')
    await input.setValue('test')
    vi.advanceTimersByTime(250)

    // Clear button should appear
    const clearBtn = wrapper.find('button[aria-label="Clear search"]')
    expect(clearBtn.exists()).toBe(true)
    vi.useRealTimers()
  })

  it('clear button resets query and store', async () => {
    vi.useFakeTimers()
    const wrapper = mountBar()
    const store = useRecipesStore()

    const input = wrapper.find('input')
    await input.setValue('test')
    vi.advanceTimersByTime(250)

    const clearBtn = wrapper.find('button[aria-label="Clear search"]')
    await clearBtn.trigger('click')

    expect(input.element.value).toBe('')
    expect(store.searchQuery).toBe('')
    vi.useRealTimers()
  })

  it('has aria-label on input', () => {
    const wrapper = mountBar()
    expect(wrapper.find('input').attributes('aria-label')).toBe('Search recipes')
  })

  it('hides when expanded prop is false', () => {
    const wrapper = mountBar({ expanded: false })
    // The container should have max-h-0
    const container = wrapper.find('div')
    expect(container.classes()).toContain('max-h-0')
  })

  it('shows when expanded prop is true', () => {
    const wrapper = mountBar({ expanded: true })
    const container = wrapper.find('div')
    expect(container.classes()).toContain('max-h-20')
  })
})
