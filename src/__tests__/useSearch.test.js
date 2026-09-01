import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRecipesStore } from '@/stores/recipes'
import { useSearch } from '@/composables/useSearch'

describe('useSearch composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  it('returns query ref and onInput/clear helpers', () => {
    const { query, onInput, clear } = useSearch()
    expect(query.value).toBe('')
    expect(typeof onInput).toBe('function')
    expect(typeof clear).toBe('function')
  })

  it('onInput updates query immediately but debounces store update', () => {
    const store = useRecipesStore()
    const { query, onInput } = useSearch()

    onInput('chicken')
    expect(query.value).toBe('chicken')
    // Store should NOT be updated yet (debounced)
    expect(store.searchQuery).toBe('')

    // Advance past debounce
    vi.advanceTimersByTime(250)
    expect(store.searchQuery).toBe('chicken')
  })

  it('clear resets query and store', () => {
    const store = useRecipesStore()
    store.setSearchQuery('something')
    const { query, clear } = useSearch()

    clear()
    expect(query.value).toBe('')
    expect(store.searchQuery).toBe('')
  })

  it('debounces rapid input', () => {
    const store = useRecipesStore()
    const { onInput } = useSearch()

    onInput('c')
    onInput('ch')
    onInput('chi')
    onInput('chic')
    onInput('chick')

    // Only the last value should end up in the store
    vi.advanceTimersByTime(250)
    expect(store.searchQuery).toBe('chick')
  })

  it('syncs with store when store changes externally', async () => {
    const store = useRecipesStore()
    const { query } = useSearch()

    store.setSearchQuery('avocado')
    // Wait for the watcher
    await vi.runAllTimersAsync()
    expect(query.value).toBe('avocado')
  })
})
