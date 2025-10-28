<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay fixed inset-0 z-[1000] flex items-center justify-center !p-8 backdrop-blur-sm" @click="handleOverlayClick">
      <div ref="formContainer" class="sleep-form-container !w-full !max-w-4xl !max-h-[100vh] overflow-y-auto rounded-2xl !p-8" @click.stop>
        
        <!-- Title -->
        <h2 class="form-title text-center !mb-8">Log Your Sleep</h2>
        
        <!-- Error Display -->
        <span v-if="showError" class="error-message block text-center !p-3 !mb-4 rounded-lg">{{ errorMessage }}</span>
        
        <!-- Time Inputs Section -->
        <div class="time-section grid grid-cols-1 md:grid-cols-3 !gap-4 !mb-6">
          <div class="bedtime-group flex flex-col">
            <h3 class="section-header !mb-2">Bedtime</h3>
            <input type="time" v-model="bedTime" class="time-input rounded-lg !p-3 border">
          </div>
          <div class="waketime-group flex flex-col">
            <h3 class="section-header !mb-2">Waketime</h3>
            <input type="time" v-model="wakeTime" class="time-input rounded-lg !p-3 border">
          </div>
          <!-- Total Sleep Time Display -->
          <div class="sleep-total-group flex flex-col">
            <h3 class="section-header !mb-2">Total Sleep Time</h3>
            <div class="sleep-total-display rounded-lg !p-3 border !min-h-11 flex items-center justify-center text-center">
              {{ totalSleepTime }}
            </div>
          </div>
        </div>
        
        <!-- Sleep Quality Section -->
        <div class="quality-section !my-4 flex flex-col justify-center">
          <h3 class="section-header !mb-2">Sleep Quality (1-10)</h3>
          <div class="slider-container flex items-center !gap-4 !mb-6">
            <input 
              id="quality-range" 
              type="range" 
              min="1" 
              max="10" 
              v-model="sleepQuality"
              class="custom-range-slider flex !w-80 !h-2 rounded-2xl outline-none cursor-pointer transition-all duration-200"
            >
            <div class="quality-display flex items-center !gap-3">
              <span ref="qualityNumber" class="quality-number">{{ sleepQuality }}</span>
              <img ref="starIcon" src="@/assets/img/star.svg" alt="star" class="star-icon !w-7 !h-7">
            </div>
          </div>
        </div>
        
        <!-- Dream Journal Section -->
        <div class="dream-section !mb-6">
          <h3 class="section-header !mb-2">Dream Entry</h3>
          <div class="textarea-container rounded-lg p-1 !mb-6">
            <textarea 
              v-model="dreamJournal" 
              placeholder="Describe your dreams..."
              class="dream-textarea !w-full !min-h-24 bg-transparent border-none !p-3 resize-y focus:outline-none"
              @input="resetError"
            ></textarea>
          </div>
        </div>
        
        <!-- Tags Section -->
        <div class="tags-section !mb-8">
          <h3 class="section-header !mb-2">Tags</h3>
          <div class="tags-container rounded-lg !p-1">
            <input 
              type="text" 
              v-model="tags" 
              placeholder="e.g., vivid, nightmare, lucid"
              class="tags-input !w-full bg-transparent border-none !p-3 focus:outline-none"
              @input="resetError"
            >
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="button-section flex !gap-12 justify-center">
          <button @click="saveSleepLog" :disabled="saving" class="save-button !px-8 !py-3 border-none rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5">
            {{ saving ? 'Saving...' : 'Save sleep log' }}
          </button>
          <button @click="closeForm" class="cancel-button !px-8 !py-3 border-none rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5">Cancel</button>
        </div>
        
      </div>
    </div>
  </Teleport>
</template>

<script setup>
// Keep your existing script exactly the same
import { onMounted, ref, watch } from 'vue'
import { animate } from 'animejs'
import { useSleepLogs } from '@/modules/useSleepLogs'

const { 
  // Form state
  isOpen,
  bedTime,
  wakeTime,
  sleepQuality,
  dreamJournal,
  tags,
  
  // Computed values
  totalSleepTime,
  
  // Error handling
  showError,
  errorMessage,
  resetError,
  
  // Form actions
  openForm,
  closeForm,
  saveSleepLog,
  handleOverlayClick,
  
  // Loading state
  saving

} = useSleepLogs()

// Template refs
const starIcon = ref(null)
let starAnimation = null
const formContainer = ref(null)
const qualityNumber = ref(null)


// Animate form entrance when it opens
const animateFormEntrance = () => {
  if (!formContainer.value) return
  
  animate(formContainer.value, {
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 400,
    easing: 'easeOutBack'
  })
}


// Simple pulse function
const startStarPulse = () => {
  if (!starIcon.value) return
  
  starAnimation = animate(starIcon.value, {
    scale: [1, 1.25, 1],
    duration: 2000,
    easing: 'easeInOutSine',
    loop: true
  })
  
  console.log('⭐ Star pulse started')
}

const stopStarPulse = () => {
  if (starAnimation) {
    starAnimation.pause()
    starAnimation = null
  }
}

watch(sleepQuality, () => {
  if (!qualityNumber.value) return
  
  animate(qualityNumber.value, {
    scale: [1, 1.3, 1],
    duration: 300,
    easing: 'easeOutBack'
  })
})

// Start/stop animation when form opens/closes
watch(isOpen, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      animateFormEntrance()
      startStarPulse()
    }, 100)
  } else {
    stopStarPulse()
  }
})

onMounted(() => {
  if (isOpen.value) {
    startStarPulse()
  }
})

// Expose methods for parent components
defineExpose({
  openForm,
  closeForm
})
</script>

<style scoped>
/* ✅ ONLY CSS VARIABLES AND BROWSER-SPECIFIC PROPERTIES REMAIN */

/* Modal Overlay */
.modal-overlay {
  background-color: rgba(10, 17, 35, 0.8) !important;
}

/* Form Container */
.sleep-form-container {
  background-color: #3A3E6C !important;
}

/* Title */
.form-title {
  color: var(--color-cream) !important;
  font-family: var(--font-serif) !important;
  font-size: var(--font-size-2xl) !important;;
}

/* Section Headers */
.section-header {
  color: var(--color-cream) !important;
  font-size: var(--font-size-base) !important;
}

/* Time Inputs */
.time-input {
  background-color: var(--color-cream) !important;
  color: var(--color-midnight) !important;
  border-color: color-mix(in srgb, var(--color-lavender) 30%, transparent) !important;
  font-family: var(--font-sans) !important;
}

/* Total Sleep Display */
.sleep-total-display {
  background-color: var(--color-sand) !important;
  color: var(--color-midnight) !important;
  border-color: color-mix(in srgb, var(--color-lavender) 30%, transparent) !important;
  font-family: var(--font-sans) !important;
  font-weight: 600 !important;
}

/* Error Message */
.error-message {
  background-color: color-mix(in srgb, #dc2663 15%, transparent) !important;
  border: 1px solid color-mix(in srgb, #dc2663 40%, transparent) !important;
  color: #ff6b6b !important;
  font-family: var(--font-sans) !important;
}

/* Custom Range Slider - Browser-specific properties that can't be done with Tailwind */
.custom-range-slider {
  background: var(--color-midnight) !important;
  -webkit-appearance: none !important;
  appearance: none !important;
}

/* Webkit browsers (Chrome, Safari, Edge) - Track */
.custom-range-slider::-webkit-slider-track {
  height: 1.5rem !important;
  border-radius: 2% !important;
  background: var(--color-gold) !important;
  border: none !important;
}

/* Webkit browsers - Thumb (handle) */
.custom-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  appearance: none !important;
  height: 1.6rem !important;
  width: 1.6rem !important;
  border-radius: 50% !important;
  background: var(--color-lavender) !important; 
  cursor: pointer !important;
  border: 2px solid var(--color-cream) !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.2s ease !important;
}

/* Webkit browsers - Thumb hover */
.custom-range-slider::-webkit-slider-thumb:hover {
  background: var(--color-gold) !important;
  transform: scale(1.15) !important;
  box-shadow: 0 4px 12px rgba(131, 135, 195, 0.4) !important;
}

/* Quality Display */
.quality-display {
  color: var(--color-gold) !important;
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-3xl) !important;
}

/* Dream Textarea */
.textarea-container {
  background-color: #0A1123 !important;
}

.dream-textarea {
  color: var(--color-cream) !important;
  font-family: var(--font-sans) !important;
}

.dream-textarea::placeholder {
  color: var(--color-cream) !important;
}

/* Tags Input */
.tags-container {
  background-color: #0A1123 !important;
}

.tags-input {
  color: var(--color-cream) !important;
  font-family: var(--font-sans) !important;
}

.tags-input::placeholder {
  color: var(--color-cream) !important;
}

/* Action Buttons */
.save-button, .cancel-button {
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-base) !important;
  font-weight: 600 !important;
}

.save-button {
  background-color: var(--color-lavender) !important;
  color: var(--color-midnight) !important;
}

.save-button:hover {
  background-color: var(--color-gold) !important;
}

.cancel-button {
  background-color: var(--color-sand) !important;
  color: var(--color-text-dark) !important;
}

.cancel-button:hover {
  background-color: #ff6b6b !important;
}
</style>