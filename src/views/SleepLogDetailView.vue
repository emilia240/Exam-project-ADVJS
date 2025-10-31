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
            @click="handleSaveSleepLogChanges" 
            :disabled="saving" 
            class="save-button flex items-center !gap-2 !px-4 !py-2 rounded-lg transition-all duration-300 hover:-translate-y-0.5 border-none cursor-pointer font-semibold"
          >
            <img src="@/assets/img/check.svg" alt="" class="!w-4 !h-4">
            <span>{{ saving ? 'Saving...' : 'Save' }}</span>
          </button>
          
          <button 
            @click="handleDeleteSleepLog" 
            :disabled="loading"
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
      <SleepLogHeader :log="currentLog" />

      <!-- Editable Sleep Data -->
      <EditableSleepData 
        v-model:bedTime="editBedTime"
        v-model:wakeTime="editWakeTime"
        v-model:sleepQuality="editSleepQuality"
        v-model:dreamJournal="editDreamJournal"
        v-model:tags="editTags"
        :calculateSleepHours="calculateSleepHours"
        @update:bedTime="markAsChanged"
        @update:wakeTime="markAsChanged"
        @update:sleepQuality="markAsChanged"
        @update:dreamJournal="markAsChanged"
        @update:tags="markAsChanged"
      />

      <!-- Unsaved Changes Warning -->
      <div v-if="hasUnsavedChanges" class="unsaved-warning !mt-4 !p-4 rounded-lg text-center border">
        <p>⚠️ You have unsaved changes. Don't forget to click Save!</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSleepLogs } from '../modules/useSleepLogs.js'
import { animate, stagger } from 'animejs'
import { useAuth } from '../modules/useAuth.js'
import { showToast } from '../utils/toast.js'


import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'
import SleepLogHeader from '../components/edit-log/SleepLogHeader.vue'
import EditableSleepData from '../components/edit-log/EditableSleepData.vue'

const route = useRoute()
const router = useRouter()

const { 
  sleepLogs, 
  showError, 
  errorMessage, 
  resetError,
  saving,
  calculateSleepHours,
  saveSleepLogChanges,
  deleteSleepLog
} = useSleepLogs()


const { loading } = useAuth();


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


// Methods
const openSleepForm = () => {
  sleepFormRef.value?.openForm()
}


//RETRIEVE AND LOAD CURRENT LOG DATA
//function for loading current log data into editable fields(pre-filled form ready for editing)
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


//handle is for saving changes made to the sleep log
const handleSaveSleepLogChanges = async () => {
  if (!currentLog.value) return
  
  const editData = {
    bedTime: editBedTime.value,
    wakeTime: editWakeTime.value,
    sleepQuality: editSleepQuality.value,
    dreamJournal: editDreamJournal.value,
    tags: editTags.value
  }
  
  const success = await saveSleepLogChanges(currentLog.value.id, editData)
  
  if (success) {
    hasUnsavedChanges.value = false
    
    // Update original data
    originalData.value = { ...editData }
    showToast('Sleep log saved successfully!')
  }
}

// Handle is for deleting the current sleep log
const handleDeleteSleepLog = async () => {
  if (!currentLog.value) return
  
  const success = await deleteSleepLog(currentLog.value.id)
  
  if (success) {
    showToast('Sleep log deleted successfully!')
    // Redirect to sleep logs list after a short delay
    setTimeout(() => {
      router.push('/sleep-logs')
    }, 400)
  }
}

// Watch for log changes and reload data
watch(currentLog, (newLog) => {
  if (newLog) {
    loadCurrentLogData()
  }
}, { immediate: true })


const animateDetailCards = () => {
  console.log('🎬 Starting detail cards stagger animation')
  
  const cards = document.querySelectorAll('.details-header-card, .sleep-data-card')
  const cardArray = Array.from(cards)
  
  if (cardArray.length > 0) {
    // Set initial state
    animate(cardArray, {
      opacity: 0,
      y: 60,
      scale: 0.9,
      duration: 0
    })
    
    // Animate in sequence with stagger
    animate(cardArray, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 400,
      ease: 'out(2)',
      delay: stagger(150) // 150ms delay between cards
    })
    
    console.log('✅ Detail cards animation completed')
  }
}


// Load data when component mounts
onMounted(() => {
  if (currentLog.value) {
    loadCurrentLogData()
  }
  
  // Animate cards after a short delay
  setTimeout(() => {
    animateDetailCards()
  }, 200)
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