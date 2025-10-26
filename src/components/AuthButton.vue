<template>
  <button v-if="isLoggedIn" @click="handleLogout" class="auth-button flex items-center gap-2 !p-2 !md:p-6 border rounded-lg">
    <img v-if="showIcon" src="@/assets/img/logout.svg" alt="" class="nav-icon flex-shrink-0 w-4 h-4 md:w-5 md:h-5">
    <span>Logout</span>
  </button>

  <router-link v-else to="/login" class="auth-button">
    <img v-if="showIcon" alt="" class="nav-icon">
    <span>Login</span>
  </router-link>
  <!-- Link to login page if not logged in -->
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

.auth-button {
 color: var(--color-text-light);
 font-family: var(--font-sans); 
font-size: var(--font-size-sm);
text-decoration: none;
transition: color 0.3s ease;
padding: 0.5rem 1rem;
}

.auth-button:hover {
color: var(--color-lavender);
}

</style>