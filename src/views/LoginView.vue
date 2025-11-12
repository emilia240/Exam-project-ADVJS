<template>
  <div class="!min-h-screen !w-screen !relative !flex !justify-center !items-center !p-4">
    <!-- Background Image -->
    <div class="!absolute !inset-0 bg-login-sky !bg-cover !bg-center !bg-no-repeat !z-0"></div>
    
    <!-- Login/Register Card -->
    <div ref="loginCard" class="login-card !relative !z-10 !rounded-3xl !p-8 !w-full !max-w-md !backdrop-blur-md">
      <!-- Back to Home Link -->
      <RouterLink to="/" class="back-link !block w-fit !mb-6 !transition-colors !duration-300 !no-underline">
        ← Back to Home
      </RouterLink>
      
      <!-- Logo -->
      <img 
        ref="logoRef"
        src="@/assets/img/Logo-somnus.svg" 
        alt="Somnus Logo" 
        class="!block !mx-auto !mb-6 !w-25 !h-20"
      >
      
      <!-- Welcome Message -->
      <h2 class="welcome-message !text-center !mb-8 !font-semibold">
        {{ isRegistering ? 'Create your account' : 'Welcome back!' }}
      </h2>
      
      <!-- Login Form -->
      <form v-if="!isRegistering" @submit.prevent="loginUser" class="!w-full">
        <!-- Email Field -->
        <div class="!mb-6">
          <label class="input-label !block !mb-2 !font-medium">Email</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="Enter your email" 
            required 
            class="auth-input !w-full !p-4 !rounded-xl !transition-all !duration-300 focus:!outline-none"
          >
        </div>
        
        <!-- Password Field -->
        <div class="!mb-6">
          <label class="input-label !block !mb-2 !font-medium">Password</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="Enter your password" 
            required 
            class="auth-input !w-full !p-4 !rounded-xl !transition-all !duration-300 focus:!outline-none"
          >
        </div>
        
        <!-- Sign In Button -->
        <button 
          type="submit" 
          :disabled="loading" 
          class="auth-button !w-full !font-semibold !p-4 !border-none !rounded-xl !cursor-pointer !transition-all !duration-300 !mb-6 disabled:!opacity-70 disabled:!cursor-not-allowed disabled:!transform-none"
        >
          {{ loading ? 'Signing In...' : 'Sign In' }}
        </button>
        
        <!-- Switch to Register -->
        <p class="toggle-text !text-center !mb-4">
          New? 
          <span @click="toggleForm" class="toggle-link !cursor-pointer !underline !transition-colors !duration-300">Register here</span>
        </p>
      </form>
      
      <!-- Register Form -->
      <form v-else @submit.prevent="registerUser" class="!w-full">
        <!-- Username Field -->
        <div class="!mb-6">
          <label class="input-label !block !mb-2 !font-medium">Username</label>
          <input 
            type="text" 
            v-model="regUserName" 
            placeholder="Enter your username" 
            required 
            class="auth-input !w-full !p-4 !rounded-xl !transition-all !duration-300 focus:!outline-none"
          >
        </div>

          <!-- Birth Date Field - NEW -->
        <div class="!mb-6">
          <label class="input-label !block !mb-2 !font-medium">Birth Date</label>
          <input 
            type="date" 
            v-model="regBirthDate" 
            required 
            class="auth-input !w-full !p-4 !rounded-xl !transition-all !duration-300 focus:!outline-none"
          >
        </div>
        
        <!-- Email Field -->
        <div class="!mb-6">
          <label class="input-label !block !mb-2 !font-medium">Email</label>
          <input 
            type="email" 
            v-model="regEmail" 
            placeholder="Enter your email" 
            required 
            class="auth-input !w-full !p-4 !rounded-xl !transition-all !duration-300 focus:!outline-none"
          >
        </div>
        
        <!-- Password Field -->
        <div class="!mb-6">
          <label class="input-label !block !mb-2 !font-medium">Password</label>
          <input 
            type="password" 
            v-model="regPassword" 
            placeholder="Enter your password" 
            required 
            class="auth-input !w-full !p-4 !rounded-xl !transition-all !duration-300 focus:!outline-none"
          >
        </div>
        
        <!-- Sign Up Button -->
        <button 
          type="submit" 
          :disabled="loading" 
          class="auth-button !w-full !font-semibold !p-4 !border-none !rounded-xl !cursor-pointer !transition-all !duration-300 !mb-6 disabled:!opacity-70 disabled:!cursor-not-allowed disabled:!transform-none"
        >
          {{ loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
        
        <!-- Switch to Login -->
        <p class="toggle-text !text-center !mb-4">
          Already have an account? 
          <span @click="toggleForm" class="toggle-link !cursor-pointer !underline !transition-colors !duration-300">Sign in</span>
        </p>
      </form>
      
      <!-- Error Display -->
      <div v-if="authError" class="error-message !rounded-lg !p-4 !mt-4">
        <p class="!text-center !m-0">{{ authError }}</p>
      </div>
      
      <!-- Success Display (if logged in) -->
      <div v-if="isLoggedIn"  ref="successMessage" class="success-message !rounded-lg !p-4 !mt-4">
        <p class="!text-center !m-0">Logged in as: {{ currentUser?.email }}</p>
      </div>
    </div>
  </div>
</template>

<!-- For logins is smarter to keep the variables in this component -->
<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../modules/useAuth'
import { useLoginAnimations } from '@/composables/animations/useLoginAnimations'


const router = useRouter()
const { login, register, authError, loading, isLoggedIn, currentUser } = useAuth()

// IMPORT ALL ANIMATION LOGIC
const { 
  loginCard, 
  successMessage, 
  logoRef, 
  startEntranceAnimations, 
} = useLoginAnimations()

// Form toggle state
const isRegistering = ref(false)

// Login form data
const email = ref('')
const password = ref('')

// Register form data
const regUserName = ref('')
const regBirthDate = ref('')
const regEmail = ref('')
const regPassword = ref('')

// Toggle between login and register forms
const toggleForm = () => {
  isRegistering.value = !isRegistering.value
  // Clear error when switching forms
  authError.value = null
}

// Login function
const loginUser = async () => {
  
    try {
    const userRole = await login(email.value, password.value) //Get user role 
    
    // ✅ Route based on role
    if (userRole === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Register function
const registerUser = async () => {
  try {
    await register(regEmail.value, regPassword.value, {
      userName: regUserName.value,
      birthDate: regBirthDate.value
    })
    // For registration, always go to regular dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}


// Start animations when component mounts
onMounted(() => {
  startEntranceAnimations()
})


</script>

<style scoped>
/* BACKGROUND IMAGE */
.bg-login-sky {
  background-image: url('@/assets/img/login-sky.jpg');
}

/* LOGIN CARD - Using CSS custom properties with transparency */
.login-card {
  background-color: rgba(58, 62, 108, 0.1) !important;
  border: 1px solid color-mix(in srgb, var(--color-lavender) 30%, transparent) !important;
}

/* BACK LINK */
.back-link {
  color: var(--color-text-light);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  text-decoration: none;
}

.back-link:hover {
  color: var(--color-lavender);
}

/* WELCOME MESSAGE */
.welcome-message {
  font-family: var(--font-serif);
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
}

/* INPUT LABELS */
.input-label {
  color: var(--color-text-light);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
}

/* AUTH INPUTS */
.auth-input {
  background-color: var(--color-cream);
  border: 1px solid color-mix(in srgb, var(--color-lavender) 30%, transparent);
  color: var(--color-text-dark);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
}

.auth-input::placeholder {
  color: color-mix(in srgb, var(--color-midnight) 60%, transparent);
}

.auth-input:focus {
  border-color: var(--color-lavender);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-lavender) 10%, transparent);
}

/* AUTH BUTTON */
.auth-button {
  background-color: var(--color-gold);
  color: var(--color-midnight);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
}

.auth-button:hover:not(:disabled) {
  background-color: var(--color-lavender);
  transform: translateY(-2px);
}

/* TOGGLE TEXT */
.toggle-text {
  color: var(--color-text-light);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
}

.toggle-link {
  color: var(--color-gold);
}

.toggle-link:hover {
  color: var(--color-lavender);
}

/* ERROR MESSAGE */
.error-message {
  background-color: color-mix(in srgb, #dc2663 10%, transparent);
  border: 1px solid color-mix(in srgb, #dc2663 30%, transparent);
}

.error-message p {
  color: #ff6b6b;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
}

/* SUCCESS MESSAGE */
.success-message {
  background-color: color-mix(in srgb, var(--color-gold) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-gold) 30%, transparent);
}

.success-message p {
  color: var(--color-gold);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
}



/* Success Message Enhancement */
.success-message {
  background-color: color-mix(in srgb, var(--color-gold) 15%, transparent);
  border: 2px solid var(--color-gold);
}

/* RESPONSIVE ADJUSTMENTS */
@media (min-width: 768px) {
  .login-card {
    padding: 3rem !important;
  }
  
  .welcome-message {
    font-size: var(--font-size-xl) !important;
  }
  
  .auth-input {
    padding: 1.25rem !important;
  }
  
  .auth-button {
    padding: 1.25rem 2rem !important;
    font-size: var(--font-size-lg) !important;
  }
}
</style>