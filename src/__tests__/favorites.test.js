import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = String(value) }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: vi.fn(() => { store = {} })
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

// Mock window.addEventListener for storage events
const listeners = {}
global.window = {
  addEventListener: vi.fn((event, handler) => {
    listeners[event] = handler
  }),
  removeEventListener: vi.fn()
}

describe('Favorites Store', () => {
  beforeEach(() => {
    localStorageMock.clear()
    Object.keys(listeners).forEach(k => delete listeners[k])
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('starts with empty favorites when localStorage is empty', () => {
    const store = useFavoritesStore()
    expect(store.favoriteIds).toEqual([])
  })

  it('loads favorites from localStorage on init', () => {
    localStorageMock.setItem('favorites', JSON.stringify([1, 3, 5]))
    const store = useFavoritesStore()
    expect(store.favoriteIds).toEqual([1, 3, 5])
  })

  it('isFavorite returns true for favorited ids', () => {
    localStorageMock.setItem('favorites', JSON.stringify([2, 4]))
    const store = useFavoritesStore()
    expect(store.isFavorite(2)).toBe(true)
    expect(store.isFavorite(4)).toBe(true)
    expect(store.isFavorite(1)).toBe(false)
  })

  it('toggleFavorite adds new favorites', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(7)
    expect(store.favoriteIds).toContain(7)
    expect(store.isFavorite(7)).toBe(true)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([7]))
  })

  it('toggleFavorite removes existing favorites', () => {
    localStorageMock.setItem('favorites', JSON.stringify([7, 8]))
    const store = useFavoritesStore()
    store.toggleFavorite(7)
    expect(store.favoriteIds).not.toContain(7)
    expect(store.favoriteIds).toContain(8)
    expect(store.isFavorite(7)).toBe(false)
  })

  it('toggleFavorite handles string ids', () => {
    const store = useFavoritesStore()
    store.toggleFavorite('3')
    expect(store.isFavorite(3)).toBe(true)
    expect(store.isFavorite('3')).toBe(true)
  })

  it('persists after toggle', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(10)
    store.toggleFavorite(20)
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2)
    expect(store.favoriteIds).toEqual([10, 20])
  })

  it('handles storage events from other tabs', () => {
    const store = useFavoritesStore()
    expect(store.favoriteIds).toEqual([])

    // Simulate a storage event from another tab
    if (listeners.storage) {
      listeners.storage({ key: 'favorites', newValue: JSON.stringify([42, 99]) })
    }

    expect(store.favoriteIds).toEqual([42, 99])
  })
})
