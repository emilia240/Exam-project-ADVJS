<template>
  <div class="min-h-screen" style="background-color: var(--color-background);">
    <DashboardNav navType="dashboard"  @newLog="openSleepForm" />
    <SleepLogForm ref="sleepFormRef" />

    <div class="content !my-8 !pt-20 !md:pt-24 !px-4 !md:px-6 !max-w-7xl !mx-auto">

      <!-- Section 1: Welcome Section -->
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

      <!-- Section 2: Recent Sleep Logs -->
      <section class="recent-logs-section !mb-12 !md:mb-16">
        <!-- Section Header -->
        <div class="section-header !flex !items-center !justify-between !mb-6 !md:mb-8">
          <div class="!flex !items-center !gap-3">
            <img src="@/assets/img/cloud.svg" alt="" class="!w-6 !h-6">
            <h2 class="section-title">Recent Sleep Logs</h2>
          </div>
          
          <router-link to="/sleep-logs" class="view-all-button !flex !items-center !gap-2 !p-2 !md:p-3 !border !rounded-lg !no-underline !cursor-pointer !transition-all !duration-300 hover:-translate-y-0.5">
            <img src="@/assets/img/list.svg" alt="" class="!flex-shrink-0 !w-4 !h-4 !md:w-5 !md:h-5">
            <span class="hidden sm:inline">View All</span>
          </router-link>
        </div>

        <!-- Sleep Log Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Display recent 3 logs -->
          <div 
            v-for="log in recentLogs" 
            :key="log.id" 
            class="sleep-log-card flex flex-col justify-between !p-6 !rounded-xl !transition-transform !duration-300 hover:-translate-y-1"
          >
            <!-- Card Header: Date and Quality -->
            <div class="card-header !flex !items-center !justify-between !mb-4">
              <div class="!flex !items-center !gap-2">
                <img src="@/assets/img/moon.svg" alt="" class="!w-5 !h-5">
                <span class="log-date">{{ formatDate(log.date) }}</span>
              </div>
              <div class="!flex !items-center !gap-3">
                <span class="sleep-quality">{{ log.sleepQuality }}/10</span>
                <img src="@/assets/img/star.svg" alt="" class="!w-4 !h-4">
              </div>
            </div>

            <!-- Sleep Times -->
            <div class="sleep-times !flex !items-center !gap-2 !mb-3">
              <img src="@/assets/img/clock.svg" alt="" class="!w-4 !h-4">
              <span class="time-display">{{ log.bedTime }} → {{ log.wakeTime }} ({{ log.hoursSlept }}h)</span>
            </div>

            <!-- Dream Description -->
            <div class="dream-excerpt !mb-4">
              <p class="dream-text line-clamp-3">{{ log.dreamJournal }}</p>
            </div>

            <!-- Tags -->
            <div class="tags-container !flex !flex-wrap !gap-2 !mb-4" v-if="log.tags">
              <span 
                v-for="tag in getTagsArray(log.tags)" 
                :key="tag"
                class="tag !px-2 !py-1 !rounded-md !text-xs"
              >
                {{ tag }}
              </span>
            </div>

            <!-- View Details Button -->
            <button class="view-details-button flex justify-center !w-full !py-2 !px-4 !rounded-lg !font-medium !transition-all !duration-300 hover:-translate-y-0.5">
              View Details
            </button>
          </div>

          <!-- Empty State -->
          <div v-if="recentLogs.length === 0" class="empty-state !col-span-full !text-center !py-12">
            <img src="@/assets/img/moon.svg" alt="" class="!w-12 !h-12 !mx-auto !mb-4 !opacity-50">
            <p class="empty-text !mb-4">No sleep logs yet</p>
            <button @click="openSleepForm" class="new-log-button !px-6 !py-3 !rounded-lg !font-medium !transition-all !duration-300 hover:-translate-y-0.5">
              Create Your First Log
            </button>
          </div>
        </div>
      </section>

      <!-- Section 3: Sleep Insights (Placeholder for now) -->
      <section class="sleep-insights-section">
        <div class="section-header !flex !items-center !gap-3 !mb-6 !md:mb-8">
          <img src="@/assets/img/star.svg" alt="" class="!w-6 !h-6">
          <h2 class="section-title">Sleep Insights</h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Chart placeholders -->
          <div class="insight-card !p-6 !rounded-xl">
            <h3 class="insight-title !mb-4">Sleep Quality - Last 7 Days</h3>
            <div class="chart-placeholder !h-48 !flex !items-center !justify-center !border-2 !border-dashed !rounded-lg">
              <p class="placeholder-text">Chart coming soon...</p>
            </div>
          </div>
          
          <div class="insight-card !p-6 !rounded-xl">
            <h3 class="insight-title !mb-4">Sleep Hours - This Week</h3>
            <div class="chart-placeholder !h-48 !flex !items-center !justify-center !border-2 !border-dashed !rounded-lg">
              <p class="placeholder-text">Chart coming soon...</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../modules/useAuth.js'
import { useSleepLogs } from '../modules/useSleepLogs.js'
import { useLogoAnimations } from '../composables/animations/shared/useLogoAnimations.js'
import { useDashboardAnimations } from '@/composables/animations/useDashboardAnimations.js'
import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'

const router = useRouter()
const { currentUser } = useAuth()
const { sleepLogs } = useSleepLogs()
const { startLogoPulsing } = useLogoAnimations()
const { welcomeTitle, initializeDashboardAnimations } = useDashboardAnimations()

// Template refs
const sleepFormRef = ref(null)
const dashboardLogo = ref(null)

// Computed values
const recentLogs = computed(() => {
  return sleepLogs.value.slice(0, 3) // Get most recent 3 logs
})

// Methods
const openSleepForm = () => {
  sleepFormRef.value?.openForm()
}

const getUserName = () => {
  if (currentUser.value?.email) {
    // Extract name from email (before @)
    return currentUser.value.email.split('@')[0]
  }
  return 'Sleeper'
}   //COME BACK LATER TO CHANGE IT TO USERNAME FROM REGISTER

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}


const getTagsArray = (tagsString) => {
  if (!tagsString) return []
  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
}


// Clean up loading overlay when Dashboard mounts
onMounted(() => {
  // Remove the loading overlay created in LoginView
  const loadingOverlay = document.querySelector('.loading-overlay')
  if (loadingOverlay) {
    loadingOverlay.remove()
    console.log('🧹 Loading overlay removed')
  }
  
  // Start logo animation
  startLogoPulsing(dashboardLogo.value)

  // Initialize other dashboard animations
  initializeDashboardAnimations(welcomeTitle)
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


/* Section Headers */
.section-title {
  font-family: var(--font-serif);
  font-size: var(--font-size-xl);
  color: var(--color-cream);
  font-weight: 600;
}

/* View All Button */
.view-all-button {
  background-color: transparent;
  border-color: var(--color-cream);
  color: var(--color-cream);
  font-family: var(--font-sans);
  font-weight: 500;
}

.view-all-button:hover {
  background-color: color-mix(in srgb, var(--color-lavender) 10%, transparent);
  border-color: var(--color-cream);
  box-shadow: 0 4px 12px rgba(131, 135, 195, 0.2);
}

/* Sleep Log Cards */
.sleep-log-card {
  background-color: var(--color-deep-purple);
  border: 1px solid color-mix(in srgb, var(--color-lavender) 20%, transparent);
}

.log-date {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-cream);
  font-weight: 500;
}

.sleep-quality {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-gold); 
  font-weight: 600;
}

.time-display {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-cream);
  font-weight: 400;
}

.dream-text {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  color: var(--color-cream);
  line-height: 1.5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tags */
.tag {
  background-color: var(--color-lavender);
  color: var(--color-midnight); 
  font-family: var(--font-sans);
  font-weight: 500;
}

/* View Details Button */
.view-details-button {
  background-color: var(--color-midnight);
  color: var(--color-gold);
  font-family: var(--font-sans);
  border: none;
}

.view-details-button:hover {
  background-color: var(--color-sand);
  color: var(--color-midnight);
  box-shadow: 0 4px 12px rgba(217, 203, 194, 0.3);
}

/* Empty State */
.empty-text {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-text-light);
}

.new-log-button {
  background-color: var(--color-gold);
  color: var(--color-midnight);
  font-family: var(--font-sans);
  border: none;
}

.new-log-button:hover {
  background-color: var(--color-lavender);
}

/* Section 3: Sleep Insights */
.insight-card {
  background-color: var(--color-deep-purple);
  border: 1px solid color-mix(in srgb, var(--color-lavender) 20%, transparent);
}

.insight-title {
  font-family: var(--font-serif);
  font-size: var(--font-size-base);
  color: var(--color-cream);
  font-weight: 500;
}

.chart-placeholder {
  border-color: color-mix(in srgb, var(--color-lavender) 30%, transparent);
}

.placeholder-text {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  opacity: 0.7;
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