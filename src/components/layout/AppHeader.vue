<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const emit = defineEmits(['toggle-search'])
const menuOpen = ref(false)
const menuRef = ref(null)
const toggleBtnRef = ref(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
  // Return focus to the toggle button
  nextTick(() => {
    toggleBtnRef.value?.focus()
  })
}

function goToLogin() {
  closeMenu()
  router.push('/login')
}

function handleLogout() {
  auth.logout()
  closeMenu()
}

// Focus trap inside the dropdown
function onMenuKeydown(e) {
  if (!menuRef.value) return
  const items = menuRef.value.querySelectorAll('[role="menuitem"]')
  if (items.length === 0) return

  const first = items[0]
  const last = items[items.length - 1]

  if (e.key === 'Escape') {
    e.preventDefault()
    closeMenu()
    return
  }

  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const idx = Array.from(items).indexOf(document.activeElement)
    const next = idx < items.length - 1 ? items[idx + 1] : first
    next.focus()
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const idx = Array.from(items).indexOf(document.activeElement)
    const prev = idx > 0 ? items[idx - 1] : last
    prev.focus()
  }
}

// Auto-focus first menu item when menu opens
watch(menuOpen, (open) => {
  if (open) {
    nextTick(() => {
      const firstItem = menuRef.value?.querySelector('[role="menuitem"]')
      firstItem?.focus()
    })
  }
})
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-hairline border-surface-700 bg-surface-950/90 backdrop-blur-md"
    role="banner"
  >
    <div class="flex items-center justify-between h-14 px-4 max-w-6xl mx-auto">
      <!-- Logo -->
      <router-link
        to="/"
        class="flex items-center gap-2 text-surface-100 hover:text-accent-400 transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        aria-label="Recipe Browser home"
      >
        <span class="text-xl" aria-hidden="true">📖</span>
        <span class="font-display font-semibold text-lg tracking-tight hidden sm:block">
          Recipe Browser
        </span>
      </router-link>

      <!-- Right actions -->
      <div class="flex items-center gap-1">
        <!-- Search toggle (mobile) -->
        <button
          @click="$emit('toggle-search')"
          class="btn-ghost sm:hidden"
          aria-label="Toggle search"
        >
          <span class="text-lg" aria-hidden="true">🔍</span>
        </button>

        <!-- User menu -->
        <div class="relative">
          <button
            ref="toggleBtnRef"
            @click="toggleMenu"
            class="btn-ghost"
            :aria-label="auth.isLoggedIn ? 'User menu' : 'Login'"
            aria-haspopup="true"
            :aria-expanded="menuOpen"
          >
            <span v-if="auth.isLoggedIn" class="flex items-center gap-2">
              <span class="w-7 h-7 rounded-full bg-accent-500/20 border border-hairline border-accent-500/40 flex items-center justify-center text-xs font-medium text-accent-300">
                {{ auth.user?.displayName?.charAt(0) || 'C' }}
              </span>
              <span class="hidden sm:inline text-sm text-surface-200">{{ auth.user?.displayName }}</span>
            </span>
            <span v-else class="text-sm text-surface-300">Login</span>
          </button>

          <!-- Dropdown -->
          <div
            v-if="menuOpen"
            ref="menuRef"
            class="absolute right-0 top-full mt-1 w-48 rounded-lg border border-hairline border-surface-600 bg-surface-900 shadow-lg py-1 z-50"
            role="menu"
            @keydown="onMenuKeydown"
          >
            <template v-if="auth.isLoggedIn">
              <div class="px-4 py-2 border-b border-hairline border-surface-700">
                <p class="text-sm font-medium text-surface-100">{{ auth.user?.displayName }}</p>
                <p class="text-xs text-surface-400">{{ auth.user?.email }}</p>
              </div>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-surface-300 hover:bg-surface-800 hover:text-surface-100 transition-colors focus:outline-none focus:bg-surface-800 focus:text-surface-100"
                role="menuitem"
              >
                Sign out
              </button>
            </template>
            <template v-else>
              <button
                @click="goToLogin"
                class="w-full text-left px-4 py-2 text-sm text-surface-300 hover:bg-surface-800 hover:text-surface-100 transition-colors focus:outline-none focus:bg-surface-800 focus:text-surface-100"
                role="menuitem"
              >
                Sign in
              </button>
            </template>
          </div>

          <!-- Backdrop to close -->
          <div
            v-if="menuOpen"
            class="fixed inset-0 z-[-1]"
            @click="closeMenu"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>
  </header>
</template>
