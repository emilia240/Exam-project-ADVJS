<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import AuthButton from './components/AuthButton.vue';
import { computed } from 'vue'

const route = useRoute()

// Hide navigation on LoginView
const showNavigation = computed(() => {
  return route.name !== 'login'
}) 
</script>


<template>
  <div class="app-container">
    <!-- use teleport for the new sleep log component, its gut! -->
    <!-- Minimal Navigation -->
    <nav v-if="showNavigation" class="nav-container">
      <div class="nav-links">
        <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>

        <AuthButton />
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: var(--color-background); /* midnight */
}

/* Minimal Navigation */
.nav-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 50;
  padding: var(--spacing-md);
}

.nav-links {
  display: flex;
  gap: var(--spacing-md);
}

.nav-link {
  color: var(--color-text-light);
  font-family: var(--font-sans); 
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
}

.nav-link:hover {
  color: var(--color-lavender);
}

/* Remove active state styling for minimal look */
.nav-link.router-link-active {
  color: var(--color-text-light);
}
</style>