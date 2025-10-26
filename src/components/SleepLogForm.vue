<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
      <div class="sleep-form-container" @click.stop>
        <!-- Title -->
        <h2 class="form-title">Log Your Sleep</h2>
        
        <!-- Time Inputs Section -->
        <div class="time-section">
          <div class="bedtime-group">
            <h3 class="section-header">Bedtime</h3>
            <input type="time" v-model="bedTime" class="time-input">
          </div>
          <div class="waketime-group">
            <h3 class="section-header">Waketime</h3>
            <input type="time" v-model="wakeTime" class="time-input">
          </div>
        </div>
        
        <!-- Sleep Quality Section -->
        <div class="quality-section">
          <h3 class="section-header">Sleep Quality (1-10)</h3>
          <div class="slider-container">
            <input 
              type="range" 
              min="1" 
              max="10" 
              v-model="sleepQuality" 
              class="quality-slider"
            >
            <div class="quality-display">
              <span class="quality-number">{{ sleepQuality }}</span>
              <span class="quality-star">⭐</span>
            </div>
          </div>
        </div>
        
        <!-- Dream Journal Section -->
        <div class="dream-section">
          <h3 class="section-header">Dream Entry</h3>
          <div class="textarea-container">
            <textarea 
              v-model="dreamJournal" 
              placeholder="Describe your dreams..."
              class="dream-textarea"
            ></textarea>
          </div>
        </div>
        
        <!-- Tags Section -->
        <div class="tags-section">
          <h3 class="section-header">Tags</h3>
          <div class="tags-container">
            <input 
              type="text" 
              v-model="tags" 
              placeholder="e.g., vivid, nightmare, lucid"
              class="tags-input"
            >
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="button-section">
          <button @click="saveSleepLog" class="save-button">Save sleep log</button>
          <button @click="closeForm" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

// Form state
const isOpen = ref(false)
const bedTime = ref('')
const wakeTime = ref('')
const sleepQuality = ref(5)
const dreamJournal = ref('')
const tags = ref('')

// Calculated field
const hoursSlept = computed(() => {
  if (bedTime.value && wakeTime.value) {
    // Calculate hours between bedTime and wakeTime
    const bed = new Date(`2024-01-01 ${bedTime.value}`)
    const wake = new Date(`2024-01-01 ${wakeTime.value}`)
    
    // Handle overnight sleep (wakeTime is next day)
    if (wake < bed) {
      wake.setDate(wake.getDate() + 1)
    }
    
    const diffMs = wake - bed
    return (diffMs / (1000 * 60 * 60)).toFixed(1) // Convert to hours
  }
  return 0
})

// Methods
const openForm = () => {
  isOpen.value = true
}

const closeForm = () => {
  isOpen.value = false
  resetForm()
}

const handleOverlayClick = (event) => {
  // Close if clicking outside the form
  if (event.target === event.currentTarget) {
    closeForm()
  }
}

const saveSleepLog = () => {
  // Save to Firestore
  // Close form
  // Emit success event
}

const resetForm = () => {
  bedTime.value = ''
  wakeTime.value = ''
  sleepQuality.value = 5
  dreamJournal.value = ''
  tags.value = ''
}

// Expose methods for parent components
defineExpose({
  openForm,
  closeForm
})
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed !important;
  inset: 0 !important;
  background-color: rgba(10, 17, 35, 0.8) !important; /* Semi-transparent midnight */
  backdrop-filter: blur(5px) !important;
  z-index: 1000 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 2rem !important;
}

/* Form Container */
.sleep-form-container {
  background-color: #3A3E6C !important; /* Your specified color */
  border-radius: 1rem !important;
  padding: 2rem !important;
  max-width: 600px !important;
  width: 100% !important;
  max-height: 90vh !important;
  overflow-y: auto !important;
}

/* Title */
.form-title {
  color: var(--color-cream) !important; /* F5F0E9 */
  font-family: var(--font-serif) !important;
  font-size: var(--font-size-xl) !important;
  text-align: center !important;
  margin-bottom: 2rem !important;
}

/* Section Headers */
.section-header {
  color: var(--color-cream) !important; /* F5F0E9 */
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-base) !important;
  margin-bottom: 0.5rem !important;
}

/* Time Inputs */
.time-section {
  display: flex !important;
  gap: 2rem !important;
  margin-bottom: 1.5rem !important;
}

.time-input {
  background-color: #0A1123 !important; /* Your specified color */
  color: var(--color-cream) !important;
  border: 1px solid color-mix(in srgb, var(--color-lavender) 30%, transparent) !important;
  border-radius: 0.5rem !important;
  padding: 0.75rem !important;
  font-family: var(--font-sans) !important;
}

/* Quality Slider */
.slider-container {
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;
  margin-bottom: 1.5rem !important;
}

.quality-slider {
  flex: 1 !important;
  height: 0.5rem !important;
  background-color: #0A1123 !important;
  border-radius: 0.25rem !important;
}

.quality-display {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  color: var(--color-cream) !important;
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-lg) !important;
}

/* Dream Textarea */
.textarea-container {
  background-color: #0A1123 !important; /* Your specified color */
  border-radius: 0.5rem !important;
  padding: 0.25rem !important;
  margin-bottom: 1.5rem !important;
}

.dream-textarea {
  width: 100% !important;
  min-height: 100px !important;
  background: transparent !important;
  color: var(--color-cream) !important;
  border: none !important;
  padding: 0.75rem !important;
  font-family: var(--font-sans) !important;
  resize: vertical !important;
}

.dream-textarea::placeholder {
  color: var(--color-cream) !important; /* F5F0E9 as specified */
}

.dream-textarea:focus {
  outline: none !important;
}

/* Tags Input */
.tags-container {
  background-color: #0A1123 !important;
  border-radius: 0.5rem !important;
  padding: 0.25rem !important;
  margin-bottom: 2rem !important;
}

.tags-input {
  width: 100% !important;
  background: transparent !important;
  color: var(--color-cream) !important;
  border: none !important;
  padding: 0.75rem !important;
  font-family: var(--font-sans) !important;
}

.tags-input::placeholder {
  color: var(--color-cream) !important;
}

.tags-input:focus {
  outline: none !important;
}

/* Action Buttons */
.button-section {
  display: flex !important;
  gap: 1rem !important;
  justify-content: center !important;
}

.save-button, .cancel-button {
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-base) !important;
  font-weight: 600 !important;
  padding: 0.75rem 2rem !important;
  border: none !important;
  border-radius: 0.5rem !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.save-button {
  background-color: var(--color-gold) !important;
  color: var(--color-midnight) !important;
}

.save-button:hover {
  background-color: var(--color-lavender) !important;
  transform: translateY(-2px) !important;
}

.cancel-button {
  background-color: color-mix(in srgb, #dc2663 80%, transparent) !important;
  color: var(--color-text-light) !important;
}

.cancel-button:hover {
  background-color: #dc2663 !important;
  transform: translateY(-2px) !important;
}
</style>