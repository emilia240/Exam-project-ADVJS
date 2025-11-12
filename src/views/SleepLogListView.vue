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

        <!-- Tag Filter -->
          <div class="filter-section !mb-6 !md:mb-8">
            <div class="filter-container !flex !items-center !gap-4">
              <span class="filter-label">Filter by tag:</span>
              
              <!-- Dropdown Select -->
              <div class="select-wrapper">
                <select 
                  v-model="selectedTag" 
                  class="tag-select"
                >
                  <option :value="null">All logs ({{ sleepLogs.length }})</option>
                  <option 
                    v-for="tag in availableTags" 
                    :key="tag"
                    :value="tag"
                  >
                    {{ tag }} ({{ getTagCount(tag) }})
                  </option>
                </select>
                <svg class="select-arrow" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>

              <!-- Clear filter button when active -->
              <button 
                v-if="selectedTag" 
                @click="selectedTag = null"
                class="clear-filter-btn"
                title="Clear filter"
              >
                ✕
              </button>
            </div>
          </div>


        <!-- Sleep Log Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Display ALL sleep logs -->
          <SleepLogCard 
            v-for="log in filteredSleepLogs" 
            :key="log.id" 
            :log="log"
          />

          <!-- Empty State -->
          <div v-if="filteredSleepLogs.length === 0" class="empty-state !col-span-full !text-center !py-12">
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
        <div v-if="allLogsLoaded && filteredSleepLogs.length > 0" class="all-loaded !flex !justify-center !items-center !py-8">
          <div class="!flex !items-center !gap-2">
            <img src="@/assets/img/star.svg" alt="" class="!w-5 !h-5">
            <span class="end-text">You've seen all your {{ selectedTag ? selectedTag.toLowerCase() : '' }} dreams ✨</span>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue'
import { useSleepLogs } from '../modules/useSleepLogs.js'
import { useSleepLogListAnimations } from '../composables/animations/useSleepLogListAnimations.js'
import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'
import SleepLogCard from '../components/SleepLogCard.vue'

const { sleepLogs } = useSleepLogs()
const { initializeSleepLogListAnimations } = useSleepLogListAnimations()


// Template refs
const sleepFormRef = ref(null)



// ✅ ADD FILTER STATE
const selectedTag = ref(null)

// ✅ GET UNIQUE TAGS
const availableTags = computed(() => {
  const allTags = sleepLogs.value
    .filter(log => log.tags) // Only logs with tags
    .flatMap(log => 
      log.tags.split(',').map(tag => tag.trim()) // Split by comma and clean
    )
    .filter(tag => tag.length > 0) // Remove empty tags
  
  // Return unique tags
  return [...new Set(allTags)].sort()
})

// ✅ FILTER LOGS BY SELECTED TAG
const filteredSleepLogs = computed(() => {
  if (!selectedTag.value) {
    return sleepLogs.value // Show all if no tag selected
  }
  
  return sleepLogs.value.filter(log => {
    if (!log.tags) return false
    
    const logTags = log.tags.split(',').map(tag => tag.trim())
    return logTags.includes(selectedTag.value)
  })
})

// ✅ COUNT LOGS PER TAG
const getTagCount = (tag) => {
  return sleepLogs.value.filter(log => {
    if (!log.tags) return false
    const logTags = log.tags.split(',').map(t => t.trim())
    return logTags.includes(tag)
  }).length
}


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

/* ✅ Clean dropdown styles */
.filter-section {
  border-bottom: 1px solid color-mix(in srgb, var(--color-lavender) 15%, transparent);
  padding-bottom: 1.5rem;
}

.filter-label {
  color: var(--color-text-light);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: 500;
  white-space: nowrap;
}

.select-wrapper {
  position: relative;
  min-width: 200px;
}

.tag-select {
  appearance: none;
  background-color: var(--color-deep-purple);
  border: 1px solid color-mix(in srgb, var(--color-lavender) 30%, transparent);
  border-radius: 0.75rem;
  color: var(--color-cream);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: 500;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.tag-select:hover,
.tag-select:focus {
  border-color: var(--color-lavender);
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-lavender) 20%, transparent);
}

.select-arrow {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-text-light);
  pointer-events: none;
  transition: transform 0.2s ease;
}

.tag-select:focus ~ .select-arrow {
  transform: translateY(-50%) rotate(180deg);
}

.clear-filter-btn {
  background-color: var(--color-lavender);
  color: var(--color-midnight);
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.clear-filter-btn:hover {
  background-color: var(--color-gold);
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .select-wrapper {
    width: 100%;
    min-width: unset;
  }
  
  .filter-label {
    font-size: var(--font-size-xs);
  }
}

</style>