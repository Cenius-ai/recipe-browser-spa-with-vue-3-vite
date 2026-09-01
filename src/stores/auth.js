import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token') || null)

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  function init() {
    if (token.value) {
      try {
        const stored = localStorage.getItem('auth_user')
        if (stored) {
          user.value = JSON.parse(stored)
        } else {
          token.value = null
          localStorage.removeItem('auth_token')
        }
      } catch {
        logout()
      }
    }
  }

  function login(email, password) {
    if (email === 'cenius@cenius.ai' && password === 'cenius') {
      const demoUser = {
        email: 'cenius@cenius.ai',
        username: 'cenius',
        displayName: 'Cenius',
        avatar: null
      }
      user.value = demoUser
      token.value = 'demo-token-cenius'
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('auth_user', JSON.stringify(demoUser))
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password. Try the demo account.' }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  // Initialize on creation
  init()

  return { user, token, isLoggedIn, login, logout, init }
})
