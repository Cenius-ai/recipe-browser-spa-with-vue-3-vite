import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

// Mock localStorage
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

describe('Auth Store', () => {
  beforeEach(() => {
    localStorageMock.clear()
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('starts logged out with empty localStorage', () => {
    const auth = useAuthStore()
    expect(auth.isLoggedIn).toBe(false)
    expect(auth.user).toBeNull()
    expect(auth.token).toBeNull()
  })

  it('starts logged in when auth_token exists in localStorage', () => {
    localStorageMock.setItem('auth_token', 'demo-token-cenius')
    localStorageMock.setItem('auth_user', JSON.stringify({
      email: 'cenius@cenius.ai',
      username: 'cenius',
      displayName: 'Cenius'
    }))

    const auth = useAuthStore()
    expect(auth.isLoggedIn).toBe(true)
    expect(auth.user.email).toBe('cenius@cenius.ai')
    expect(auth.user.displayName).toBe('Cenius')
  })

  it('login succeeds with correct demo credentials', () => {
    const auth = useAuthStore()
    const result = auth.login('cenius@cenius.ai', 'cenius')

    expect(result.success).toBe(true)
    expect(auth.isLoggedIn).toBe(true)
    expect(auth.user.email).toBe('cenius@cenius.ai')
    expect(auth.user.username).toBe('cenius')
    expect(auth.token).toBe('demo-token-cenius')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', 'demo-token-cenius')
  })

  it('login fails with wrong password', () => {
    const auth = useAuthStore()
    const result = auth.login('cenius@cenius.ai', 'wrong')

    expect(result.success).toBe(false)
    expect(result.error).toBeTruthy()
    expect(auth.isLoggedIn).toBe(false)
  })

  it('login fails with wrong email', () => {
    const auth = useAuthStore()
    const result = auth.login('other@example.com', 'cenius')

    expect(result.success).toBe(false)
    expect(auth.isLoggedIn).toBe(false)
  })

  it('logout clears user and token from store and localStorage', () => {
    const auth = useAuthStore()
    auth.login('cenius@cenius.ai', 'cenius')
    expect(auth.isLoggedIn).toBe(true)

    auth.logout()

    expect(auth.isLoggedIn).toBe(false)
    expect(auth.user).toBeNull()
    expect(auth.token).toBeNull()
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_token')
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_user')
  })
})
