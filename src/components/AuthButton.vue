<template>
  <button v-if="isLoggedIn" @click="handleLogout" class="auth-button">Logout</button>
  <router-link v-else to="/login" class="auth-button">Login</router-link>
  <!-- Link to login page if not logged in -->
</template>

<script setup>
import { useAuth } from '../modules/useAuth';
import { useRouter } from 'vue-router';

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