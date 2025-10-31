<template>
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
      <SleepLogCard 
        v-for="log in recentLogs" 
        :key="log.id" 
        :log="log"
      />
        
      <!-- Empty State -->
      <div v-if="recentLogs.length === 0" class="empty-state !col-span-full !text-center !py-12">
        <img src="@/assets/img/moon.svg" alt="" class="!w-12 !h-12 !mx-auto !mb-4 !opacity-50">
        <p class="empty-text !mb-4">No sleep logs yet</p>
        <button @click="$emit('openSleepForm')" class="new-log-button !px-6 !py-3 !rounded-lg !font-medium !transition-all !duration-300 hover:-translate-y-0.5">
          Create Your First Log
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useSleepLogs } from '../../modules/useSleepLogs.js'
import SleepLogCard from '../SleepLogCard.vue'

const { sleepLogs } = useSleepLogs()

// Define emits
defineEmits(['openSleepForm'])

// Computed values
const recentLogs = computed(() => {
  return sleepLogs.value.slice(0, 3) // Get most recent 3 logs
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
</style>