import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useFavoritesStore } from '@/stores/favorites'
import FavoritesToggle from '@/components/FavoritesToggle.vue'

// Mock localStorage
const storage = {}
const localStorageMock = {
  getItem: vi.fn((key) => storage[key] ?? null),
  setItem: vi.fn((key, value) => { storage[key] = String(value) }),
  removeItem: vi.fn((key) => { delete storage[key] }),
  clear: vi.fn(() => { for (const k of Object.keys(storage)) delete storage[k] })
}
Object.defineProperty(global, 'localStorage', { value: localStorageMock })

// Mock window for storage events
global.window = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn()
}

// Stub vue-router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush })
}))

Object.defineProperty(global.window, 'location', {
  value: { pathname: '/recipe/1' },
  writable: true
})

describe('FavoritesToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.keys(storage).forEach(k => delete storage[k])
    setActivePinia(createPinia())
  })

  function mountToggle(props = {}) {
    return mount(FavoritesToggle, {
      props: { recipeId: 1, size: 'md', ...props },
      global: {
        stubs: { 'router-link': true }
      }
    })
  }

  it('shows unfilled heart when not favorited', () => {
    const wrapper = mountToggle()
    expect(wrapper.text()).toContain('🤍')
  })

  it('shows filled heart when favorited', () => {
    const favorites = useFavoritesStore()
    favorites.toggleFavorite(1)

    const wrapper = mountToggle()
    expect(wrapper.text()).toContain('❤️')
  })

  it('redirects to login when not authenticated', () => {
    const wrapper = mountToggle()
    // Call handleToggle directly — avoids jsdom MouseEvent constructor issue
    wrapper.vm.handleToggle()
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'login' })
    )
  })

  it('toggles favorite when authenticated', () => {
    const auth = useAuthStore()
    auth.login('cenius@cenius.ai', 'cenius')

    const wrapper = mountToggle()
    wrapper.vm.handleToggle()

    const favorites = useFavoritesStore()
    expect(favorites.isFavorite(1)).toBe(true)
  })

  it('has aria-label for accessibility', () => {
    const wrapper = mountToggle()
    expect(wrapper.attributes('aria-label')).toBeTruthy()
  })

  it('toggles off when already favorited', () => {
    const auth = useAuthStore()
    auth.login('cenius@cenius.ai', 'cenius')
    const favorites = useFavoritesStore()
    favorites.toggleFavorite(1)

    const wrapper = mountToggle()
    expect(wrapper.text()).toContain('❤️')

    wrapper.vm.handleToggle()
    expect(favorites.isFavorite(1)).toBe(false)
  })
})
