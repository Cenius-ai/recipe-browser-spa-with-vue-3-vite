<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const router = useRouter()
const route = useRoute()
const searchExpanded = ref(false)
const mainRef = ref(null)

function toggleSearch() {
  searchExpanded.value = !searchExpanded.value
}

// Focus management: after each route change, move focus to the main content
// so screen-reader users land on the new page content.
watch(
  () => route.fullPath,
  () => {
    // Use nextTick-like microtask to let the DOM settle after the transition
    setTimeout(() => {
      if (mainRef.value) {
        // Set tabindex=-1 so we can programmatically focus a non-interactive element
        mainRef.value.setAttribute('tabindex', '-1')
        mainRef.value.focus({ preventScroll: true })
        // Remove tabindex after focus so the element isn't in the normal tab order
        mainRef.value.removeAttribute('tabindex')
      }
    }, 100)
  }
)

function focusMain() {
  if (mainRef.value) {
    mainRef.value.setAttribute('tabindex', '-1')
    mainRef.value.focus({ preventScroll: false })
  }
}
</script>

<template>
  <div class="min-h-screen bg-surface-950 flex flex-col">
    <!-- Skip to content link for keyboard users -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]
             focus:px-4 focus:py-2 focus:bg-accent-500 focus:text-white focus:rounded-lg
             focus:outline-none focus:ring-2 focus:ring-accent-400"
      @click.prevent="focusMain"
    >
      Skip to main content
    </a>

    <AppHeader @toggle-search="toggleSearch" />

    <main
      id="main-content"
      ref="mainRef"
      class="flex-1 px-4 py-4 max-w-6xl mx-auto w-full pb-24 focus:outline-none"
    >
      <router-view v-slot="{ Component }">
        <transition
          name="page"
          mode="out-in"
        >
          <component :is="Component" :search-expanded="searchExpanded" />
        </transition>
      </router-view>
    </main>

    <AppFooter />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
