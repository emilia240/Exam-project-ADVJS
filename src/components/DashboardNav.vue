<!-- DashboardNav.vue - Styles AuthButton for Dashboard -->
<template>
  <nav class="dashboard-nav-bg !fixed !top-0 !left-0 !right-0 !z-50 flex !items-center !justify-between !px-4 !py-3 !md:px-6 !md:py-4">
    <!-- Left: Logo -->
    <div class="flex items-center">
      <img src="@/assets/img/Logo-somnus.svg" alt="Somnus" class="!h-8 !w-auto !md:h-10 nav-logo-filter">
    </div>
    
    <!-- Right: Dynamic side based on page type -->
    <div class="flex items-center gap-2 md:gap-4">
      <!-- Dashboard navigation -->
      <template v-if="navType === 'dashboard'">
        <RouterLink to="/sleep-logs" class="nav-button flex items-center gap-2 !p-2 !md:p-6 border rounded-lg">
          <img src="@/assets/img/list.svg" alt="" class="nav-icon flex-shrink-0 w-4 h-4 md:w-5 md:h-5">
          <span class="hidden sm:inline">View all</span>
        </RouterLink>

        <button @click="$emit('newLog')" class="nav-button flex items-center gap-2 !p-2 !md:p-6 border rounded-lg">
          <img src="@/assets/img/new.svg" alt="" class="nav-icon flex-shrink-0 w-4 h-4 md:w-5 md:h-5">
          <span class="hidden sm:inline">New log</span>
        </button>

        <AuthButton :showIcon="true" />
      </template>
      
      <!-- List & Detail navigation -->
      <template v-if="navType === 'logs'">
        <RouterLink to="/dashboard" class="nav-button flex items-center gap-2 !p-2 !md:p-6 border rounded-lg">
          <img src="@/assets/img/overview.svg" alt="" class="nav-icon flex-shrink-0 w-4 h-4 md:w-5 md:h-5">
          <span class="hidden sm:inline">Overview</span>
        </RouterLink>

        <button @click="$emit('newLog')" class="nav-button flex items-center gap-2 !p-2 !md:p-6 border rounded-lg">
          <img src="@/assets/img/new.svg" alt="" class="nav-icon flex-shrink-0 w-4 h-4 md:w-5 md:h-5">
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

defineEmits(['viewAll', 'newLog'])
</script>

<style scoped>
/* Dashboard background */
.dashboard-nav-bg {
  background-color: var(--color-midnight) !important;
  border-bottom: 1px solid color-mix(in srgb, #8387C3 20%, transparent);
}


/* Navigation buttons (including AuthButton in dashboard) */
.nav-button {
  background-color: transparent !important;
  border: 1px solid var(--color-cream) !important;
  color: var(--color-cream) !important;
  font-family: var(--font-sans) !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
}

.nav-button:hover {
  background-color: color-mix(in srgb, var(--color-lavender) 10%, transparent) !important;
  border-color: var(--color-cream) !important;
  box-shadow: 0 4px 12px rgba(131, 135, 195, 0.2) !important;
  transform: translateY(-2px) !important;
}

.nav-button.router-link-active {
  background-color: color-mix(in srgb, var(--color-lavender) 15%, transparent) !important;
  border-color: var(--color-cream) !important;
}

/* AuthButton styling for DASHBOARD (inherits nav-button styles) */
.auth-button {
  background-color: transparent !important;
  border: 1px solid var(--color-cream) !important;
  color: var(--color-cream) !important;
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-sm) !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
  
  /* Layout */
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  padding: 0.5rem !important;
  border-radius: 0.5rem !important;
}

.auth-button:hover {
  background-color: color-mix(in srgb, var(--color-lavender) 10%, transparent) !important;
  border-color: var(--color-cream) !important;
  box-shadow: 0 4px 12px rgba(131, 135, 195, 0.2) !important;
  transform: translateY(-2px) !important;
}

/* Icon styling */
.nav-icon {
  color: var(--color-cream) !important;

}

/* Mobile responsive */
@media (max-width: 640px) {
  .dashboard-nav-bg {
    padding: 0.5rem 0.75rem !important;
  }
}

@media (max-width: 480px) {
  .nav-button span {
    display: none !important;
  }

  .nav-button {
    padding: 0.5rem !important;
  }
  
  .auth-button span {
    display: none !important;
  }
}
</style>