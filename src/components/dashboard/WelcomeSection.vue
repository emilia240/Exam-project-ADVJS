<template>
  <section class="welcome-section !mb-12 !md:mb-16 !mt-4 !md:mt-6 !flex !justify-center">
    <div class="!flex flex-col !items-center !gap-6 !md:gap-8">
      <!-- Text Content -->
      <div class="!flex-1 text-center justify-center">
        <h1 ref="welcomeTitle" class="welcome-title !mb-4">Welcome back, {{ getUserName() }}! How was your sleep?</h1>
      </div>
      
      <!-- Logo with Animation -->
      <div class="flex flex-col !gap-4 !items-center !p-4">
        <img 
          ref="dashboardLogo"
          src="@/assets/img/Logo-somnus.svg" 
          alt="Somnus Logo" 
          class="dashboard-logo !h-18 !md:h-22 !mb-2"
        >
        <h2 class="welcome-subtitle !mt-4">Track your sleep. Decode your dreams.</h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../modules/useAuth.js'

const { currentUser } = useAuth()

// Template refs
const welcomeTitle = ref(null)
const dashboardLogo = ref(null)

// Methods
const getUserName = () => {
  if (currentUser.value?.email) {
    // Extract name from email (before @)
    return currentUser.value.email.split('@')[0]
  }
  return 'Sleeper'
}

// Expose refs for parent animations
defineExpose({
  welcomeTitle,
  dashboardLogo
})


</script>

<style scoped>
/* Section 1: Welcome Section */
.welcome-title {
  font-family: var(--font-serif);
  font-size: var(--font-size-2xl);
  color: var(--color-sand);
  font-weight: 600;
  line-height: 1.2;
}

.welcome-subtitle {
  font-family: var(--font-serif);
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  font-weight: 400;
}

.dashboard-logo {
  filter: drop-shadow(0 4px 8px rgba(224, 197, 143, 0.3));
  transition: transform 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .welcome-title {
    font-size: var(--font-size-xl);
  }
  
  .welcome-subtitle {
    font-size: var(--font-size-base);
  }
  
  .dashboard-logo {
    width: 3rem !important;
    height: 3rem !important;
  }
}
</style>