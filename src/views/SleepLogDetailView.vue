<template>
  <div class="!min-h-screen" style="background-color: var(--color-background);">
    <DashboardNav navType="logs" @newLog="openSleepForm" />
    <SleepLogForm ref="sleepFormRef" />

    <div class="content !pt-20 !md:pt-24 !px-4 !md:px-6 !max-w-4xl !mx-auto">

      <!-- Navigation and Actions Header -->
      <div class="header-actions flex items-center justify-between flex-col md:flex-row !my-8 !gap-4 md:!gap-0">
        <!-- Back to Logs -->
        <router-link to="/sleep-logs" class="back-link flex items-center !gap-2 no-underline transition-colors duration-300">
          ← Back to logs
        </router-link>
        
        <!-- Action Buttons -->
        <div class="action-buttons flex items-center !gap-3">
          <button 
            @click="saveSleepLogChanges" 
            :disabled="saving" 
            class="save-button flex items-center !gap-2 !px-4 !py-2 rounded-lg transition-all duration-300 hover:-translate-y-0.5 border-none cursor-pointer font-semibold"
          >
            <img src="@/assets/img/check.svg" alt="" class="!w-4 !h-4">
            <span>{{ saving ? 'Saving...' : 'Save' }}</span>
          </button>
          
          <button 
            @click="confirmDelete" 
            class="delete-button flex items-center !gap-2 !px-4 !py-2 rounded-lg transition-all duration-300 hover:-translate-y-0.5 border-none cursor-pointer font-semibold"
          >
            <img src="@/assets/img/delete.svg" alt="" class="!w-4 !h-4">
            <span>Delete</span>
          </button>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="showError" class="error-message !mb-6 !p-4 rounded-lg text-center">
        {{ errorMessage }}
      </div>

      <!-- Sleep Log Details Header -->
      <div class="details-header-card !p-10 rounded-xl !mb-6 border">
        <div class="flex items-start justify-between">
          <!-- Left Side: Title and Timestamps -->
          <div class="header-info">
            <div class="flex items-center !gap-3 !mb-4">
              <img src="@/assets/img/moon.svg" alt="" class="!w-6 !h-6">
              <h2 class="details-title font-medium">Sleep Log Details</h2>
            </div>
            
            <!-- Timestamps -->
            <div class="timestamps">
              <p class="timestamp !mb-2">
                <span class="timestamp-label">Created:</span> 
                {{ formatTimestamp(currentLog?.createdAt) }}
              </p>
              <p v-if="hasBeenUpdated" class="timestamp !mb-2">
                <span class="timestamp-label">Updated:</span> 
                {{ formatTimestamp(currentLog?.updatedAt) }}
              </p>
            </div>
          </div>
          
          <!-- Right Side: Quality Rating -->
          <div class="quality-rating flex items-center !gap-2">
            <span class="quality-score">{{ currentLog?.sleepQuality || 0 }}/10</span>
            <img src="@/assets/img/star.svg" alt="" class="!w-5 !h-5">
          </div>
        </div>
      </div>

      <!-- Editable Sleep Data -->
      <div class="sleep-data-card !p-10 rounded-xl border">
        <!-- Time Inputs Section -->
        <div class="time-section grid grid-cols-1 md:grid-cols-3 !gap-4 !mb-8">
          <div class="bedtime-group flex flex-col">
            <h3 class="section-header !mb-2">Bedtime</h3>
            <input 
              type="time" 
              v-model="editBedTime" 
              class="time-input rounded-lg !p-3 border"
              @input="markAsChanged"
            >
          </div>
          <div class="waketime-group flex flex-col">
            <h3 class="section-header !mb-2">Waketime</h3>
            <input 
              type="time" 
              v-model="editWakeTime" 
              class="time-input rounded-lg !p-3 border"
              @input="markAsChanged"
            >
          </div>
          <!-- Total Sleep Time Display -->
          <div class="sleep-total-group flex flex-col">
            <h3 class="section-header !mb-2">Total Sleep Time</h3>
            <div class="sleep-total-display rounded-lg !p-3 border font-semibold text-center min-h-11 flex items-center justify-center">
              {{ calculatedSleepTime }} hours
            </div>
          </div>
        </div>

        <!-- Sleep Quality Section -->
        <div class="quality-section !mb-8">
          <h3 class="section-header !mb-2">Sleep Quality (1-10)</h3>
          <div class="slider-container flex items-center !gap-4 !mb-6">
            <input 
              type="range" 
              min="1" 
              max="10" 
              v-model="editSleepQuality"
              class="custom-range-slider flex-1 cursor-pointer outline-none transition-all duration-200"
              @input="markAsChanged"
            >
            <div class="quality-display flex items-center !gap-3">
              <span class="quality-number">{{ editSleepQuality }}</span>
              <img src="@/assets/img/star.svg" alt="star" class="quality-star-icon !w-7 !h-7">
            </div>
          </div>
        </div>
        
        <!-- Dream Journal Section -->
        <div class="dream-section !mb-8">
          <h3 class="section-header !mb-2">Dream Entry</h3>
          <div class="textarea-container rounded-lg !p-1 !mb-6">
            <textarea 
              v-model="editDreamJournal" 
              placeholder="Describe your dreams..."
              class="dream-textarea !w-full !min-h-32 bg-transparent border-none !p-3 resize-y focus:outline-none"
              @input="markAsChanged"
            ></textarea>
          </div>
        </div>
        
        <!-- Tags Section -->
        <div class="tags-section">
          <h3 class="section-header !mb-2">Tags</h3>
          <div class="tags-container rounded-lg !p-1">
            <input 
              type="text" 
              v-model="editTags" 
              placeholder="e.g., vivid, nightmare, lucid"
              class="tags-input !w-full bg-transparent border-none !p-3 focus:outline-none"
              @input="markAsChanged"
            >
          </div>
        </div>
      </div>

      <!-- Unsaved Changes Warning -->
      <div v-if="hasUnsavedChanges" class="unsaved-warning !mt-4 !p-4 rounded-lg text-center border">
        <p>⚠️ You have unsaved changes. Don't forget to click Save!</p>
      </div>

    </div>
  </div>
</template>

<script setup>
// Keep your existing script exactly the same
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSleepLogs } from '../modules/useSleepLogs.js'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../modules/firebase.js'

import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'

const route = useRoute()
const router = useRouter()

const { 
  sleepLogs, 
  showError, 
  errorMessage, 
  resetError,
  saving,
  calculateSleepHours
} = useSleepLogs()

// Template refs
const sleepFormRef = ref(null)

// Get current log from route params
const currentLog = computed(() => {
  const logId = route.params.id
  return sleepLogs.value.find(log => log.id === logId)
})

// Editable form data
const editBedTime = ref('')
const editWakeTime = ref('')
const editSleepQuality = ref(5)
const editDreamJournal = ref('')
const editTags = ref('')

// Track changes
const hasUnsavedChanges = ref(false)
const originalData = ref({})

// Create a function to calculate sleep hours
//using the imported calculateSleepHours function
const calculatedSleepTime = computed(() => {
  const hours = calculateSleepHours(editBedTime.value, editWakeTime.value)
  return hours ? `${hours.toFixed(1)}` : '-'
})

// Computed values
const hasBeenUpdated = computed(() => {
  if (!currentLog.value) return false
  const created = new Date(currentLog.value.createdAt?.toDate?.() || currentLog.value.createdAt)
  const updated = new Date(currentLog.value.updatedAt?.toDate?.() || currentLog.value.updatedAt)
  return updated.getTime() - created.getTime() > 1000 // More than 1 second difference
})

// Methods
const openSleepForm = () => {
  sleepFormRef.value?.openForm()
}

const loadCurrentLogData = () => {
  if (currentLog.value) {
    console.log('📊 Loading current log data:', currentLog.value)
    
    editBedTime.value = currentLog.value.bedTime || ''
    editWakeTime.value = currentLog.value.wakeTime || ''
    editSleepQuality.value = currentLog.value.sleepQuality || 5
    editDreamJournal.value = currentLog.value.dreamJournal || ''
    editTags.value = currentLog.value.tags || ''
    
    // Store original data for comparison
    originalData.value = {
      bedTime: editBedTime.value,
      wakeTime: editWakeTime.value,
      sleepQuality: editSleepQuality.value,
      dreamJournal: editDreamJournal.value,
      tags: editTags.value
    }
    
    hasUnsavedChanges.value = false
    resetError()
  }
}

const markAsChanged = () => {
  hasUnsavedChanges.value = true
}

const saveSleepLogChanges = async () => {
  if (!currentLog.value) return
  
  console.log('💾 Saving sleep log changes...')
  saving.value = true
  resetError()
  
  try {
    // Calculate hours slept
    const hoursSlept = calculateSleepHours(editBedTime.value, editWakeTime.value)
    
    const updateData = {
      bedTime: editBedTime.value,
      wakeTime: editWakeTime.value,
      hoursSlept: parseFloat(hoursSlept.toFixed(1)),
      sleepQuality: parseInt(editSleepQuality.value),
      dreamJournal: editDreamJournal.value.trim(),
      tags: editTags.value.trim(),
      updatedAt: new Date()
    }
    
    await updateDoc(doc(db, 'sleepLogs', currentLog.value.id), updateData)
    
    console.log('✅ Sleep log updated successfully!')
    hasUnsavedChanges.value = false
    
    // Update original data
    originalData.value = {
      bedTime: editBedTime.value,
      wakeTime: editWakeTime.value,
      sleepQuality: editSleepQuality.value,
      dreamJournal: editDreamJournal.value,
      tags: editTags.value
    }
    
  } catch (error) {
    console.error('❌ Error updating sleep log:', error)
    errorMessage.value = 'Failed to save changes. Please try again.'
    showError.value = true
  } finally {
    saving.value = false
  }
}

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this sleep log? This action cannot be undone.')) {
    deleteSleepLogEntry()
  }
}

const deleteSleepLogEntry = async () => {
  if (!currentLog.value) return
  
  console.log('🗑️ Deleting sleep log...')
  
  try {
    await deleteDoc(doc(db, 'sleepLogs', currentLog.value.id))
    console.log('✅ Sleep log deleted successfully!')
    router.push('/sleep-logs')
  } catch (error) {
    console.error('❌ Error deleting sleep log:', error)
    errorMessage.value = 'Failed to delete sleep log. Please try again.'
    showError.value = true
  }
}

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'Unknown'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Watch for log changes and reload data
watch(currentLog, (newLog) => {
  if (newLog) {
    loadCurrentLogData()
  }
}, { immediate: true })

// Load data when component mounts
onMounted(() => {
  if (currentLog.value) {
    loadCurrentLogData()
  }
})

// Warn user about unsaved changes before leaving
window.addEventListener('beforeunload', (e) => {
  if (hasUnsavedChanges.value) {
    e.preventDefault()
    e.returnValue = ''
  }
})
</script>

<style scoped>
/* ✅ ONLY CSS VARIABLES AND BROWSER-SPECIFIC PROPERTIES REMAIN */

/* Back Link */
.back-link {
  color: var(--color-text-light);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
}

.back-link:hover {
  color: var(--color-lavender);
}

/* Action Buttons */
.save-button {
  background-color: var(--color-gold);
  color: var(--color-midnight);
  font-family: var(--font-sans);
}

.save-button:hover:not(:disabled) {
  background-color: var(--color-lavender);
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.delete-button {
  background-color: var(--color-sand);
  color: var(--color-midnight);
  font-family: var(--font-sans);
}

.delete-button:hover {
  background-color: #ff6b6b;
  color: white;
}

/* Cards */
.details-header-card,
.sleep-data-card {
  background-color: var(--color-deep-purple);
  border-color: color-mix(in srgb, var(--color-lavender) 20%, transparent);
}

/* Details Title */
.details-title {
  font-family: var(--font-serif);
  color: var(--color-cream);
  font-size: var(--font-size-xl);
}

/* Timestamps */
.timestamp {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.timestamp-label {
  color: var(--color-sand);
  font-weight: 500 !important;
}

/* Quality Rating */
.quality-score {
  font-family: var(--font-sans);
  color: var(--color-gold);
  font-weight: 600 !important;
  font-size: var(--font-size-2xl);
}

/* Section Headers */
.section-header {
  color: var(--color-cream);
  font-family: var(--font-serif);
  font-size: var(--font-size-base);
}

/* Time Inputs */
.time-input {
  background-color: var(--color-cream);
  color: var(--color-midnight);
  border-color: color-mix(in srgb, var(--color-lavender) 30%, transparent);
  font-family: var(--font-sans);
}

.sleep-total-display {
  background-color: var(--color-sand);
  color: var(--color-midnight);
  border-color: color-mix(in srgb, var(--color-lavender) 30%, transparent);
  font-family: var(--font-sans);
}

/* Quality Slider - Browser-specific properties that can't be done with Tailwind */
.custom-range-slider {
  height: 0.6rem;
  border-radius: 1rem;
  background: var(--color-midnight);
  -webkit-appearance: none;
  appearance: none;
}

.custom-range-slider::-webkit-slider-track {
  height: 8px;
  border-radius: 5px;
  background: var(--color-gold);
  border: none;
}

.custom-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 50%;
  background: var(--color-lavender);
  cursor: pointer;
  border: 2px solid var(--color-cream);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.custom-range-slider::-webkit-slider-thumb:hover {
  background: var(--color-gold);
  transform: scale(1.15);
}

.quality-display {
  color: var(--color-gold);
  font-family: var(--font-sans);
  font-size: var(--font-size-3xl);
}

/* Dream Textarea */
.textarea-container {
  background-color: #0A1123;
}

.dream-textarea {
  color: var(--color-cream);
  font-family: var(--font-sans);
}

.dream-textarea::placeholder {
  color: var(--color-cream);
}

/* Tags Input */
.tags-container {
  background-color: #0A1123;
}

.tags-input {
  color: var(--color-cream);
  font-family: var(--font-sans);
}

.tags-input::placeholder {
  color: var(--color-cream);
}

/* Error Message */
.error-message {
  background-color: color-mix(in srgb, #dc2663 15%, transparent);
  border-color: color-mix(in srgb, #dc2663 40%, transparent);
  color: #ff6b6b;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
}

/* Unsaved Warning */
.unsaved-warning {
  background-color: color-mix(in srgb, var(--color-gold) 15%, transparent);
  border-color: var(--color-gold);
  color: var(--color-gold);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
}
</style>