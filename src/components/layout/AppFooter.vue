<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = [
  { name: 'Browse', path: '/', icon: '🏠' },
  { name: 'Favorites', path: '/favorites', icon: '❤️' },
  { name: 'About', path: '/about', icon: 'ℹ️' }
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function goTo(path) {
  router.push(path)
}
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 border-t border-hairline border-surface-700 bg-surface-900/95 backdrop-blur-md"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="flex items-center justify-around h-16 max-w-lg mx-auto px-2 safe-pb">
      <button
        v-for="tab in tabs"
        :key="tab.path"
        @click="goTo(tab.path)"
        :class="[
          'relative flex flex-col items-center justify-center gap-0.5 min-h-[48px] min-w-[64px] px-2 py-1 rounded-lg transition-all duration-200',
          isActive(tab.path)
            ? 'text-accent-400'
            : 'text-surface-400 hover:text-surface-200'
        ]"
        :aria-label="tab.name"
        :aria-current="isActive(tab.path) ? 'page' : undefined"
      >
        <span class="text-xl" aria-hidden="true">{{ tab.icon }}</span>
        <span class="text-[10px] font-medium tracking-wide uppercase">{{ tab.name }}</span>
        <span
          v-if="isActive(tab.path)"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent-400 rounded-full"
        ></span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.safe-pb {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>
