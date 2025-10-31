<template>
  <div class="!min-h-screen" style="background-color: var(--color-background);">
    <DashboardNav navType="logs" @newLog="openSleepForm" />
    <SleepLogForm ref="sleepFormRef" />
    
    <div class="content !pt-20 !md:pt-24 !px-4 !md:px-6 !max-w-7xl !mx-auto !mt-4">
      
      <!-- Sleep Logs Section -->
      <section class="sleep-logs-section !mb-12 !md:mb-16">
        <!-- Section Header - No View All button -->
        <div class="section-header !flex !items-center !gap-3 !mb-6 !md:mb-8">
          <img src="@/assets/img/cloud.svg" alt="" class="!w-6 !h-6">
          <h2 class="section-title">Your Sleep Logs</h2>
        </div>

        <!-- Sleep Log Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Display ALL sleep logs -->
          <SleepLogCard 
            v-for="log in sleepLogs" 
            :key="log.id" 
            :log="log"
          />

          <!-- Empty State -->
          <div v-if="sleepLogs.length === 0" class="empty-state !col-span-full !text-center !py-12">
            <img src="@/assets/img/moon.svg" alt="" class="!w-12 !h-12 !mx-auto !mb-4 !opacity-50">
            <p class="empty-text !mb-4">No sleep logs yet</p>
            <button @click="openSleepForm" class="new-log-button !px-6 !py-3 !rounded-lg !font-medium !transition-all !duration-300 hover:-translate-y-0.5">
              Create Your First Log
            </button>
          </div>
          
        </div>

        <!-- Simple Loading Indicator -->
        <div v-if="isLoadingMore" class="loading-more !flex !justify-center !items-center !py-8">
          <div class="!flex !items-center !gap-3">
            <img src="@/assets/img/cloud.svg" alt="" class="!w-6 !h-6 animate-pulse">
            <span class="loading-text">Loading more dreams...</span>
          </div>
        </div>
        
        <!-- End Message -->
        <div v-if="allLogsLoaded && sleepLogs.length > 0" class="all-loaded !flex !justify-center !items-center !py-8">
          <div class="!flex !items-center !gap-2">
            <img src="@/assets/img/star.svg" alt="" class="!w-5 !h-5">
            <span class="end-text">You've seen all your dreams ✨</span>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { useSleepLogs } from '../modules/useSleepLogs.js'
import { useSleepLogListAnimations } from '../composables/animations/useSleepLogListAnimations.js'
import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'
import SleepLogCard from '../components/SleepLogCard.vue'

const { sleepLogs } = useSleepLogs()
const { initializeSleepLogListAnimations } = useSleepLogListAnimations()


// Template refs
const sleepFormRef = ref(null)

// Methods
const openSleepForm = () => {
  sleepFormRef.value?.openForm()
}


//SIMPLE INFINITE SCROLL

// refs
const isLoadingMore = ref(false)
const allLogsLoaded = ref(false)

// scroll listener
const handleScroll = async () => {
  if (isLoadingMore.value || allLogsLoaded.value) return
  
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // If near bottom (500px from end)
  if (scrollTop + windowHeight >= documentHeight - 500) {
    console.log('🔄 Loading more logs...')
    isLoadingMore.value = true
    
    // Simulate loading more (replace with your actual data fetching)
    setTimeout(() => {
      // For now, just stop after first load to prevent infinite loop
      allLogsLoaded.value = true
      isLoadingMore.value = false
      console.log('✅ All logs loaded')
    }, 1000)
  }
}

// Initialize animations when component mounts
onMounted(() => {
  // Initialize scroll animations for the sleep log cards
  initializeSleepLogListAnimations()
  window.addEventListener('scroll', handleScroll)
})

// Cleanup scroll listener on unmount
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Section Headers */
.section-title {
  font-family: var(--font-serif);
  font-size: var(--font-size-xl);
  color: var(--color-cream);
  font-weight: 600;
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

/* Simple loading styles */
.loading-text, .end-text {
  color: var(--color-text-light);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
}

.end-text {
  color: var(--color-lavender);
  font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-lg);
  }
}
</style>