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
 margin: 0 16px;
 padding: 8px 16px;
 background-color: #42b983;
 border-radius: 5px;
 border:none;

}

</style>