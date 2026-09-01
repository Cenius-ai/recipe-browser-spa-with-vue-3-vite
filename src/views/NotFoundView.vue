<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <p class="text-7xl mb-6">🍽️</p>
    <h1 class="font-display text-4xl font-bold text-surface-100 mb-2">404</h1>
    <p class="text-surface-400 text-lg mb-1">Page not found</p>
    <p class="text-surface-500 text-sm mb-8">
      This recipe doesn't exist — or maybe it's still being written.
    </p>
    <button
      @click="router.push('/')"
      class="btn-primary"
    >
      ← Back to browsing
    </button>
  </div>
</template>
