<template>
  <nav class="dashboard-nav-bg !fixed !top-0 !left-0 !right-0 !z-50 !flex !items-center !justify-between !px-4 !py-3 !md:px-6 !md:py-4">
    <!-- Left: Logo -->
    <div class="!flex !items-center">
      <img src="@/assets/img/Logo-somnus.svg" alt="Somnus" class="nav-logo-filter !h-8 !w-auto !md:h-10">
    </div>
    
    <!-- Right: Dynamic side based on page type -->
    <div class="!flex !items-center !gap-2 !md:gap-4">
      <!-- Dashboard navigation -->
      <template v-if="navType === 'dashboard'">
        <RouterLink to="/sleep-logs" class="nav-button flex !items-center !gap-2 !p-2 !md:p-6 !border !rounded-lg !no-underline !cursor-pointer !transition-all !duration-300 !hover:-translate-y-0.5">
          <img src="@/assets/img/list.svg" alt="" class="nav-icon flex-shrink-0 !w-4 !h-4 !md:w-5 !md:h-5">
          <span class="!hiddensm:inline">View all</span>
        </RouterLink>

        <button @click="$emit('newLog')" class="nav-button flex !items-center !gap-2 !p-2 !md:p-6 !border !rounded-lg !cursor-pointer !transition-all !duration-300 !hover:-translate-y-0.5">
          <img src="@/assets/img/new.svg" alt="" class="nav-icon flex-shrink-0 !w-4 !h-4 !md:w-5 !md:h-5">
          <span class="hidden sm:inline">New log</span>
        </button>

        <AuthButton :showIcon="true" />
      </template>
      
      <!-- List & Detail navigation -->
      <template v-if="navType === 'logs'">
        <RouterLink to="/dashboard" class="nav-button flex !items-center !gap-2 !p-2 !md:p-6 !border !rounded-lg !no-underline !cursor-pointer !transition-all !duration-300 !hover:-translate-y-0.5">
          <img src="@/assets/img/overview.svg" alt="" class="nav-icon flex-shrink-0 !w-4 !h-4 !md:w-5 !md:h-5">
          <span class="hidden sm:inline">Overview</span>
        </RouterLink>

        <button @click="$emit('newLog')" class="nav-button flex !items-center !gap-2 !p-2 !md:p-6 !border !rounded-lg !cursor-pointer !transition-all !duration-300 !hover:-translate-y-0.5">
          <img src="@/assets/img/new.svg" alt="" class="nav-icon flex-shrink-0 !w-4 !h-4 !md:w-5 !md:h-5">
          <span class="hidden sm:inline">New log</span>
        </button>

        <AuthButton :showIcon="true" />
      </template>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AuthButton from './AuthButton.vue'

const props = defineProps({
  navType: {
    type: String,
    required: true,
    validator: (value) => ['dashboard', 'logs'].includes(value)
  }
})

defineEmits(['newLog'])
</script>

<style scoped>
/* Dashboard background - only custom colors */
.dashboard-nav-bg {
  background-color: var(--color-midnight);
  border-bottom: 1px solid color-mix(in srgb, #8387C3 20%, transparent);
}

/* Navigation buttons - only custom variables */
.nav-button {
  background-color: transparent;
  border-color: var(--color-cream);
  color: var(--color-cream);
  font-family: var(--font-sans);
  font-weight: 500;
}

.nav-button:hover {
  background-color: color-mix(in srgb, var(--color-lavender) 10%, transparent);
  border-color: var(--color-cream);
  box-shadow: 0 4px 12px rgba(131, 135, 195, 0.2);
}

.nav-button.router-link-active {
  background-color: color-mix(in srgb, var(--color-lavender) 15%, transparent);
  border-color: var(--color-cream);
}

/* AuthButton styling for DASHBOARD - only custom variables */
.auth-button {
  background-color: transparent;
  border-color: var(--color-cream);
  color: var(--color-cream);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.auth-button:hover {
  background-color: color-mix(in srgb, var(--color-lavender) 10%, transparent);
  border-color: var(--color-cream);
  box-shadow: 0 4px 12px rgba(131, 135, 195, 0.2);
}

/* Icon styling - only custom colors */
.nav-icon {
  color: var(--color-cream);
}

/* Mobile responsive - only custom spacing if needed */
@media (max-width: 640px) {
  .dashboard-nav-bg {
    padding: 0.5rem 0.75rem;
  }
}

/* Hide text on mobile - could be moved to Tailwind but keeping for clarity */
@media (max-width: 480px) {
  .nav-button span {
    display: none;
  }

  .nav-button {
    padding: 0.5rem;
  }
  
  .auth-button span {
    display: none;
  }
}
</style>