<template>
    <div class="login-view">
        <h1>Login</h1>
    </div>
    <!--Prevent is for not refreshing the page and losing the input data-->
    <form @submit.prevent="loginUser" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <input type="email" v-model="email" placeholder="Email" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit" :disabled="loading">Login</button>
        <!--Disabled is for when the user is logging in and smashing like an idiot the btn continuously-->
    </form>
        <form @submit.prevent="registerUser">
        <input type="email" v-model="regEmail" placeholder="Email" required>
        <input type="password" v-model="regPassword" placeholder="Password" required>
        <button type="submit" :disabled="loading">Register</button>
        <!--Disabled is for when the user is logging in and smashing like an idiot the btn continuously-->
    </form>

    <div class="error" v-if="authError">
        <p>{{ authError }}</p>
    </div>


    <div v-if="isLoggedIn">
        Logged in as: {{ currentUser?.email }}
    </div>

    <!--Do the register yourself-->
</template>

<!-- For logins is smarter to keep the variables in this component -->

<script setup>
import {ref} from 'vue'
import { useAuth} from '../modules/useAuth'

const {login, register, authError, loading, isLoggedIn, currentUser} = useAuth()

const email = ref('')
const password = ref('')
const regEmail = ref('')
const regPassword = ref('')

const loginUser = () => {
    login(email.value, password.value)
}

const registerUser = () => {
    register(regEmail.value, regPassword.value)
}

</script>

<style>

.login-view {
    max-width: 400px;
    margin: 20px auto;
}

.error {
    color: red;
    margin-top: 16px;
}

</style>