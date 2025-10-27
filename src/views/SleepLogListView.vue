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
          <div 
            v-for="log in sleepLogs" 
            :key="log.id" 
            class="sleep-log-card flex flex-col justify-between !p-6 !rounded-xl !transition-transform !duration-300 hover:-translate-y-1"
          >
            <!-- Card Header: Date and Quality -->
            <div class="card-header !flex !items-center !justify-between !mb-4">
              <div class="!flex !items-center !gap-2">
                <img src="@/assets/img/moon.svg" alt="" class="!w-5 !h-5">
                <span class="log-date">{{ formatDate(log.date) }}</span>
              </div>
              <div class="!flex !items-center !gap-1">
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
          <div v-if="sleepLogs.length === 0" class="empty-state !col-span-full !text-center !py-12">
            <img src="@/assets/img/moon.svg" alt="" class="!w-12 !h-12 !mx-auto !mb-4 !opacity-50">
            <p class="empty-text !mb-4">No sleep logs yet</p>
            <button @click="openSleepForm" class="new-log-button !px-6 !py-3 !rounded-lg !font-medium !transition-all !duration-300 hover:-translate-y-0.5">
              Create Your First Log
            </button>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuth } from '../modules/useAuth.js'
import { useSleepLogs } from '../modules/useSleepLogs.js'
import { useSleepLogListAnimations } from '../composables/animations/useSleepLogListAnimations.js'
import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'

const { currentUser } = useAuth()
const { sleepLogs } = useSleepLogs()
const { initializeSleepLogListAnimations } = useSleepLogListAnimations()


// Template refs
const sleepFormRef = ref(null)

// Methods
const openSleepForm = () => {
  sleepFormRef.value?.openForm()
}

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

// Initialize animations when component mounts
onMounted(() => {
  // Initialize scroll animations for the sleep log cards
  initializeSleepLogListAnimations()
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-lg);
  }
}
</style>