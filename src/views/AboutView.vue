<script setup>
</script>

<template>
  <div class="space-y-8 max-w-2xl mx-auto">
    <div class="py-4">
      <h1 class="font-display text-3xl sm:text-4xl font-bold text-surface-100">
        About <span class="text-accent-400">Recipe Browser</span>
      </h1>
    </div>

    <div class="space-y-6 text-surface-300 leading-relaxed">
      <section class="card p-6 space-y-3">
        <h2 class="font-display text-xl font-semibold text-surface-100">What is this?</h2>
        <p>
          Recipe Browser is a beautifully crafted recipe discovery app built with Vue 3.
          It showcases a curated collection of recipes across multiple categories — from quick breakfasts
          to elaborate dinners and indulgent desserts.
        </p>
        <p>
          This is a <strong class="text-accent-300">demo application</strong> designed to demonstrate
          modern frontend development practices: client-side search, category filtering, favorites with
          localStorage persistence, and a polished editorial design system.
        </p>
      </section>

      <section class="card p-6 space-y-3">
        <h2 class="font-display text-xl font-semibold text-surface-100">Features</h2>
        <ul class="space-y-2" role="list">
          <li v-for="feature in [
            'Browse 24 hand-picked recipes across 4 categories',
            'Real-time search by title, ingredient, or tag',
            'Category filtering (breakfast, lunch, dinner, dessert)',
            'Detailed recipe view with ingredients and step-by-step instructions',
            'Save favorites (requires demo login) persisted to localStorage',
            'Responsive design — works on mobile, tablet, and desktop',
            'Soft dark theme with editorial typography'
          ]" :key="feature" class="flex items-start gap-2 text-sm">
            <span class="text-accent-400 mt-0.5" aria-hidden="true">✦</span>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </section>

      <section class="card p-6 space-y-3">
        <h2 class="font-display text-xl font-semibold text-surface-100">Tech Stack</h2>
        <div class="flex flex-wrap gap-2">
          <span class="badge-accent">Vue 3</span>
          <span class="badge-accent">Vite</span>
          <span class="badge-accent">Pinia</span>
          <span class="badge-accent">Vue Router</span>
          <span class="badge-accent">Tailwind CSS</span>
          <span class="badge-accent">Composition API</span>
        </div>
      </section>

      <section class="card p-6 space-y-3">
        <h2 class="font-display text-xl font-semibold text-surface-100">Demo Account</h2>
        <p class="text-sm">
          Use the demo account to access the favorites feature:
        </p>
        <div class="bg-surface-800 rounded-lg p-4 font-mono text-sm space-y-1">
          <p><span class="text-surface-400">Email:</span> <span class="text-accent-300">cenius@cenius.ai</span></p>
          <p><span class="text-surface-400">Password:</span> <span class="text-accent-300">cenius</span></p>
        </div>
        <p class="text-xs text-surface-500">
          Note: This is a purely client-side demo. Authentication is simulated and no real credentials are stored or transmitted.
        </p>
      </section>
    </div>
  </div>
</template>
