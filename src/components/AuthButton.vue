<template>
  <button 
    v-if="isLoggedIn" 
    @click="handleLogout" 
    class="auth-button !flex !items-center !gap-2 !p-2 !md:p-6 !border !rounded-lg !no-underline !cursor-pointer !transition-all !duration-300 !hover:-translate-y-0.5"
  >
    <img 
      v-if="showIcon" 
      src="@/assets/img/logout.svg" 
      alt="" 
      class="nav-icon !flex-shrink-0 !w-4 !h-4 !md:w-5 !md:h-5"
    >
    <span>Logout</span>
  </button>

  <router-link 
    v-else 
    to="/login" 
    class="auth-button !flex !items-center !gap-2 !p-2 !md:p-6 !border !rounded-lg !no-underline !cursor-pointer !transition-all !duration-300 !hover:-translate-y-0.5"
  >
    <img 
      v-if="showIcon"  
      alt="" 
      class="nav-icon !flex-shrink-0 !w-4 !h-4 !md:w-5 !md:h-5"
    >
    <span>Login</span>
  </router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '../modules/useAuth';
import { useRouter } from 'vue-router';

// Props to control appearance
defineProps({
  showIcon: {
    type: Boolean,
    default: false
  }
})

const { isLoggedIn, logout} = useAuth();
const router = useRouter();

const handleLogout = () => {
    logout(router)
}


</script>


<style scoped>
/* AuthButton styling - only custom variables */
.auth-button {
  background-color: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-midnight);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.auth-button:hover {
  background-color: var(--color-lavender);
  border-color: var(--color-lavender);
  color: var(--color-midnight);
}

/* Icon styling - only custom colors */
.nav-icon {
  color: var(--color-midnight);
}

/* When used in DashboardNav, inherit those styles */
.dashboard-nav-bg .auth-button {
  background-color: transparent;
  border-color: var(--color-cream);
  color: var(--color-cream);
}

.dashboard-nav-bg .auth-button:hover {
  background-color: color-mix(in srgb, var(--color-lavender) 10%, transparent);
  border-color: var(--color-cream);
  box-shadow: 0 4px 12px rgba(131, 135, 195, 0.2);
}

.dashboard-nav-bg .nav-icon {
  color: var(--color-cream);
}
</style>