<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function handleSubmit() {
  error.value = ''
  loading.value = true

  // Simulate network delay
  setTimeout(() => {
    const result = auth.login(email.value, password.value)
    loading.value = false

    if (result.success) {
      const redirect = route.query.redirect || '/'
      router.push(redirect)
    } else {
      error.value = result.error
    }
  }, 400)
}
</script>

<template>
  <div class="max-w-sm mx-auto py-8 sm:py-16">
    <div class="text-center mb-8">
      <p class="text-5xl mb-4">📖</p>
      <h1 class="font-display text-2xl sm:text-3xl font-bold text-surface-100">
        Welcome back
      </h1>
      <p class="text-surface-400 text-sm mt-2">
        Sign in to save your favorite recipes
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="card p-6 space-y-4">
      <!-- Error -->
      <div
        v-if="error"
        class="rounded-lg border border-hairline border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        role="alert"
      >
        {{ error }}
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-surface-300 mb-1.5">
          Email
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="input"
          placeholder="you@example.com"
          required
          autocomplete="email"
        />
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-surface-300 mb-1.5">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="input"
          placeholder="Enter your password"
          required
          autocomplete="current-password"
        />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="btn-primary w-full"
        :disabled="loading"
      >
        <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>

      <!-- Demo hint -->
      <div class="rounded-lg bg-surface-800 p-4 mt-4">
        <p class="text-xs text-surface-400 font-medium uppercase tracking-wide mb-2">Demo Account</p>
        <p class="text-sm text-surface-200">
          <span class="text-surface-400">Email:</span>
          <strong class="text-accent-300 ml-1">cenius@cenius.ai</strong>
        </p>
        <p class="text-sm text-surface-200">
          <span class="text-surface-400">Password:</span>
          <strong class="text-accent-300 ml-1">cenius</strong>
        </p>
      </div>
    </form>

    <p class="text-center text-xs text-surface-500 mt-4">
      This is a demo app. No real authentication — credentials are checked client-side.
    </p>
  </div>
</template>
